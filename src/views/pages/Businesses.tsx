import React, { useCallback, useEffect, useState } from 'react';
import { PageProps } from '../GameProps';
import { useDispatch, useSelector } from 'react-redux';
import { SystemState } from '../../state/features';
import { Business, BusinessID } from '../../state/features/businesses/businessesTypes';
import { F7Button, F7List, F7ListItem, F7SwipeoutActions, F7SwipeoutButton } from 'framework7-react';
import { BusinessIcons } from '../icons/BusinessIcons';
import { Businesses } from '../../definitions/Businesses';
import { formatCurrency } from '../../helpers';
import { collectProfit, removeBusiness } from '../../state/features/businesses/businessesActions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUsersCog } from '@fortawesome/free-solid-svg-icons';

const ProgressBarContainer = styled.div`
  position: relative;
  height 4px;
  border-radius: 3px;
  background: grey;
  width: calc(100% - 130px);
`;

const ProgressBar = styled.div`
  display: block;
  position: absolute;
  height 4px;
  border-radius: 3px;
  width: 100%;
  background: green;
  
  &.progress-animation {
    animation-name: progress;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
  
  @keyframes progress {
    0% {
      width: 0%;
      background: red;
    }
    50% {
      width: 50%;
      background: yellow;
    }
    100% {
      width: 100%;
      background: green;
    }
  }
`;

const IconSlot = styled.div`
  font-size: 28px;
  text-align: center;
`;

const TotalProfit = styled.span`
  position: relative;
  top: -1px;
  font-style: italic;
  color: yellow;
  font-size: 12px;
  margin-left: 5px;
`;

const CollectButton = styled(F7Button)`
  width: 80px;
  top: 4px;
`;

const DeleteButton = styled(F7Button)`
  width: 35px;
  background: red;
  margin-left: 5px;
  top: 4px;
`;

const ListItem = styled(F7ListItem)`
  & > .item-content > .item-inner {
    margin-left: 0;
  }
`;

const BusinessesPage: React.FC<PageProps> = () => {
  const [collectionDelay, setCollectionDelay] = useState<Record<BusinessID, number>>({});
  const [deleteState, setDeleteState] = useState<Record<BusinessID, boolean>>({});
  const businesses: Business[] = useSelector((state: SystemState) => state.businesses);
  const dispatch = useDispatch();
  const collect = useCallback(
    (id: BusinessID) => {
      dispatch(collectProfit(id));
      setCollectionDelay({ ...collectionDelay, [id]: 0 });
    },
    [dispatch, collectionDelay]
  );
  const setForDelete = useCallback(
    (id: BusinessID, state: boolean) => {
      setDeleteState({ ...deleteState, [id]: state });
    },
    [deleteState]
  );
  const confirmDelete = useCallback(
    (id: BusinessID) => {
      dispatch(removeBusiness(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const delayState: Record<BusinessID, number> = {};

    businesses.forEach((business) => {
      if (collectionDelay[business.id] === undefined) {
        delayState[business.id] = Math.round((business.lastProfitCollected - Date.now()) / 1000);
      }
    });

    if (Object.keys(collectionDelay).length === 0) {
      setCollectionDelay(delayState);
    }
  }, [businesses, collectionDelay]);

  return (
    <F7List themeDark mediaList>
      {businesses.map((business) => (
        <ListItem
          key={business.id}
          title={business.name}
          swipeout
          swipeoutOpened={deleteState[business.id]}
          onSwipeoutClosed={() => setForDelete(business.id, false)}
          onSwipeoutDeleted={() => confirmDelete(business.id)}
        >
          <IconSlot slot={'media'}>{BusinessIcons[business.type]}</IconSlot>
          <CollectButton
            slot={'after'}
            color={'white'}
            text={business.collectionAvailable ? formatCurrency(Businesses[business.type].profitAmount) : business.managed ? '' : 'Wait'}
            bgColor={business.collectionAvailable ? 'green' : business.managed ? 'cyan' : 'yellow'}
            disabled={!business.collectionAvailable}
            onClick={() => collect(business.id)}
          >
            {business.managed && <FontAwesomeIcon icon={faUsersCog} />}
          </CollectButton>
          <DeleteButton color={'white'} slot={'after'} onClick={() => setForDelete(business.id, true)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </DeleteButton>
          <TotalProfit slot={'title'}>{` (${formatCurrency(business.totalProfits)})`}</TotalProfit>
          <ProgressBarContainer slot={'text'}>
            <ProgressBar
              className={!business.collectionAvailable ? 'progress-animation' : ''}
              style={{
                animationDuration: `${Businesses[business.type].profitInterval}s`,
                animationDelay: `${collectionDelay[business.id]}s`
              }}
            />
          </ProgressBarContainer>
          <F7SwipeoutActions right>
            <F7SwipeoutButton delete>Delete</F7SwipeoutButton>
          </F7SwipeoutActions>
        </ListItem>
      ))}
    </F7List>
  );
};

export default BusinessesPage;
