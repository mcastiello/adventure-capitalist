import { createSelector } from 'reselect';
import { SystemState } from '../index';
import { BusinessID } from './businessesTypes';
import { getManagers } from '../managers/managersSelectors';

export const getBusinesses = createSelector(
  (state: SystemState) => state.businesses,
  (businesses) => businesses || []
);

export const getManagedBusinesses = createSelector(getManagers, (managers) => {
  const result: BusinessID[] = [];
  managers.forEach((manager) => {
    result.push(...manager.managedBusinesses);
  });

  return result;
});

export const getFlaggedUnmanagedBusinesses = createSelector(
  getBusinesses,
  getManagedBusinesses,
  (businesses, managedBusinesses) => {
    return businesses
      .filter((business) => business.managed && !managedBusinesses.some((managed) => managed === business.id))
      .map((business) => business.id);
  }
);
