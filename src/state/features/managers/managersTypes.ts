import { BusinessID } from '../businesses/businessesTypes';

export enum ManagerType {
  Clerk = 'clerk',
  JuniorManager = 'junior_manager',
  SeniorManager = 'senior_manager',
  Entrepreneur = 'entrepreneur',
  MasterOfFinance = 'master_of_finance'
}

export type ManagerDefinition = {
  profitCut: number;
  timeBonus: number;
  cost: number;
  maxNumberOfBusinesses: number;
};

export type ManagerID = string;

export type Manager = {
  id: ManagerID;
  type: ManagerType;
  name: string;
  managedBusinesses: BusinessID[];
  totalProfits: number;
};

export const Managers: Record<ManagerType, ManagerDefinition> = {
  [ManagerType.Clerk]: {
    profitCut: 0.01,
    timeBonus: 1.25,
    maxNumberOfBusinesses: 1,
    cost: 100
  },
  [ManagerType.JuniorManager]: {
    profitCut: 1,
    timeBonus: 1,
    maxNumberOfBusinesses: 1,
    cost: 200
  },
  [ManagerType.SeniorManager]: {
    profitCut: 5,
    timeBonus: 0.9,
    maxNumberOfBusinesses: 5,
    cost: 500
  },
  [ManagerType.Entrepreneur]: {
    profitCut: 25,
    timeBonus: 0.75,
    maxNumberOfBusinesses: 25,
    cost: 2000
  },
  [ManagerType.MasterOfFinance]: {
    profitCut: 35,
    timeBonus: 0.5,
    maxNumberOfBusinesses: 100,
    cost: 10000
  }
};
