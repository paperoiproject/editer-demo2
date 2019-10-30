import Reducer from './Reducer/Reducer.js';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';


import rootSaga from './Action/Saga';

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
  Reducer,
  applyMiddleware(
    sagaMiddleware
  )
);

sagaMiddleware.run(rootSaga);

export default Store;