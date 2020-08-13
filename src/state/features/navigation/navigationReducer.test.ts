import { setPage } from './navigationActions';
import navigationReducer from './navigationReducer';
import { defaultNavigationState } from './navigationState';
import { GamePage } from './navigationTypes';

describe('Test navigationReducer', () => {
  it('should change the current page', () => {
    const value = GamePage.Managers;
    const page = setPage(value);
    const state = navigationReducer(defaultNavigationState, page);

    expect(state.page).toBe(value);
  });
});
