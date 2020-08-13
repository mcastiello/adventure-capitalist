import { setMenuState, setPage, setSize } from './navigationActions';
import navigationReducer from './navigationReducer';
import { defaultNavigationState } from './navigationState';
import { GamePage } from './navigationTypes';

describe('Test navigationReducer', () => {
  it('should set the size of the game area', () => {
    const value = 100;
    const size = setSize(value, value);
    const state = navigationReducer(defaultNavigationState, size);

    expect(state.width).toBe(value);
    expect(state.height).toBe(value);
  });
  it('should change the current page', () => {
    const value = GamePage.Managers;
    const page = setPage(value);
    const state = navigationReducer(defaultNavigationState, page);

    expect(state.page).toBe(value);
  });
  it('should change the state of the menu', () => {
    const menu = setMenuState(true);
    const state = navigationReducer(defaultNavigationState, menu);

    expect(state.menuOpen).toBe(true);
  });
  it('should reset the menu state when the page is resized', () => {
    const value = GamePage.Managers;
    const page = setPage(value);
    const menu = setMenuState(true);
    let state = navigationReducer(defaultNavigationState, menu);
    state = navigationReducer(state, page);

    expect(state.menuOpen).toBe(false);
  });
  it('should reset the menu state when the page is changed', () => {
    const value = 100;
    const size = setSize(value, value);
    const menu = setMenuState(true);
    let state = navigationReducer(defaultNavigationState, menu);
    state = navigationReducer(state, size);

    expect(state.menuOpen).toBe(false);
  });
})