import { ManagerID, ManagerType } from './managersTypes';
import { BusinessID } from '../businesses/businessesTypes';

export const ADD_MANAGER = 'MANAGERS/ADD';
export const REMOVE_MANAGER = 'MANAGERS/REMOVE';
export const RENAME_MANAGER = 'MANAGERS/RENAME';
export const ADD_MANAGED_BUSINESS = 'MANAGERS/ADD_BUSINESS';
export const REMOVE_MANAGED_BUSINESS = 'MANAGERS/REMOVE_BUSINESS';
export const UPDATE_MANAGER_PROFIT = 'MANAGERS/UPDATE_PROFIT';

export interface AddManagerAction {
  type: typeof ADD_MANAGER;
  name: string;
  managerType: ManagerType;
}
export const addBusiness = (name: string, managerType: ManagerType): AddManagerAction => ({
  type: ADD_MANAGER,
  name,
  managerType
});

export interface RemoveManagerAction {
  type: typeof REMOVE_MANAGER;
  id: ManagerID;
}
export const removeManager = (id: ManagerID): RemoveManagerAction => ({
  type: REMOVE_MANAGER,
  id
});

export interface RenameManagerAction {
  type: typeof RENAME_MANAGER;
  id: ManagerID;
  name: string;
}
export const renameManager = (id: ManagerID, name: string): RenameManagerAction => ({
  type: RENAME_MANAGER,
  id,
  name
});

export interface AddManagedBusinessAction {
  type: typeof ADD_MANAGED_BUSINESS;
  id: ManagerID;
  business: BusinessID;
}
export const addManagedBusiness = (id: ManagerID, business: BusinessID): AddManagedBusinessAction => ({
  type: ADD_MANAGED_BUSINESS,
  id,
  business
});

export interface RemoveManagedBusinessAction {
  type: typeof REMOVE_MANAGED_BUSINESS;
  id: ManagerID;
  business: BusinessID;
}
export const removeManagedBusiness = (id: ManagerID, business: BusinessID): RemoveManagedBusinessAction => ({
  type: REMOVE_MANAGED_BUSINESS,
  id,
  business
});

export interface UpdateManagerProfitAction {
  type: typeof UPDATE_MANAGER_PROFIT;
  id: ManagerID;
  profit: number;
}
export const updateManagerProfit = (id: ManagerID, profit: number): UpdateManagerProfitAction => ({
  type: UPDATE_MANAGER_PROFIT,
  id,
  profit
});

export type ManagersActions =
  | AddManagerAction
  | RemoveManagerAction
  | RenameManagerAction
  | AddManagedBusinessAction
  | RemoveManagedBusinessAction
  | UpdateManagerProfitAction;
