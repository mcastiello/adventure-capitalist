import React, { useCallback } from 'react';
import { MenuProps } from '../GameProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SystemState } from '../../state/features';
import { formatCurrency } from '../../helpers';
import { F7List, F7ListItem } from 'framework7-react';
import { setPage } from '../../state/features/navigation/navigationActions';
import { GamePage } from '../../state/features/navigation/navigationTypes';

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 240px;
  margin: 20px 0 10px 50%;
  color: rgba(255, 255, 255, 0.7);
  transform: translateX(-50%);
`;

const DataLine = styled.div`
  display: flex;
  color: white;
  padding: 0 8px;
  justify-content: space-between;
  & > span {
    color: yellow;
  }
`;

const LinkList = styled(F7List)`
  margin: 10px 0;
`;

const GameMenu: React.FC<MenuProps> = () => {
  const { name, wallet } = useSelector((state: SystemState) => state.user);
  const { page } = useSelector((state: SystemState) => state.navigation);
  const dispatch = useDispatch();
  const gotToBusinesses = useCallback(() => dispatch(setPage(GamePage.Businesses)), [dispatch]);
  const gotToManagers = useCallback(() => dispatch(setPage(GamePage.Managers)), [dispatch]);
  return (
    <div>
      <UserIcon icon={faUserCircle} />
      <DataLine>
        User: <span>{name}</span>
      </DataLine>
      <DataLine>
        Profits: <span>{formatCurrency(wallet)}</span>
      </DataLine>
      <LinkList themeDark>
        <F7ListItem link={'#'} title={'Businesses'} onClick={gotToBusinesses} noChevron={page !== GamePage.Businesses}>
          <span slot={'media'}>
            <FontAwesomeIcon icon={faCity} />
          </span>
        </F7ListItem>
        <F7ListItem link={'#'} title={'Managers'} onClick={gotToManagers} noChevron={page !== GamePage.Managers}>
          <span slot={'media'}>
            <FontAwesomeIcon icon={faUsers} />
          </span>
        </F7ListItem>
      </LinkList>
    </div>
  );
};

export default GameMenu;
