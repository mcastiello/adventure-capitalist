import {
  addBusiness,
  collectProfit,
  setBusinessLevel,
  setBusinessManaged,
  setCollectionAvailable,
  updateProfit,
  upgradeBusiness
} from './businessesActions';
import { BusinessLevel, BusinessType } from './businessesTypes';
import { defaultSystemState, rootReducer } from '../index';
import { expectSaga } from 'redux-saga-test-plan';
import { collectBusinessProfit, resetManagedFlag, updateCollectionStatus, upgradeBusinessLevel } from './businessesSaga';
import { getBusinesses, getFlaggedUnmanagedBusinesses } from './businessesSelectors';
import { ManagerType } from '../managers/managersTypes';
import { addManagedBusiness, addManager, removeManager } from '../managers/managersActions';
import { Businesses, BusinessLevels } from '../../../definitions/Businesses';
import { getWalletAmount } from '../user/userSelector';
import { updateWallet } from '../user/userActions';

describe('Test businessesSaga', () => {
  Date.now = jest.fn().mockReturnValue(100000);

  it('should collect the profit for a specific business', () => {
    const businessType = BusinessType.CoffeeShop;
    const newBusiness = addBusiness('test', businessType);
    const collectionTime = Date.now() - Businesses[businessType].profitInterval * 1000;

    let state = rootReducer(defaultSystemState, newBusiness);

    const businessId = state.businesses[0].id;
    const businessProfit = Businesses[businessType].profitAmount;
    const setCollection = updateProfit(businessId, 0, collectionTime);

    state = rootReducer(state, setCollection);

    const collect = collectProfit(businessId);

    return expectSaga(collectBusinessProfit, collect)
      .withState(state)
      .select(getBusinesses)
      .put(updateProfit(businessId, businessProfit, Date.now()))
      .run();
  });
  it('should reset the managed flag when a manager is removed', () => {
    const businessType = BusinessType.CoffeeShop;
    const managerType = ManagerType.Clerk;
    const newBusiness = addBusiness('test', businessType);
    const newManager = addManager('test', managerType);

    let state = rootReducer(defaultSystemState, newBusiness);
    state = rootReducer(state, newManager);

    const businessId = state.businesses[0].id;
    const managerId = state.managers[0].id;

    const addManaged = addManagedBusiness(managerId, businessId);
    const setManaged = setBusinessManaged(businessId, true);
    const remove = removeManager(managerId);

    state = rootReducer(state, addManaged);
    state = rootReducer(state, setManaged);
    state = rootReducer(state, remove);

    expectSaga(resetManagedFlag).withState(state).select(getFlaggedUnmanagedBusinesses).put(setBusinessManaged(businessId, false)).run();
  });
  it('should set the collection status as available after the time interval is elapsed', () => {
    const businessType = BusinessType.CoffeeShop;
    const newBusiness = addBusiness('test', businessType);
    const interval = Businesses[businessType].profitInterval * 1000;

    let state = rootReducer(defaultSystemState, newBusiness);

    const businessId = state.businesses[0].id;
    const profit = updateProfit(businessId, 0, Date.now() - interval);

    state = rootReducer(state, profit);

    expectSaga(updateCollectionStatus).withState(state).select(getBusinesses).put(setCollectionAvailable(businessId)).run();
  });
  it('should set the collection status as available after the time interval is elapsed', () => {
    const businessType = BusinessType.CoffeeShop;
    const newBusiness = addBusiness('test', businessType);
    const upgradeCost = Businesses[businessType].cost * (BusinessLevels[BusinessLevel.One].upgradeCostMultiplier || 1);

    let state = rootReducer(defaultSystemState, newBusiness);

    const businessId = state.businesses[0].id;
    const upgrade = upgradeBusiness(businessId);

    expectSaga(upgradeBusinessLevel, upgrade)
      .withState(state)
      .select(getBusinesses)
      .select(getWalletAmount)
      .put(updateWallet(-upgradeCost))
      .put(setBusinessLevel(businessId, BusinessLevel.Two))
      .run();
  });
});
