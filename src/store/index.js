// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'store/reducer';
import rootSaga from 'store/saga';
import logger from 'redux-logger';
import config from 'config';

const sagaMiddleware = createSagaMiddleware();

console.log("config.env", config.env);

// Decide middleware based on environment
const middleware = config.env === 'UAT' ? [sagaMiddleware] : [logger, sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,

  // ✅ Disable serializable check to allow non-serializable values like React icons
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware)
});

// Run root saga
sagaMiddleware.run(rootSaga);

export default store;