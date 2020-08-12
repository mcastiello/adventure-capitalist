import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { rootReducer, rootSaga } from './features';

const storageEngine = createEngine('adventure-capitalist');

const sagaMiddleware = createSagaMiddleware();
const storageMiddleware = storage.createMiddleware(storageEngine);

const reducer = storage.reducer(rootReducer);
const store = createStore(reducer, applyMiddleware(sagaMiddleware, storageMiddleware));
sagaMiddleware.run(rootSaga);

const load = storage.createLoader(storageEngine);
load(store).then(null, (reason) => console.error(reason));

export default store;
