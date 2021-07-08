import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { libraryReducer } from './libraries/reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }),
  sagaMiddleware,
];

const rootReducer = combineReducers({
  library: libraryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
