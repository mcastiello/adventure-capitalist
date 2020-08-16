import React from 'react';
import { ManagedBusinessProps } from '../../GameProps';
import { useSelector } from 'react-redux';
import { getBusinesses } from '../../../state/features/businesses/businessesSelectors';
import { F7List } from 'framework7-react';
import styled from 'styled-components';
import ManagedBusinessItem from './ManagedBusinessItem';

const List = styled(F7List)`
  margin: 0;

  &.list > ul {
    padding: 0;
  }

  &.list > ul > li .item-content {
    padding: 0;
    min-height: 0;
  }
  &.list > ul > li .item-content > div {
    padding: 0;
  }
  &.list > ul > li .item-content > .item-inner {
    display: flex;
    min-height: 0;
  }
`;

const ManagedBusinesses: React.FC<ManagedBusinessProps> = ({ manager, disabled }) => {
  const businesses = useSelector(getBusinesses);

  return (
    <>
      <div>Managed Businesses</div>
      <List themeDark>
        <ul>
          {manager.managedBusinesses
            .map((id) => businesses.find((business) => business.id === id))
            .map(
              (business) =>
                business && <ManagedBusinessItem key={business.id} managerId={manager.id} business={business} disabled={!!disabled} />
            )}
        </ul>
      </List>
    </>
  );
};

export default ManagedBusinesses;
