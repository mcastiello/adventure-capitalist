import { GamePage } from './navigationTypes';

export type NavigationState = {
  width: number;
  height: number;
  page: GamePage;
  menuOpen: boolean;
};

export const defaultNavigationState: NavigationState = {
  width: 0,
  height: 0,
  page: GamePage.Businesses,
  menuOpen: false
};
