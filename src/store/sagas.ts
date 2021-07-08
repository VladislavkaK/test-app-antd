import { all } from 'redux-saga/effects';
import { librariesSagas } from './libraries/sagas';

export default function* sagas() {
  yield all([...librariesSagas]);
}
