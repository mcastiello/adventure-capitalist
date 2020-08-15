import { select, put, fork, call, takeEvery } from 'redux-saga/effects';
import {
  COLLECT_PROFIT,
  UPGRADE_BUSINESS,
  CollectProfitAction,
  setBusinessManaged,
  setCollectionAvailable,
  updateProfit, UpgradeBusinessAction, setBusinessLevel
} from './businessesActions';
import { BusinessDetails, BusinessID, BusinessLevel } from './businessesTypes';
import { REMOVE_MANAGER } from '../managers/managersActions';
import { getBusinesses, getFlaggedUnmanagedBusinesses } from './businessesSelectors';
import { sleep } from '../../../helpers';
import { updateWallet } from '../user/userActions';
import { getWalletAmount } from '../user/userSelector';

export default function* businessesSaga() {
  yield takeEvery(COLLECT_PROFIT, collectBusinessProfit);
  yield takeEvery(REMOVE_MANAGER, resetManagedFlag);
  yield takeEvery(UPGRADE_BUSINESS, upgradeBusinessLevel);
  yield fork(collectionTask);
}

export function* collectionTask() {
  while (true) {
    yield call(sleep, 100);
    yield updateCollectionStatus();
  }
}

export function* updateCollectionStatus() {
  const businesses: BusinessDetails[] = yield select(getBusinesses);
  const time = Date.now();

  for (let i = 0, ii = businesses.length; i < ii; i++) {
    const business = businesses[i];
    const elapsed = time - business.lastProfitCollected;
    if (!business.managed && !business.collectionAvailable && elapsed >= business.interval * 1000) {
      yield put(setCollectionAvailable(business.id));
    }
  }
}

export function* collectBusinessProfit(action: CollectProfitAction) {
  const collectionTime = Date.now();
  const business: BusinessDetails | undefined = ((yield select(getBusinesses)) as BusinessDetails[]).find((business) => business.id === action.id);

  if (business) {
    if (business.lastProfitCollected + business.interval * 1000 <= collectionTime) {
      yield put(updateProfit(business.id, business.profit, collectionTime));
    }
  }
}

export function* resetManagedFlag() {
  const managedBusinesses: BusinessID[] = yield select(getFlaggedUnmanagedBusinesses);

  for (let i = 0, ii = managedBusinesses.length; i < ii; i++) {
    yield put(setBusinessManaged(managedBusinesses[i], false));
  }
}

export function* upgradeBusinessLevel(action: UpgradeBusinessAction) {
  const businesses: BusinessDetails[] = yield select(getBusinesses);
  const business = businesses.find((business) => business.id === action.id);
  const wallet = yield select(getWalletAmount);

  if (business && business.upgradeCost && business.upgradeCost < wallet) {
    const level = business.level + 1 as BusinessLevel;
    if (level in BusinessLevel) {
      yield put(updateWallet(-business.upgradeCost));
      yield put(setBusinessLevel(business.id, level));
    }
  }

}
