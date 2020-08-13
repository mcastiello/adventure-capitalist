import 'framework7/css/framework7.bundle.min.css';
import 'framework7-icons/css/framework7-icons.css';
import Framework7 from 'framework7/framework7-lite.esm.bundle';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Framework7React, { F7App } from 'framework7-react';
import store from './state/store';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import Game from './views/Game';
import './index.css';

Framework7.use(Framework7React);

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: var(--game-background-color);
  position: absolute;
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <F7App>
        <Background>
          <AutoSizer>{(props) => <Game {...props} />}</AutoSizer>
        </Background>
      </F7App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
