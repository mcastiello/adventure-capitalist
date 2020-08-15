import { BusinessesState, defaultBusinessState } from './businessesState';
import {
  ADD_BUSINESS,
  BusinessesActions,
  REMOVE_BUSINESS,
  RENAME_BUSINESS,
  SET_BUSINESS_LEVEL,
  SET_BUSINESS_MANAGED,
  SET_COLLECTION_AVAILABLE,
  UPDATE_PROFIT
} from './businessesActions';
import { v4 as uuidv4 } from 'uuid';
import { BusinessLevel } from './businessesTypes';

export default function businessesReducer(state: BusinessesState = defaultBusinessState, action: BusinessesActions): BusinessesState {
  switch (action.type) {
    case ADD_BUSINESS:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.name,
          type: action.businessType,
          lastProfitCollected: Date.now(),
          totalProfits: 0,
          managed: false,
          collectionAvailable: false,
          level: BusinessLevel.One
        }
      ];
    case REMOVE_BUSINESS:
      return state.filter((business) => business.id !== action.id);
    case RENAME_BUSINESS:
      return state.map((business) => {
        if (business.id === action.id) {
          business = { ...business, name: action.name };
        }
        return business;
      });
    case UPDATE_PROFIT:
      return state.map((business) => {
        if (business.id === action.id) {
          business = {
            ...business,
            totalProfits: business.totalProfits + action.amount,
            lastProfitCollected: action.collectionTime,
            collectionAvailable: false
          };
        }
        return business;
      });
    case SET_BUSINESS_MANAGED:
      return state.map((business) => {
        if (business.id === action.id) {
          business = {
            ...business,
            managed: action.value
          };
        }
        return business;
      });
    case SET_BUSINESS_LEVEL:
      return state.map((business) => {
        if (business.id === action.id) {
          business = {
            ...business,
            level: action.level
          };
        }
        return business;
      });
    case SET_COLLECTION_AVAILABLE:
      return state.map((business) => {
        if (business.id === action.id) {
          business = {
            ...business,
            collectionAvailable: true
          };
        }
        return business;
      });
    default:
      return state;
  }
}
