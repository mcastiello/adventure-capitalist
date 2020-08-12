import { ManagerType } from './managersTypes';
import {
  addManagedBusiness,
  addManager,
  removeManagedBusiness,
  removeManager,
  renameManager,
  updateManagerProfit
} from './managersActions';
import managersReducer from './managersReducer';
import { defaultManagersState } from './managersState';

describe('Test managersReducer', () => {
  it('should add a new manager', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    expect(state.length).toBe(1);
    expect(state[0].name).toBe(name);
    expect(state[0].type).toBe(type);
    expect(state[0].totalProfits).toBe(0);
  });
  it('should rename an existing manager', () => {
    const name = 'BoredClerk';
    const newName = 'EnthusiasticClerk';
    const type = ManagerType.Clerk;
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const rename = renameManager(manager.id, newName);
    const newState = managersReducer(state, rename);

    expect(newState[0].id).toBe(state[0].id);
    expect(newState[0].name).toBe(newName);
  });
  it('should remove an existing manager', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const remove = removeManager(manager.id);
    const newState = managersReducer(state, remove);

    expect(newState.length).toBe(0);
  });
  it('should assign a business to a manager', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const businessId = 'MyBusinessId';
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const addBusiness = addManagedBusiness(manager.id, businessId);
    const newState = managersReducer(state, addBusiness);

    expect(newState[0].managedBusinesses.length).toBe(1);
    expect(newState[0].managedBusinesses[0]).toBe(businessId);
  });
  it('should not assign a business to a manager if the maximum amount of business is reached', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const businessId1 = 'MyBusinessId';
    const businessId2 = 'MyBusinessIdIgnored';
    const action = addManager(name, type);

    let state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const addBusiness = addManagedBusiness(manager.id, businessId1);
    const addBusinessIgnored = addManagedBusiness(manager.id, businessId2);
    state = managersReducer(state, addBusiness);
    state = managersReducer(state, addBusinessIgnored);

    expect(state[0].managedBusinesses.length).toBe(1);
    expect(state[0].managedBusinesses[0]).toBe(businessId1);
  });
  it('should remove a managed business', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const businessId = 'MyBusinessId';
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const addBusiness = addManagedBusiness(manager.id, businessId);
    const newState = managersReducer(state, addBusiness);
    const removeBusiness = removeManagedBusiness(manager.id, businessId);
    const finalState = managersReducer(newState, removeBusiness);

    expect(finalState[0].managedBusinesses.length).toBe(0);
  });
  it('should update the profit of a manager', () => {
    const name = 'BoredClerk';
    const type = ManagerType.Clerk;
    const profit = 10;
    const action = addManager(name, type);

    const state = managersReducer(defaultManagersState, action);

    const manager = state[0];

    const update = updateManagerProfit(manager.id, profit);
    const newState = managersReducer(state, update);

    expect(newState[0].id).toBe(manager.id);
    expect(newState[0].totalProfits).toBe(profit);
  });
});
