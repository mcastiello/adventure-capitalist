import { addManagedBusiness, addManager, removeManagedBusiness, updateManagerProfit } from './managersActions';
import { expectSaga } from 'redux-saga-test-plan';
import { manageBusinesses, updateBusinessStatus, updateManagesBusinessStatus } from './managersSaga';
import { addBusiness, removeBusiness, setBusinessManaged, updateProfit } from '../businesses/businessesActions';
import { BusinessType } from '../businesses/businessesTypes';
import { ManagerType } from './managersTypes';
import { defaultSystemState, rootReducer } from '../index';
import { getManagers } from './managersSelectors';
import { getBusinesses } from '../businesses/businessesSelectors';
import { Businesses } from '../../../definitions/Businesses';
import { Managers } from '../../../definitions/Managers';
import { select } from 'redux-saga-test-plan/matchers';

describe('Test managersSaga', () => {
  Date.now = jest.fn().mockReturnValue(100000);

  it('should set a business as managed when added to a manager', () => {
    const businessId = 'business';
    const addAction = addManagedBusiness('test', businessId);

    return expectSaga(updateBusinessStatus, addAction)
      .put(updateProfit(businessId, 0, Date.now()))
      .put(setBusinessManaged(businessId, true))
      .run();
  });
  it('should set a business as unmanaged when removed from a manager', () => {
    const businessId = 'business';
    const removeAction = removeManagedBusiness('test', businessId);

    return expectSaga(updateBusinessStatus, removeAction)
      .put(updateProfit(businessId, 0, Date.now()))
      .put(setBusinessManaged(businessId, false))
      .run();
  });
  it('should remove a business from the managed list when deleted', () => {
    const businessId = 'business';
    const managerId = 'manager';
    const removeAction = removeBusiness(businessId);

    return expectSaga(updateManagesBusinessStatus, removeAction)
      .provide([[select(getManagers), [{ id: managerId, managedBusinesses: [businessId] }]]])
      .put(removeManagedBusiness(managerId, businessId))
      .run();
  });

  it('should trigger the manager to collect from business', () => {
    const businessType = BusinessType.CoffeeShop;
    const managerType = ManagerType.Clerk;
    const collectionTime = Math.floor(Date.now() - Businesses[businessType].profitInterval * 1000 * Managers[managerType].timeBonus);
    const profit = Businesses[businessType].profitAmount * (1 - Managers[managerType].profitCut / 100);
    const newBusiness = addBusiness('test', businessType);
    const newManager = addManager('test', managerType);

    let state = rootReducer(defaultSystemState, newBusiness);
    state = rootReducer(state, newManager);

    const businessId = state.businesses[0].id;
    const managerId = state.managers[0].id;

    const addManaged = addManagedBusiness(managerId, businessId);
    const setManaged = setBusinessManaged(businessId, true);
    const setCollection = updateProfit(businessId, 0, collectionTime);

    state = rootReducer(state, addManaged);
    state = rootReducer(state, setManaged);
    state = rootReducer(state, setCollection);

    // @ts-ignore
    return expectSaga(manageBusinesses)
      .withState(state)
      .select(getManagers)
      .select(getBusinesses)
      .put(updateProfit(businessId, profit, Date.now()))
      .put(updateManagerProfit(managerId, profit))
      .run();
  });
});
