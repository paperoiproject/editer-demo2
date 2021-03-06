import { call, put, takeEvery } from 'redux-saga/effects';
import { ScenarioListAPI, ScenesListAPI, ScenarioMakeAPI, ScenarioUpdateAPI, ScenarioDeleteAPI} from '../API/goÅPI';

import {ScenarioLoadAction, ScenarioLoadedAction, ScenesLoadAction, ScenesLoadedAction} from "../Actions/goAPI";

function* ScenarioLoadDataSaga(action) {
    const scenario_list = yield call(ScenarioListAPI);
    yield put(ScenarioLoadedAction(scenario_list.result));
}

function* ScenesLoadDataSaga(action) {
  const scenes_list = yield call(ScenesListAPI);
  yield put(ScenesLoadedAction(scenes_list.result));
}

function* ScenarioMakeSaga(action) {
  const res = yield call(ScenarioMakeAPI, action.formData);
  console.log(res)
  yield put(ScenarioLoadAction(res));
  yield put(ScenesLoadAction(res));
}

function* ScenarioUpdateSaga(action) {
  const res = yield call(ScenarioUpdateAPI, action.formData);
  yield put(ScenarioLoadAction(res));
  yield put(ScenesLoadAction(res));
}


function* ScenarioDeleteSaga(action) {
  const res = yield call(ScenarioDeleteAPI, action.formData);
  yield put(ScenarioLoadAction(res));
  yield put(ScenesLoadAction(res));
}

const goSaga = [
  takeEvery('SCENARIOLOAD', ScenarioLoadDataSaga),
  takeEvery('SCENESLOAD', ScenesLoadDataSaga),
  takeEvery('SCENARIOMAKE', ScenarioMakeSaga),
  takeEvery('SCENARIOUPDATE', ScenarioUpdateSaga),
  takeEvery('SCENARIODELETE', ScenarioDeleteSaga),
];

export default goSaga;