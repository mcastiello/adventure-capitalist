import { GamePage } from '../state/features/navigation/navigationTypes';
import { BusinessDetails, BusinessLevel, BusinessType } from '../state/features/businesses/businessesTypes';
import { Manager, ManagerID } from '../state/features/managers/managersTypes';

export type GameProps = {
  width: number;
  height: number;
};

export type MenuProps = {
  page: GamePage;
};

export type ProfitBarProps = {
  lastCollection: number;
  interval: number;
};

export type BusinessBadgeProps = {
  type: BusinessType;
  level: BusinessLevel;
};

export type BusinessOptionsProps = {
  onDelete: () => void;
  business: BusinessDetails;
  disabled?: boolean;
};

export type ManagerOptionsProps = {
  onDelete: () => void;
  manager: Manager;
  disabled?: boolean;
};

export type ManagedBusinessProps = {
  manager: Manager;
  disabled?: boolean;
};

export type ManagedBusinessItemProps = {
  managerId: ManagerID;
  business: BusinessDetails;
  disabled: boolean;
};
