import { SystemState } from '../index';
import { createSelector } from 'reselect';
import { BusinessID } from '../businesses/businessesTypes';

export const getManagers = (state: SystemState) => state.managers;

export const getManagedBusinesses = createSelector(getManagers, (managers) => {
  const result: BusinessID[] = [];
  managers.forEach((manager) => {
    result.push(...manager.managedBusinesses);
  });

  return result;
});

