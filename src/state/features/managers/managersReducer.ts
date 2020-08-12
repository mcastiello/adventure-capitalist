import { defaultManagersState, ManagersState } from './managersState';
import {
  ADD_MANAGED_BUSINESS,
  ADD_MANAGER,
  ManagersActions,
  REMOVE_MANAGED_BUSINESS,
  REMOVE_MANAGER,
  RENAME_MANAGER,
  UPDATE_MANAGER_PROFIT
} from './managersActions';
import { v4 as uuidv4 } from 'uuid';
import { Managers } from './managersTypes';

export default function managersReducer(state: ManagersState = defaultManagersState, action: ManagersActions): ManagersState {
  switch (action.type) {
    case ADD_MANAGER:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.name,
          type: action.managerType,
          totalProfits: 0,
          managedBusinesses: []
        }
      ];
    case REMOVE_MANAGER:
      return state.filter((manager) => manager.id !== action.id);
    case RENAME_MANAGER:
      return state.map((manager) => {
        if (manager.id === action.id) {
          manager = { ...manager, name: action.name };
        }
        return manager;
      });
    case UPDATE_MANAGER_PROFIT:
      return state.map((manager) => {
        if (manager.id === action.id) {
          manager = { ...manager, totalProfits: manager.totalProfits + action.profit };
        }
        return manager;
      });
    case ADD_MANAGED_BUSINESS:
      return state.map((manager) => {
        if (manager.id === action.id && manager.managedBusinesses.length < Managers[manager.type].maxNumberOfBusinesses) {
          manager = { ...manager, managedBusinesses: [...manager.managedBusinesses, action.business] };
        }
        return manager;
      });
    case REMOVE_MANAGED_BUSINESS:
      return state.map((manager) => {
        if (manager.id === action.id) {
          manager = { ...manager, managedBusinesses: manager.managedBusinesses.filter((business) => business !== action.business) };
        }
        return manager;
      });
    default:
      return state;
  }
}
