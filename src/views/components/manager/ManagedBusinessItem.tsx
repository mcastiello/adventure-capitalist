import React, { useCallback, useState } from 'react';
import { F7SwipeoutActions, F7SwipeoutButton } from 'framework7-react';
import { useDispatch } from 'react-redux';
import { StyledItem } from '../CommonStyledComponents';
import { removeManagedBusiness } from '../../../state/features/managers/managersActions';
import { BusinessIcons } from '../../icons/BusinessIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ManagedBusinessItemProps } from '../../GameProps';

const ManagedBusinessItem: React.FC<ManagedBusinessItemProps> = ({ managerId, business, disabled }) => {
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();

  const resetDelete = useCallback(() => setDeleteState(false), []);
  const requestDelete = useCallback(() => setDeleteState(true), []);

  const confirmDelete = useCallback(() => {
    setDeleteState(false);
    dispatch(removeManagedBusiness(managerId, business.id));
  }, [managerId, business.id, dispatch]);

  return (
    <StyledItem
      key={business.id}
      title={business.name}
      after={`Lv. ${business.level}`}
      swipeout={!disabled}
      swipeoutOpened={deleteState}
      onSwipeoutClosed={resetDelete}
      onSwipeoutDeleted={confirmDelete}
    >
      <span slot={'media'}>{BusinessIcons[business.type]}</span>
      <span slot={'after'} className={'clickable'} style={{ cursor: !disabled && !deleteState ? 'pointer' : 'initial' }}>
        <FontAwesomeIcon icon={faTrash} onClick={requestDelete} />
      </span>
      {!disabled && (
        <F7SwipeoutActions right style={{ paddingLeft: '1px' }}>
          <F7SwipeoutButton delete style={{ fontSize: '12px' }}>
            Stop Managing
          </F7SwipeoutButton>
        </F7SwipeoutActions>
      )}
    </StyledItem>
  );
};

export default ManagedBusinessItem;
