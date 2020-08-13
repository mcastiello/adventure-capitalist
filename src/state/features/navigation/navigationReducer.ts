import { defaultNavigationState, NavigationState } from './navigationState';
import { NavigationActions, SET_MENU_STATE, SET_PAGE, SET_SIZE } from './navigationActions';

export default function navigationReducer(state: NavigationState = defaultNavigationState, action: NavigationActions): NavigationState {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, width: action.width, height: action.height, menuOpen: false };
    case SET_PAGE:
      return { ...state, page: action.page, menuOpen: false };
    case SET_MENU_STATE:
      return { ...state, menuOpen: action.state };
    default:
      return state;
  }
}
