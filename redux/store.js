import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas/sagas";
import moduleName from "./reducers/mediaReducer";

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  tracks: [],
  currentTrackId: 0,
  loading: false,
};
