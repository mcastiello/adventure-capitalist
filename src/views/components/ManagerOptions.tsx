import React, { useCallback, useState } from 'react';
import { ManagerOptionsProps } from '../GameProps';
import { F7Button, F7List, F7Popover } from 'framework7-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faChartLine, faCity, faClock, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { ItemDescription, ListButton, ListItem } from './CommonStyledComponents';
import { formatCurrency } from '../../helpers';
import { Managers } from '../../definitions/Managers';
import styled from 'styled-components';

const OptionsButton = styled(F7Button)`
  width: 35px;
  background: var(--blue-background);
  margin-left: 5px;
  top: 4px;
  display: inline-block;
`;

const ManagerOptions: React.FC<ManagerOptionsProps> = ({ manager, onDelete, disabled }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalCloseCallback = useCallback(() => setModalOpen(false), []);
  const modalOpenCallback = useCallback(() => setModalOpen(true), []);
  const modalDeleteCallback = useCallback(() => {
    onDelete();
    setModalOpen(false);
  }, [onDelete]);

  return (
    <>
      <OptionsButton
        key={`options-${manager.id}`}
        className={`options-${manager.id}`}
        disabled={disabled}
        color={'white'}
        onClick={modalOpenCallback}
      >
        <FontAwesomeIcon icon={faBars} />
      </OptionsButton>
      <F7Popover
        key={`popover-${manager.id}`}
        opened={isModalOpen}
        onPopoverClosed={modalCloseCallback}
        target={`.options-${manager?.id}`}
        themeDark
        style={{ width: '340px' }}
      >
        <F7List themeDark>
          <ListItem title={'Total Profits'} after={formatCurrency(manager.totalProfits)}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faChartLine} />
            </span>
          </ListItem>
          <ListItem title={'Time Bonus'} after={`${Managers[manager.type].timeBonus}x`}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faClock} />
            </span>
          </ListItem>
          <ListItem title={'Profit Cut'} after={`${Managers[manager.type].profitCut}%`}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faPiggyBank} />
            </span>
          </ListItem>
          <ListItem title={'Business Capacity'} after={`${Managers[manager.type].maxNumberOfBusinesses}`}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faCity} />
            </span>
          </ListItem>
          <ListItem title={'Managed Businesses'} after={`${manager.managedBusinesses.length}`}>
            <span slot={'media'}>
              <FontAwesomeIcon icon={faBook} />
            </span>
          </ListItem>
        </F7List>
        <ItemDescription>{Managers[manager.type].description}</ItemDescription>
        <ListButton bgColor={'red'} text={'Delete'} onClick={modalDeleteCallback} />
      </F7Popover>
    </>
  );
};

export default ManagerOptions;
