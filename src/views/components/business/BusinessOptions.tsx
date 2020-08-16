import React, { useCallback, useState } from 'react';
import { BusinessOptionsProps } from '../../GameProps';
import { F7Button, F7List, F7Popover } from 'framework7-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCertificate, faChartLine, faClock, faMoneyBillWave, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { ItemDescription, ListDeleteButton, ListItem, ListUpgradeButton } from '../CommonStyledComponents';
import { formatCurrency, formatTime } from '../../../helpers';
import { Businesses } from '../../../definitions/Businesses';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAmount } from '../../../state/features/user/userSelector';
import { upgradeBusiness } from '../../../state/features/businesses/businessesActions';
import { getManagers } from '../../../state/features/managers/managersSelectors';
import { ManagerIcons } from '../../icons/ManagerIcons';
import styled from 'styled-components';

const OptionsButton = styled(F7Button)`
  width: 35px;
  background: var(--blue-background);
  margin-left: 5px;
  top: 4px;
  display: inline-block;
`;

const BusinessOptions: React.FC<BusinessOptionsProps> = ({ business, onDelete, disabled }) => {
  const wallet = useSelector(getWalletAmount);
  const managers = useSelector(getManagers);
  const manager = managers.find((manager) => manager.managedBusinesses.some((id) => id === business.id));
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const modalCloseCallback = useCallback(() => setModalOpen(false), []);
  const modalOpenCallback = useCallback(() => setModalOpen(true), []);
  const modalUpgradeCallback = useCallback(() => {
    dispatch(upgradeBusiness(business.id));
    setModalOpen(false);
  }, [dispatch, business]);
  const modalDeleteCallback = useCallback(() => {
    onDelete();
    setModalOpen(false);
  }, [onDelete]);

  return (
    <>
      <OptionsButton
        key={`options-${business.id}`}
        disabled={disabled}
        className={`options-${business.id}`}
        color={'white'}
        onClick={modalOpenCallback}
      >
        <FontAwesomeIcon icon={faBars} />
      </OptionsButton>
      <F7Popover
        key={`popover-${business.id}`}
        opened={isModalOpen}
        onPopoverClosed={modalCloseCallback}
        target={`.options-${business?.id}`}
        themeDark
        style={{ width: '340px' }}
      >
        <F7List themeDark>
          <ListItem title={'Total Profits'} after={formatCurrency(business.totalProfits)}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faChartLine} />
            </span>
          </ListItem>
          <ListItem title={'Corrent Level'} after={business.level}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faCertificate} />
            </span>
          </ListItem>
          {manager && (
            <ListItem title={'Managed By'} after={manager.name}>
              <span slot={'media'}>{ManagerIcons[manager.type]}</span>
            </ListItem>
          )}
          <ListItem title={'Profit Interval'} after={formatTime(business.interval)}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faClock} />
            </span>
          </ListItem>
          <ListItem title={'Profit Amount'} after={formatCurrency(business.profit)}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faPiggyBank} />
            </span>
          </ListItem>
          {business.upgradeCost && (
            <ListItem title={'Upgrade Cost'} after={formatCurrency(business.upgradeCost)}>
              <span slot={'media'}>
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </span>
            </ListItem>
          )}
        </F7List>
        <ItemDescription>{Businesses[business.type].description}</ItemDescription>
        <ListUpgradeButton
          text={business.upgradeCost && business.upgradeCost <= wallet ? 'Upgrade' : 'Not Upgradable'}
          disabled={!business.upgradeCost || business.upgradeCost > wallet}
          onClick={modalUpgradeCallback}
        />
        <ListDeleteButton text={'Delete'} onClick={modalDeleteCallback} />
      </F7Popover>
    </>
  );
};

export default BusinessOptions;
