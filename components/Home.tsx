import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";

import Controls from "./Controls";

interface HomeProps {
  loading: boolean;
  tracks: Array<Track>;  
}

interface Track {
    id: string;
    title: string;
    author: string;
    uri: string;
    imageSource: string;
    duration: string;
  }

const Home: React.FunctionComponent<HomeProps> = ({ loading, tracks }) => {
  let markup = !loading ? <Controls tracks={tracks} loading={loading} /> : <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      {markup}
    </View>
  );
};

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

const mapStateToProps = (state:HomeProps) => ({
   loading: state.loading,
   tracks: state.tracks
});

export default connect(mapStateToProps)(Home);
