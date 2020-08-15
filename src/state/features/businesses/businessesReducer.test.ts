import { BusinessLevel, BusinessType } from './businessesTypes';
import {
  addBusiness,
  removeBusiness,
  renameBusiness,
  setBusinessLevel,
  setBusinessManaged,
  setCollectionAvailable,
  updateProfit
} from './businessesActions';
import businessesReducer from './businessesReducer';
import { defaultBusinessState } from './businessesState';

describe('Test businessesReducer', () => {
  it('should add a new business', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    expect(state.length).toBe(1);
    expect(state[0].name).toBe(name);
    expect(state[0].type).toBe(type);
    expect(state[0].totalProfits).toBe(0);
    expect(state[0].managed).toBe(false);
  });
  it('should remove an existing business', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const remove = removeBusiness(state[0].id);
    const newState = businessesReducer(state, remove);

    expect(newState.length).toBe(0);
  });
  it('should rename an existing business', () => {
    const name = 'Coffee Addiction';
    const newName = 'Coffee Perfection';
    const type = BusinessType.CoffeeShop;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const business = state[0];
    const remove = renameBusiness(business.id, newName);
    const newState = businessesReducer(state, remove);

    expect(newState[0].name).toBe(newName);
    expect(newState[0].id).toBe(business.id);
  });
  it('should flag the business as managed', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const business = state[0];
    const setManaged = setBusinessManaged(business.id, true);
    const newState = businessesReducer(state, setManaged);

    expect(newState[0].managed).toBe(true);
    expect(newState[0].id).toBe(business.id);
  });
  it('should set the new business level', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const level = BusinessLevel.Three;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const business = state[0];
    const setLevel = setBusinessLevel(business.id, level);
    const newState = businessesReducer(state, setLevel);

    expect(newState[0].level).toBe(level);
    expect(newState[0].id).toBe(business.id);
  });
  it('should update the business profits', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const profit = 10;
    const collection = Date.now();
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const business = state[0];
    const update = updateProfit(business.id, profit, collection);
    const newState = businessesReducer(state, update);

    expect(newState[0].totalProfits).toBe(profit);
    expect(newState[0].lastProfitCollected).toBe(collection);
    expect(newState[0].id).toBe(business.id);
    expect(newState[0].level).toBe(BusinessLevel.One);
  });
  it('should update the business profits', () => {
    const name = 'Coffee Addiction';
    const type = BusinessType.CoffeeShop;
    const action = addBusiness(name, type);

    const state = businessesReducer(defaultBusinessState, action);

    const business = state[0];
    const update = setCollectionAvailable(business.id);
    const newState = businessesReducer(state, update);

    expect(newState[0].collectionAvailable).toBe(true);
    expect(newState[0].id).toBe(business.id);
  });
});
