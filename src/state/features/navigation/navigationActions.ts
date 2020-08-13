import { GamePage } from './navigationTypes';

export const SET_PAGE = 'NAVIGATION/SET_PAGE';

export interface SetPageAction {
  type: typeof SET_PAGE;
  page: GamePage;
}
export const setPage = (page: GamePage): SetPageAction => ({
  type: SET_PAGE,
  page
});

export type NavigationActions = SetPageAction;
