import { put, fork, call, select, takeEvery } from 'redux-saga/effects';
import {
  ADD_MANAGED_BUSINESS,
  REMOVE_MANAGED_BUSINESS,
  AddManagedBusinessAction,
  RemoveManagedBusinessAction,
  updateManagerProfit,
  removeManagedBusiness
} from './managersActions';
import { REMOVE_BUSINESS, RemoveBusinessAction, setBusinessManaged, updateProfit } from '../businesses/businessesActions';
import { Manager } from './managersTypes';
import { BusinessDetails, BusinessID } from '../businesses/businessesTypes';
import { sleep } from '../../../helpers';
import { getManagers } from './managersSelectors';
import { getBusinesses } from '../businesses/businessesSelectors';

export default function* managersSaga() {
  yield takeEvery([ADD_MANAGED_BUSINESS, REMOVE_MANAGED_BUSINESS], updateBusinessStatus);
  yield takeEvery(REMOVE_BUSINESS, updateManagesBusinessStatus);
  yield fork(manageTask);
}

export function* updateBusinessStatus(action: AddManagedBusinessAction | RemoveManagedBusinessAction) {
  yield put(updateProfit(action.business, 0, Date.now()));
  yield put(setBusinessManaged(action.business, action.type === ADD_MANAGED_BUSINESS));
}

export function* updateManagesBusinessStatus(action: RemoveBusinessAction) {
  const managers: Manager[] = yield select(getManagers);
  const manager = managers.find((manager) => manager.managedBusinesses.some((id) => id === action.id));

  if (manager) {
    yield put(removeManagedBusiness(manager.id, action.id));
  }
}

export function* manageTask() {
  while (true) {
    yield call(sleep, 100);
    yield manageBusinesses();
  }
}

export function* manageBusinesses() {
  const managers: Manager[] = yield select(getManagers);

  for (let i = 0, ii = managers.length; i < ii; i++) {
    yield collectFromManagedBusinesses(managers[i], managers[i].managedBusinesses);
  }
}

export function* collectFromManagedBusinesses(manager: Manager, businesses: BusinessID[]) {
  const time = Date.now();
  const businessList: BusinessDetails[] = yield select(getBusinesses);
  const managed = businesses.map((business) => businessList.find((element) => element.id === business));
  let collectedAmount = 0;

  for (let i = 0, ii = managed.length; i < ii; i++) {
    const business = managed[i];
    if (business) {
      const elapsed = (time - business.lastProfitCollected) / 1000;
      const interval = business.interval;
      const collections = Math.floor(elapsed / interval);
      if (collections > 0) {
        const lastCollection = Math.floor(business.lastProfitCollected + collections * interval * 1000);
        const amount = business.profit * collections;

        yield put(updateProfit(business.id, amount, lastCollection));

        collectedAmount += amount;
      }
    }
  }

  if (collectedAmount > 0) {
    yield put(updateManagerProfit(manager.id, collectedAmount));
  }
}
