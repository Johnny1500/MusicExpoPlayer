import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "../types";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-media-b0cc7.cloudfunctions.net/api";

function* setTracks(action) {
  try {
    const tracks = yield call(axios.get("/tracks/"));
    yield put({ type: SET_TRACKS, tracks: tracks });
  } catch (e) {
    yield put({ type: LOADING_FAILED, message: e.message });
  }
}

function* watchLoading() {
  yield takeEvery(LOADING_DATA, setTracks);
}

export default function* rootSaga() {
  yield all([watchLoading()]);
}
