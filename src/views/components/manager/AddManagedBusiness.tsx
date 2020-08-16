import React, { useCallback, useState } from 'react';
import { ManagedBusinessProps } from '../../GameProps';
import { useDispatch, useSelector } from 'react-redux';
import { getUnmanagedBusinesses } from '../../../state/features/businesses/businessesSelectors';
import { BusinessID } from '../../../state/features/businesses/businessesTypes';
import { addManagedBusiness } from '../../../state/features/managers/managersActions';
import { F7Button, F7List, F7Popover } from 'framework7-react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Managers } from '../../../definitions/Managers';
import { ListItem } from '../CommonStyledComponents';
import { BusinessIcons } from '../../icons/BusinessIcons';
import styled from 'styled-components';

const AddButton = styled(F7Button)`
  width: 35px;
  background: purple;
  top: 4px;
  display: inline-block;
`;

const AddManagedBusiness: React.FC<ManagedBusinessProps> = ({ manager, disabled }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalCloseCallback = useCallback(() => setModalOpen(false), []);
  const modalOpenCallback = useCallback(() => setModalOpen(true), []);
  const availableBusinesses = useSelector(getUnmanagedBusinesses);
  const dispatch = useDispatch();
  const addBusiness = useCallback(
    (business: BusinessID) => {
      dispatch(addManagedBusiness(manager.id, business));
      setModalOpen(false);
    },
    [manager.id, dispatch]
  );

  return (
    <>
      <AddButton
        key={`add-business-${manager.id}`}
        disabled={
          disabled || availableBusinesses.length === 0 || manager.managedBusinesses.length >= Managers[manager.type].maxNumberOfBusinesses
        }
        className={`add-business-${manager.id}`}
        color={'white'}
        onClick={modalOpenCallback}
      >
        <FontAwesomeIcon icon={faPlus} />
      </AddButton>
      <F7Popover
        key={`popover-add-${manager.id}`}
        opened={isModalOpen}
        onPopoverClosed={modalCloseCallback}
        target={`.add-business-${manager?.id}`}
        themeDark
        style={{ width: '340px' }}
      >
        <F7List themeDark>
          {availableBusinesses.map((business) => (
            <ListItem
              link={'#'}
              key={business.id}
              title={business.name}
              after={`Lv. ${business.level}`}
              noChevron={true}
              onClick={() => addBusiness(business.id)}
            >
              <span slot={'media'}>{BusinessIcons[business.type]}</span>
            </ListItem>
          ))}
        </F7List>
      </F7Popover>
    </>
  );
};

export default AddManagedBusiness;
