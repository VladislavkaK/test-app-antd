import { takeLatest, put, call, fork, CallEffect, PutEffect } from 'redux-saga/effects';
import { GET_LIBRARIES_REQUESTED, GET_LIBRARIES_SUCCEEDED, GET_LIBRARIES_FAILED } from './constants';
import { getLibrariesService } from './services';
import { Library } from './types';

export function* workerGetLibraries(): Generator<CallEffect<any> | PutEffect<{
  type: string;
  payload: {
    libraries: Library[] | any;
  };
}> | PutEffect<{
  type: string;
  payload: {
    error: any;
  };
}>, void, Library[]> {
  try {
    const response = yield call(getLibrariesService);

    yield put({
      type: GET_LIBRARIES_SUCCEEDED,
      payload: {
        libraries: response,
      },
    });
  } catch (error) {
    yield put({ type: GET_LIBRARIES_FAILED, payload: { error } });
  }
}

export function* watcherGetLibraries() {
  yield takeLatest(GET_LIBRARIES_REQUESTED, workerGetLibraries);
}

export const librariesSagas = [fork(watcherGetLibraries)];
