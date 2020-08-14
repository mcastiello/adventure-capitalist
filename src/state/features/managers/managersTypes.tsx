import { BusinessID } from '../businesses/businessesTypes';
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGraduate, faUserTie, faUserNinja } from '@fortawesome/free-solid-svg-icons';

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
  [ManagerType.CEO]: {
    profitCut: 25,
    timeBonus: 0.75,
    maxNumberOfBusinesses: 25,
    cost: 2000
  }
};

export const ManagerIcons: Record<ManagerType, ReactNode> = {
  [ManagerType.Clerk]: <FontAwesomeIcon icon={faUserNinja} />,
  [ManagerType.JuniorManager]: <FontAwesomeIcon icon={faUserGraduate} />,
  [ManagerType.SeniorManager]: <FontAwesomeIcon icon={faUser} />,
  [ManagerType.CEO]: <FontAwesomeIcon icon={faUserTie} />
};
