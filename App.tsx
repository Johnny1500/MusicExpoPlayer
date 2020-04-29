import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

import Controls from "./components/Controls";

const App: () => React.ReactNode = () => (
  <View style={styles.container}>
    <View style={styles.lineStyle} />
    <Controls />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginHorizontal: vw(2),
  },
});

export default App;
