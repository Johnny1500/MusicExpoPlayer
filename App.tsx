import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

import { createStore, applyMiddleware } from "redux";
// @ts-ignore
import { Provider } from "react-redux";
// @ts-ignore
import mediaReducer from "./redux/reducers/mediaReducer";
// @ts-ignore
import createSagaMiddleware from "redux-saga";
// @ts-ignore
import rootSaga from "./redux/sagas/sagas";

import Home from "./components/Home";

const initialState = {
  tracks: [],
  currentTrackId: 0,
  loading: false,
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  mediaReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const action = (type: string) => store.dispatch({ type });

const App: () => React.ReactNode = () => {
  React.useEffect(() => {
    action("LOADING_DATA");
  }, []);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },

//   lineStyle: {
//     borderWidth: 1,
//     borderColor: "#2f712f",
//     marginHorizontal: vw(2),
//   },
// });

export default App;
