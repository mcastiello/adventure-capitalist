import { select, put, takeEvery } from 'redux-saga/effects';
import { COLLECT_PROFIT, CollectProfitAction, setBusinessManaged, updateProfit } from './businessesActions';
import { Business, Businesses, BusinessID } from './businessesTypes';
import { REMOVE_MANAGER } from '../managers/managersActions';
import { getBusinesses, getFlaggedUnmanagedBusinesses } from './businessesSelectors';

export default function* businessesSaga() {
  yield takeEvery(COLLECT_PROFIT, collectBusinessProfit);
  yield takeEvery(REMOVE_MANAGER, resetManagedFlag);
}

export function* collectBusinessProfit(action: CollectProfitAction) {
  const collectionTime = Date.now();
  const business: Business | undefined = ((yield select(getBusinesses)) as Business[]).find((business) => business.id === action.id);

  if (business) {
    const businessDefinition = Businesses[business.type];

    if (business.lastProfitCollected + businessDefinition.profitInterval * 1000 <= collectionTime) {
      yield put(updateProfit(business.id, businessDefinition.profitAmount));
    }
  }
}

export function* resetManagedFlag() {
  const managedBusinesses: BusinessID[] = yield select(getFlaggedUnmanagedBusinesses);

  for (let i = 0, ii = managedBusinesses.length; i < ii; i++) {
    yield put(setBusinessManaged(managedBusinesses[i], false));
  }
}
