import { addBusiness, updateProfit } from '../businesses/businessesActions';
import { expectSaga } from 'redux-saga-test-plan';
import { updateWalletAfterBuyingNewBusiness, updateWalletAfterHiringManager, updateWalletProfits } from './userSaga';
import { updateWallet } from './userActions';
import { Managers, ManagerType } from '../managers/managersTypes';
import { addManager } from '../managers/managersActions';
import { Businesses, BusinessType } from '../businesses/businessesTypes';

describe('Test userSaga', () => {
  it('should bank the business profits into the wallet', () => {
    const profit = 10;
    const action = updateProfit('test', profit);

    return expectSaga(updateWalletProfits, action).put(updateWallet(profit)).run();
  });
  it('should pay for hiring a new manager', () => {
    const type = ManagerType.Clerk;
    const cost = Managers[type].cost;
    const action = addManager('test', type);

    return expectSaga(updateWalletAfterHiringManager, action)
      .put(updateWallet(0 - cost))
      .run();
  });
  it('should pay for buying a new business', () => {
    const type = BusinessType.CoffeeShop;
    const cost = Businesses[type].cost;
    const action = addBusiness('test', type);

    return expectSaga(updateWalletAfterBuyingNewBusiness, action)
      .put(updateWallet(0 - cost))
      .run();
  });
});
