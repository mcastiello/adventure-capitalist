import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GameProps } from './GameProps';
import styled from 'styled-components';
import { F7Panel, F7View, F7Views } from 'framework7-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GamePage } from '../state/features/navigation/navigationTypes';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getCurrentPage } from '../state/features/navigation/navigationSelectors';
import GameMenu from './pages/GameMenu';
import BusinessesPage from './pages/Businesses';
import ManagersPage from './pages/Managers';
import AddItem from './components/menu/AddItem';

const MIN_PAGE_WIDTH = 900;
const HEADER_HEIGHT = 40;

const GameArea = styled(F7Views)`
  position: absolute;
  width: 100%;
  display: flex;
`;

const Header = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background: var(--game-header-background-color);
  position: relative;
`;

const Title = styled.div`
  height: ${HEADER_HEIGHT}px;
  position: absolute;
  display: inline-block;
  color: white;
  min-width: 300px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
`;

const MenuPanel = styled(F7Panel)`
  background: var(--game-panel-background-color);
  &::after {
    width: 5px;
  }
`;

const MenuBar = styled.div`
  display: inline-block;
  background: var(--game-panel-background-color);
  width: var(--f7-panel-width);
  height: 100%;
`;

const GameContainer = styled(F7View)`
  height: 100%;
  display: inline-block;
  position: relative;
`;

const PageContainer = styled.div`
  height: calc(100% - ${HEADER_HEIGHT}px);
  overflow-y: auto;
  margin: 0;
  padding: 0;
`;

const Game: React.FC<GameProps> = ({ width, height }) => {
  const page = useSelector(getCurrentPage);
  const [open, setMenuOpen] = useState(false);
  const openMenuCallback = useCallback(() => setMenuOpen(true), []);
  const closeMenuCallback = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [page]);

  return (
    <GameArea>
      {width >= MIN_PAGE_WIDTH ? (
        <MenuBar>
          <GameMenu page={page} />
        </MenuBar>
      ) : (
        <MenuPanel left opened={open} effect={'cover'} backdrop onPanelClosed={closeMenuCallback}>
          <GameMenu page={page} />
        </MenuPanel>
      )}
      <GameContainer main style={{ width: `calc(100% - ${width >= MIN_PAGE_WIDTH ? 'var(--f7-panel-width)' : '0px'})` }}>
        <Header>
          {width < MIN_PAGE_WIDTH && (
            <FontAwesomeIcon
              icon={faBars}
              onClick={openMenuCallback}
              size={'2x'}
              style={{ cursor: 'pointer', margin: '5px' }}
              fontSize={38}
              color={'white'}
            />
          )}
          <Title>Adventure Capitalist</Title>
          <AddItem />
        </Header>
        <PageContainer>{page === GamePage.Businesses ? <BusinessesPage /> : <ManagersPage />}</PageContainer>
      </GameContainer>
    </GameArea>
  );
};

export default Game;
