import { Manager, ManagerType } from './managersTypes';
import { defaultSystemState, SystemState } from '../index';
import { BusinessID } from '../businesses/businessesTypes';
import { getManagedBusinesses } from './managersSelectors';

describe('Test managersSelectors', () => {
  const ids: BusinessID[] = ['test-1', 'test-2', 'test-3', 'test-4', 'test-5'];
  const mockManager1: Manager = {
    id: 'manager-id1',
    type: ManagerType.SeniorManager,
    name: 'Marco',
    managedBusinesses: [ids[0], ids[4], ids[2]],
    totalProfits: 0
  };
  const mockManager2: Manager = {
    id: 'manager-id2',
    type: ManagerType.CEO,
    name: 'Elisa',
    managedBusinesses: [ids[1], ids[3]],
    totalProfits: 0
  };
  const mockState: SystemState = {
    ...defaultSystemState,
    managers: [mockManager2, mockManager1]
  };
  it('should get the list of IDs of all the managed businesses', () => {
    const managedBusinesses: BusinessID[] = getManagedBusinesses(mockState);

    managedBusinesses.sort();

    expect(managedBusinesses.length).toBe(5);
    expect(managedBusinesses).toEqual(ids);
  });
});
