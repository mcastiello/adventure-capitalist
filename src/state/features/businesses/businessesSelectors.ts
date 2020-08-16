import { createSelector } from 'reselect';
import { SystemState } from '../index';
import { BusinessDetails, BusinessID } from './businessesTypes';
import { getManagedBusinesses, getManagers } from '../managers/managersSelectors';
import { Managers } from '../../../definitions/Managers';
import { Businesses, BusinessLevels } from '../../../definitions/Businesses';

export const getBusinesses = createSelector(
  (state: SystemState) => state.businesses,
  getManagers,
  (businesses, managers) => {
    const result: BusinessDetails[] = [];

    businesses.forEach((business) => {
      const manager = managers.find((manager) => manager.managedBusinesses.some((id) => id === business.id));
      const managerTimeMultiplier = manager ? Managers[manager.type].timeBonus : 1;
      const managerProfitMultiplier = manager ? 1 - Managers[manager.type].profitCut / 100 : 1;
      const levelTimeMultiplier = BusinessLevels[business.level].intervalMultiplier;
      const levelProfitMultiplier = BusinessLevels[business.level].profitMultiplier;
      const levelCostMultiplier = BusinessLevels[business.level].upgradeCostMultiplier;

      const businessDetails: BusinessDetails = {
        ...business,
        profit: Businesses[business.type].profitAmount * levelProfitMultiplier * managerProfitMultiplier,
        interval: Math.round(Businesses[business.type].profitInterval * levelTimeMultiplier * managerTimeMultiplier)
      };

      if (levelCostMultiplier) {
        businessDetails.upgradeCost = Businesses[business.type].cost * levelCostMultiplier;
      }

      result.push(businessDetails);
    });

    return result;
  }
);

export const getUnmanagedBusinesses = createSelector(getBusinesses, (businesses) => businesses.filter((business) => !business.managed));

export const getFlaggedUnmanagedBusinesses = createSelector(getBusinesses, getManagedBusinesses, (businesses, managedBusinesses) => {
  return businesses
    .filter((business) => business.managed && !managedBusinesses.some((managed) => managed === business.id))
    .map((business) => business.id);
});
