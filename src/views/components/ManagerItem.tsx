import React, { useCallback, useState } from 'react';
import { IconSlot } from './BusinessBadge';
import { F7SwipeoutActions, F7SwipeoutButton } from 'framework7-react';
import { useDispatch } from 'react-redux';
import { StyledItem } from './CommonStyledComponents';
import { ManagerIcons } from '../icons/ManagerIcons';
import AddManagedBusiness from './AddManagedBusiness';
import ManagerOptions from './ManagerOptions';
import ManagedBusinesses from './ManagedBusinesses';
import { removeManager } from '../../state/features/managers/managersActions';
import styled from 'styled-components';
import { Manager } from '../../state/features/managers/managersTypes';

const NoBusinessesMessage = styled.div`
  font-style: italic;
  font-size: 14px;
  margin-top: 5px;
`;

const ManagerItem: React.FC<{ manager: Manager }> = ({ manager }) => {
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();

  const resetDelete = useCallback(() => setDeleteState(false), []);
  const requestDelete = useCallback(() => setDeleteState(true), []);

  const confirmDelete = useCallback(() => {
    setDeleteState(false);
    dispatch(removeManager(manager.id));
  }, [manager.id, dispatch]);

  return (
    <StyledItem title={manager.name} swipeout swipeoutOpened={deleteState} onSwipeoutClosed={resetDelete} onSwipeoutDeleted={confirmDelete}>
      <IconSlot slot={'media'}>{ManagerIcons[manager.type]}</IconSlot>
      <div slot={'after'}>
        <AddManagedBusiness manager={manager} disabled={deleteState} />
        <ManagerOptions manager={manager} onDelete={requestDelete} disabled={deleteState} />
      </div>
      <div slot={'text'}>
        {manager.managedBusinesses.length === 0 ? (
          <NoBusinessesMessage>Not managing any businesses at the moment.</NoBusinessesMessage>
        ) : (
          <ManagedBusinesses manager={manager} disabled={deleteState} />
        )}
      </div>
      <F7SwipeoutActions right>
        <F7SwipeoutButton delete>Confirm Delete</F7SwipeoutButton>
      </F7SwipeoutActions>
    </StyledItem>
  );
};

export default ManagerItem;
