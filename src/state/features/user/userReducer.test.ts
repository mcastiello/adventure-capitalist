import { renameUser, updateWallet } from './userActions';
import userReducer from './userReducer';
import { defaultUserState } from './userState';

describe('Test userReducer', () => {
  it('should update the amount stored in the wallet', () => {
    const amount = 10;
    const action = updateWallet(amount);

    const state = userReducer(defaultUserState, action);

    expect(state.wallet).toBe(defaultUserState.wallet + amount);
  });

  it('should set the user name', () => {
    const newName = 'My Name';
    const action = renameUser(newName);

    const state = userReducer(defaultUserState, action);

    expect(state.name).toBe(newName);
  });
});
