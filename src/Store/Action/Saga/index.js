import { all } from 'redux-saga/effects';
import goSaga from './goAPI';

export default function* rootSaga() {
  yield all([
    ...goSaga
  ]);
}
