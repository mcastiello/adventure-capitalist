import { defaultUserState, UserState } from './userState';
import { UPDATE_WALLET, UserActions } from './userActions';

export default function userReducer(state: UserState = defaultUserState, action: UserActions): UserState {
  switch (action.type) {
    case UPDATE_WALLET:
      return { ...state, wallet: state.wallet + action.amount };
    default:
      return state;
  }
}
