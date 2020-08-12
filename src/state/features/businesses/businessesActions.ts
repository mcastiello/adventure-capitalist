import { BusinessID, BusinessType } from './businessesTypes';

export const ADD_BUSINESS = 'BUSINESSES/ADD';
export const REMOVE_BUSINESS = 'BUSINESSES/REMOVE';
export const RENAME_BUSINESS = 'BUSINESSES/RENAME';
export const COLLECT_PROFIT = 'BUSINESSES/COLLECT';
export const UPDATE_PROFIT = 'BUSINESSES/UPDATE_PROFIT';
export const SET_BUSINESS_MANAGED = 'BUSINESSES/SET_MANAGED';

export interface AddBusinessAction {
  type: typeof ADD_BUSINESS;
  name: string;
  businessType: BusinessType;
}
export const addBusiness = (name: string, businessType: BusinessType): AddBusinessAction => ({
  type: ADD_BUSINESS,
  name,
  businessType
});

export interface RemoveBusinessAction {
  type: typeof REMOVE_BUSINESS;
  id: BusinessID;
}
export const removeBusiness = (id: BusinessID): RemoveBusinessAction => ({
  type: REMOVE_BUSINESS,
  id
});

export interface RenameBusinessAction {
  type: typeof RENAME_BUSINESS;
  id: BusinessID;
  name: string;
}
export const renameBusiness = (id: BusinessID, name: string): RenameBusinessAction => ({
  type: RENAME_BUSINESS,
  id,
  name
});

export interface CollectProfitAction {
  type: typeof COLLECT_PROFIT;
  id: BusinessID;
}
export const collectProfit = (id: BusinessID): CollectProfitAction => ({
  type: COLLECT_PROFIT,
  id
});

export interface UpdateProfitAction {
  type: typeof UPDATE_PROFIT;
  id: BusinessID;
  amount: number;
  collectionTime?: number;
}
export const updateProfit = (id: BusinessID, amount: number, collectionTime?: number): UpdateProfitAction => ({
  type: UPDATE_PROFIT,
  id,
  amount,
  collectionTime
});

export interface SetBusinessManagedAction {
  type: typeof SET_BUSINESS_MANAGED;
  id: BusinessID;
  value: boolean;
}
export const setBusinessManaged = (id: BusinessID, value: boolean): SetBusinessManagedAction => ({
  type: SET_BUSINESS_MANAGED,
  id,
  value
});

export type BusinessesActions =
  | AddBusinessAction
  | RemoveBusinessAction
  | RenameBusinessAction
  | CollectProfitAction
  | UpdateProfitAction
  | SetBusinessManagedAction;
