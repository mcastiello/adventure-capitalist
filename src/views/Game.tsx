import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { SystemState } from '../state/features';
import { GameProps } from './GameProps';
import styled from 'styled-components';
import { F7Link, F7Panel, F7View, F7Views } from 'framework7-react';
import { GamePage } from '../state/features/navigation/navigationTypes';
import GameMenu from './pages/GameMenu';
import BusinessesPage from './pages/Businesses';
import ManagersPage from './pages/Managers';

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

const Game: React.FC<GameProps> = ({ width, height }) => {
  const { page } = useSelector((state: SystemState) => state.navigation);
  const [open, setMenuOpen] = useState(false);
  const openMenuCallback = useCallback(() => setMenuOpen(true), []);
  const closeMenuCallback = useCallback(() => setMenuOpen(false), []);

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
          {width < MIN_PAGE_WIDTH && (<F7Link iconF7={'bars'} onClick={openMenuCallback} color={'white'} iconSize={38}/>)}
          <Title>Adventure Capitalist</Title>
        </Header>
        {page === GamePage.Businesses ? (
          <BusinessesPage height={height - HEADER_HEIGHT} />
        ) : (
          <ManagersPage height={height - HEADER_HEIGHT} />
        )}
      </GameContainer>
    </GameArea>
  );
};

export default Game;
