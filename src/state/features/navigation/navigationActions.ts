import { GamePage } from './navigationTypes';

export const SET_SIZE = 'NAVIGATION/SET_SIZE';
export const SET_PAGE = 'NAVIGATION/SET_PAGE';
export const SET_MENU_STATE = 'NABIGATION/SET_MENU_STATE';

export interface SetSizeAction {
  type: typeof SET_SIZE;
  width: number;
  height: number;
}
export const setSize = (width: number, height: number): SetSizeAction => ({
  type: SET_SIZE,
  width,
  height
});

export interface SetPageAction {
  type: typeof SET_PAGE;
  page: GamePage;
}
export const setPage = (page: GamePage): SetPageAction => ({
  type: SET_PAGE,
  page
});

export interface SetMenuStateAction {
  type: typeof SET_MENU_STATE;
  state: boolean;
}
export const setMenuState = (state: boolean): SetMenuStateAction => ({
  type: SET_MENU_STATE,
  state
});

export type NavigationActions = SetSizeAction | SetPageAction | SetMenuStateAction;
