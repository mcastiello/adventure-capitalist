import { GamePage } from './navigationTypes';

export type NavigationState = {
  page: GamePage;
};

export const defaultNavigationState: NavigationState = {
  page: GamePage.Businesses
};
