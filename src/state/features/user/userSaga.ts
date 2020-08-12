import { put, takeEvery } from 'redux-saga/effects';
import { ADD_BUSINESS, AddBusinessAction, UPDATE_PROFIT, UpdateProfitAction } from '../businesses/businessesActions';
import { updateWallet } from './userActions';
import { ADD_MANAGER, AddManagerAction } from '../managers/managersActions';
import { Managers } from '../managers/managersTypes';
import { Businesses } from '../businesses/businessesTypes';

export default function* userSaga() {
  yield takeEvery(UPDATE_PROFIT, updateWalletProfits);
  yield takeEvery(ADD_MANAGER, updateWalletAfterHiringManager);
  yield takeEvery(ADD_BUSINESS, updateWalletAfterBuyingNewBusiness);
}

export function* updateWalletProfits(action: UpdateProfitAction) {
  yield put(updateWallet(action.amount));
}

export function* updateWalletAfterHiringManager(action: AddManagerAction) {
  const definition = Managers[action.managerType];

  if (definition) {
    yield put(updateWallet(0 - definition.cost));
  }
}

export function* updateWalletAfterBuyingNewBusiness(action: AddBusinessAction) {
  const definition = Businesses[action.businessType];

  if (definition) {
    yield put(updateWallet(0 - definition.cost));
  }
}
