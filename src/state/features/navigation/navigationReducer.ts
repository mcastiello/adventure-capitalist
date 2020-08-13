import { defaultNavigationState, NavigationState } from './navigationState';
import { NavigationActions, SET_PAGE } from './navigationActions';

export default function navigationReducer(state: NavigationState = defaultNavigationState, action: NavigationActions): NavigationState {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.page };
    default:
      return state;
  }
}
