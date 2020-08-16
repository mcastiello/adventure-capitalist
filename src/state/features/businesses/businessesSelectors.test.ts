import { defaultSystemState, SystemState } from '../index';
import { Business, BusinessDetails, BusinessID, BusinessLevel, BusinessType } from './businessesTypes';
import { Manager, ManagerType } from '../managers/managersTypes';
import { getBusinesses, getFlaggedUnmanagedBusinesses, getUnmanagedBusinesses } from './businessesSelectors';

describe('Test businessesSelectors', () => {
  const mockBusiness: Business = {
    id: 'test-id',
    type: BusinessType.Restaurant,
    name: "Marco's Pizza",
    lastProfitCollected: Date.now(),
    totalProfits: 0,
    collectionAvailable: false,
    managed: true,
    level: BusinessLevel.Three
  };
  const mockUnmanagedBusiness: Business = {
    id: 'test-unmanaged-id',
    type: BusinessType.GameCompany,
    name: 'Pizza Gaming',
    lastProfitCollected: Date.now(),
    totalProfits: 0,
    collectionAvailable: false,
    managed: false,
    level: BusinessLevel.One
  };
  const mockManager: Manager = {
    id: 'manager-id',
    type: ManagerType.SeniorManager,
    name: 'Marco',
    managedBusinesses: [mockBusiness.id],
    totalProfits: 0
  };
  const mockState: SystemState = {
    ...defaultSystemState,
    businesses: [mockBusiness, mockUnmanagedBusiness],
    managers: [mockManager]
  };
  it('should retrieve the list of businesses improving with all the derived values', () => {
    const businesses: BusinessDetails[] = getBusinesses(mockState);

    expect(businesses.length).toBe(2);
    expect(businesses[0].id).toBe(mockBusiness.id);
    expect(businesses[0].profit).toBe(19.125);
    expect(businesses[0].interval).toBe(102);
    expect(businesses[0].upgradeCost).toBe(195);
    expect(businesses[1].id).toBe(mockUnmanagedBusiness.id);
    expect(businesses[1].profit).toBe(350);
    expect(businesses[1].interval).toBe(3600);
    expect(businesses[1].upgradeCost).toBe(2750);
  });
  it('should retrieve only the unmanaged businesses', () => {
    const businesses: BusinessDetails[] = getUnmanagedBusinesses(mockState);

    expect(businesses.length).toBe(1);
    expect(businesses[0].id).toBe(mockUnmanagedBusiness.id);
  });
  it('get the list of businesses marked as managed but manager has been removed', () => {
    const businesses: BusinessID[] = getFlaggedUnmanagedBusinesses({ ...mockState, managers: [] });

    expect(businesses.length).toBe(1);
    expect(businesses[0]).toBe(mockBusiness.id);
  });
});
