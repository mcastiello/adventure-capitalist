import React, { useCallback, useState } from 'react';
import { BusinessDetails } from '../../../state/features/businesses/businessesTypes';
import { formatCurrency } from '../../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { F7Button, F7SwipeoutActions, F7SwipeoutButton } from 'framework7-react';
import { collectProfit, removeBusiness } from '../../../state/features/businesses/businessesActions';
import { useDispatch } from 'react-redux';
import { StyledItem } from '../CommonStyledComponents';
import BusinessBadge from './BusinessBadge';
import BusinessOptions from './BusinessOptions';
import ProfitBar from './ProfitBar';
import styled from 'styled-components';

const CollectButton = styled(F7Button)`
  width: 80px;
  top: 4px;
  display: inline-block;
`;

const BusinessItem: React.FC<{ business: BusinessDetails }> = ({ business }) => {
  const [deleteState, setDeleteState] = useState(false);
  const dispatch = useDispatch();

  const resetDelete = useCallback(() => setDeleteState(false), []);
  const requestDelete = useCallback(() => setDeleteState(true), []);

  const collect = useCallback(() => {
    dispatch(collectProfit(business.id));
  }, [dispatch, business.id]);
  const confirmDelete = useCallback(() => {
    setDeleteState(false);
    dispatch(removeBusiness(business.id));
  }, [business.id, dispatch]);

  return (
    <StyledItem
      title={business.name}
      swipeout
      swipeoutOpened={deleteState}
      onSwipeoutClosed={resetDelete}
      onSwipeoutDeleted={confirmDelete}
    >
      <div slot={'media'}>
        <BusinessBadge type={business.type} level={business.level} />
      </div>
      <div slot={'after'}>
        <CollectButton
          color={'white'}
          text={business.collectionAvailable ? formatCurrency(business.profit) : business.managed ? '' : 'Wait'}
          bgColor={business.collectionAvailable ? 'green' : business.managed ? 'purple' : 'yellow'}
          disabled={!business.collectionAvailable || deleteState}
          onClick={collect}
        >
          {business.managed && <FontAwesomeIcon icon={faUser} />}
        </CollectButton>
        <BusinessOptions business={business} onDelete={requestDelete} disabled={deleteState} />
      </div>
      <div slot={'text'}>
        <ProfitBar interval={business.interval} lastCollection={business.lastProfitCollected} />
      </div>
      <F7SwipeoutActions right>
        <F7SwipeoutButton delete>Confirm Delete</F7SwipeoutButton>
      </F7SwipeoutActions>
    </StyledItem>
  );
};

export default BusinessItem;
