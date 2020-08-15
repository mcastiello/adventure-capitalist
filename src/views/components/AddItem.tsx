import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SystemState } from '../../state/features';
import { GamePage } from '../../state/features/navigation/navigationTypes';
import AddItemModalContent from './AddItemModalContent';
import { F7Popover } from 'framework7-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faClock, faMoneyBillWave, faPiggyBank, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BusinessType } from '../../state/features/businesses/businessesTypes';
import { Businesses } from '../../definitions/Businesses';
import { BusinessIcons } from '../icons/BusinessIcons';
import { addBusiness } from '../../state/features/businesses/businessesActions';
import { ManagerType } from '../../state/features/managers/managersTypes';
import { addManager } from '../../state/features/managers/managersActions';
import { ItemDataValue } from './ItemProps';
import { Managers } from '../../definitions/Managers';
import { ManagerIcons } from '../icons/ManagerIcons';
import { formatCurrency, formatTime } from '../../helpers';
import { AddItemButton } from './CommonStyledComponents';
import { getWalletAmount } from '../../state/features/user/userSelector';

const AddItem: React.FC = () => {
  const { page } = useSelector((state: SystemState) => state.navigation);
  const wallet = useSelector(getWalletAmount);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const onCreateNewBusiness = useCallback(
    (name: string, type: BusinessType) => {
      dispatch(addBusiness(name, type));
      closeModal();
    },
    [dispatch, closeModal]
  );
  const onCreateNewManager = useCallback(
    (name: string, type: ManagerType) => {
      dispatch(addManager(name, type));
      closeModal();
    },
    [dispatch, closeModal]
  );

  const businessDataValues: ItemDataValue<BusinessType>[] = [
    {
      title: 'Profit Interval',
      getValue: (type) => formatTime(Businesses[type].profitInterval),
      icon: <FontAwesomeIcon icon={faClock} />
    },
    {
      title: 'Profit Amount',
      getValue: (type) => formatCurrency(Businesses[type].profitAmount),
      icon: <FontAwesomeIcon icon={faPiggyBank} />
    },
    {
      title: 'Acquiring Cost',
      getValue: (type) => formatCurrency(Businesses[type].cost),
      icon: <FontAwesomeIcon icon={faMoneyBillWave} />
    }
  ];

  const managerDataValues: ItemDataValue<ManagerType>[] = [
    {
      title: 'Time Bonus',
      getValue: (type) => `${Managers[type].timeBonus}x`,
      icon: <FontAwesomeIcon icon={faClock} />
    },
    {
      title: 'Profit Cut',
      getValue: (type) => `${Managers[type].profitCut}%`,
      icon: <FontAwesomeIcon icon={faPiggyBank} />
    },
    {
      title: 'Business Capacity',
      getValue: (type) => Managers[type].maxNumberOfBusinesses.toString(),
      icon: <FontAwesomeIcon icon={faCity} />
    },
    {
      title: 'Hiring Cost',
      getValue: (type) => formatCurrency(Managers[type].cost),
      icon: <FontAwesomeIcon icon={faMoneyBillWave} />
    }
  ];

  return (
    <>
      <AddItemButton onClick={openModal} className={'add-button'}>
        <FontAwesomeIcon icon={faPlusCircle} size={'2x'} color={'white'} />
      </AddItemButton>
      <F7Popover opened={isModalOpen} onPopoverClosed={closeModal} target={'.add-button'} themeDark style={{ width: '340px' }}>
        {page === GamePage.Businesses ? (
          <AddItemModalContent
            key={'businesses-modal'}
            open={isModalOpen}
            onCreate={onCreateNewBusiness}
            wallet={wallet}
            defaultValue={BusinessType.FastFood}
            source={Businesses}
            title={'Business'}
            icons={BusinessIcons}
            dataValues={businessDataValues}
          />
        ) : (
          <AddItemModalContent
            key={'managers-modal'}
            open={isModalOpen}
            onCreate={onCreateNewManager}
            wallet={wallet}
            defaultValue={ManagerType.Clerk}
            source={Managers}
            title={'Manager'}
            icons={ManagerIcons}
            dataValues={managerDataValues}
          />
        )}
      </F7Popover>
    </>
  );
};

export default AddItem;
