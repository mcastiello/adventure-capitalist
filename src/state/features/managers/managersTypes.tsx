import { BusinessID } from '../businesses/businessesTypes';

export enum ManagerType {
  Clerk = 'clerk',
  JuniorManager = 'junior_manager',
  SeniorManager = 'senior_manager',
  CEO = 'ceo'
}

export type ManagerDefinition = {
  profitCut: number;
  timeBonus: number;
  cost: number;
  maxNumberOfBusinesses: number;
  typeName: string;
  description: string;
};

export type ManagerID = string;

export type Manager = {
  id: ManagerID;
  type: ManagerType;
  name: string;
  managedBusinesses: BusinessID[];
  totalProfits: number;
};
