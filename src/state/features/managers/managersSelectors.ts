import { createSelector } from 'reselect';
import { SystemState } from '../index';

export const getManagers = createSelector(
  (state: SystemState) => state.managers,
  (managers) => managers || []
);
