import { all } from '@redux-saga/core/effects';
import { combineReducers, AnyAction } from 'redux';
import { defaultUserState, UserState } from './user/userState';
import { BusinessesState, defaultBusinessState } from './businesses/businessesState';
import { defaultManagersState, ManagersState } from './managers/managersState';
import { BusinessesActions } from './businesses/businessesActions';
import { ManagersActions } from './managers/managersActions';
import { UserActions } from './user/userActions';
import businessesSaga from './businesses/businessesSaga';
import managersSaga from './managers/managersSaga';
import userSaga from './user/userSaga';
import businessesReducer from './businesses/businessesReducer';
import managersReducer from './managers/managersReducer';
import userReducer from './user/userReducer';

export type Actions = BusinessesActions | ManagersActions | UserActions;

export type SystemState = {
  user: UserState;
  businesses: BusinessesState;
  managers: ManagersState;
};

export const defaultSystemState: SystemState = {
  user: defaultUserState,
  businesses: defaultBusinessState,
  managers: defaultManagersState
};

export function* rootSaga() {
  const sagas = [businessesSaga, managersSaga, userSaga];

  yield all(sagas.map((saga) => saga()));
}

const combinedReducers = combineReducers({
  businesses: businessesReducer,
  managers: managersReducer,
  user: userReducer
});

export const rootReducer = (state: SystemState = defaultSystemState, action: AnyAction) => combinedReducers(state, action as Actions);
