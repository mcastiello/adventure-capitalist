import { select, put, fork, call, takeEvery } from 'redux-saga/effects';
import { COLLECT_PROFIT, CollectProfitAction, setBusinessManaged, setCollectionAvailable, updateProfit } from './businessesActions';
import { Business, BusinessID } from './businessesTypes';
import { REMOVE_MANAGER } from '../managers/managersActions';
import { getBusinesses, getFlaggedUnmanagedBusinesses } from './businessesSelectors';
import { sleep } from '../../../helpers';
import { Businesses } from '../../../definitions/Businesses';

export default function* businessesSaga() {
  yield takeEvery(COLLECT_PROFIT, collectBusinessProfit);
  yield takeEvery(REMOVE_MANAGER, resetManagedFlag);
  yield fork(collectionTask);
}

export function* collectionTask() {
  while (true) {
    yield call(sleep, 250);
    yield updateCollectionStatus();
  }
}

export function* updateCollectionStatus() {
  const businesses: Business[] = yield select(getBusinesses);
  const time = Date.now();

  for (let i = 0, ii = businesses.length; i < ii; i++) {
    const business = businesses[i];
    const definition = Businesses[business.type];
    const elapsed = time - business.lastProfitCollected;

    if (!business.managed && !business.collectionAvailable && elapsed >= definition.profitInterval * 1000) {
      yield put(setCollectionAvailable(business.id));
    }
  }
}

export function* collectBusinessProfit(action: CollectProfitAction) {
  const collectionTime = Date.now();
  const business: Business | undefined = ((yield select(getBusinesses)) as Business[]).find((business) => business.id === action.id);

  if (business) {
    const businessDefinition = Businesses[business.type];

    if (business.lastProfitCollected + businessDefinition.profitInterval * 1000 <= collectionTime) {
      yield put(updateProfit(business.id, businessDefinition.profitAmount, collectionTime));
    }
  }
}

export function* resetManagedFlag() {
  const managedBusinesses: BusinessID[] = yield select(getFlaggedUnmanagedBusinesses);

  for (let i = 0, ii = managedBusinesses.length; i < ii; i++) {
    yield put(setBusinessManaged(managedBusinesses[i], false));
  }
}
