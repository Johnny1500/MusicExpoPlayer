import { LOADING_DATA, SET_TRACKS, LOADING_FAILED } from "../types";

export default function (state, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TRACKS:
      // console.log("action.payload :>> ", action.payload);
      return {
        ...state,
        tracks: action.payload,
        loading: false,
      };
    case LOADING_FAILED:
      return {
        ...state,
        message: action.message,
        loading: false,
      };
    default:
      return state;
  }
}
