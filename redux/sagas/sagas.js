import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "../types";
import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-media-b0cc7.cloudfunctions.net/api";

function* setTracks() {
  try {
    let res = yield axios.get("/tracks");
    // console.log('tracks :>> ', tracks.data);
    // const tracks = yield call(axios.get("/tracks/"), {});
    // console.log('res.data :>> ', res.data);
    yield put({ type: SET_TRACKS, payload: res.data });
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
