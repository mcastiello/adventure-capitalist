import { select, put, takeEvery } from 'redux-saga/effects';
import { COLLECT_PROFIT, CollectProfitAction, updateProfit } from './businessesActions';
import { SystemState } from '../index';
import { Business, Businesses } from './businessesTypes';

export default function* businessesSaga() {
  yield takeEvery(COLLECT_PROFIT, collectBusinessProfit);
}

export function* collectBusinessProfit(action: CollectProfitAction) {
  const collectionTime = Date.now();
  const business: Business = yield select((state: SystemState) => state.businesses.find((business) => business.id === action.id));

  if (business) {
    const businessDefinition = Businesses[business.type];

    if (business.lastProfitCollected + businessDefinition.profitInterval * 1000 <= collectionTime) {
      yield put(updateProfit(business.id, businessDefinition.profitAmount));
    }
  }
}
