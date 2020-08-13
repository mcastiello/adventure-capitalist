import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSize } from './state/features/navigation/navigationActions';
import store from './state/store';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import Game from './views/Game';
import './index.css';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #343d41;
  position: absolute;
`;

const GameContainer: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Background>
      <AutoSizer>
        {({ width, height }) => {
          dispatch(setSize(width, height));

          return <Game />;
        }}
      </AutoSizer>
    </Background>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GameContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
