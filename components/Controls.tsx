import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

// Redux stuff
import { connect } from "react-redux";

interface Track {
  title: string;
  author: string;
  source: string;
  uri: string;
  imageSource: string;
  requireSource: any;
}

interface Props {}

interface State {
  isPlaying: boolean;
  playbackInstance: Audio.Sound | null;
  currentIndex: number;
  volume: number;
  isBuffering: boolean;
}

const playList: Track[] = [
  {
    title: "Clarinet Concerto in A major, K. 622 - I. Allegro",
    author: "Wolfgang Amadeus Mozart",
    source: "musopen.org",
    uri: "../assets/sounds/1.mp3",
    imageSource: "../assets/images/Mozart_cover.jpg",
    requireSource: require("../assets/sounds/1.mp3"),
  },
  {
    title: "Le Nozze di Figaro - No. 11 Cavatina",
    author: "Wolfgang Amadeus Mozart",
    source: "musopen.org",
    uri: "../assets/sounds/2.mp3",
    imageSource: "../assets/images/Mozart_cover2.jpg",
    requireSource: require("../assets/sounds/2.mp3"),
  },
  {
    title: "Mozart - Serenade No. 5, K. 204 in D major - IV. Menuetto",
    author: "Wolfgang Amadeus Mozart",
    source: "musopen.org",
    uri: "../assets/sounds/3.mp3",
    imageSource: "../assets/images/Mozart_cover.jpg",
    requireSource: require("../assets/sounds/3.mp3"),
  },
];

export class Controls extends React.Component<Props, State> {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
  };

  async componentDidMount(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio(): Promise<void> {
    const { currentIndex, isPlaying, isBuffering, volume } = this.state;

    try {
      const playbackInstance: Audio.Sound = new Audio.Sound();

      const status: object = {
        shouldPlay: isPlaying,
        volume: volume,
      };

      const source = {
        uri:
          "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/a_day_with_great_poets_01_byron_128kb.mp3",
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({
        playbackInstance,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status: AVPlaybackStatus): void => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  handlePlayPause = async (): Promise<void> => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  handlePreviousTrack = async (): Promise<void> => {
    let { currentIndex, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex > 0
        ? (currentIndex -= 1)
        : (currentIndex = playList.length - 1);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  handleNextTrack = async (): Promise<void> => {
    let { currentIndex, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < playList.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  render() {
    const { isPlaying } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={{
            uri:
              "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg",
          }}
        />

        <TouchableOpacity onPress={() => alert("")}>
          <MaterialIcons
            name="skip-previous"
            size={38}
            style={styles.materialPicture}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePlayPause}>
          {isPlaying ? (
            <MaterialIcons
              name="pause-circle-filled"
              size={38}
              style={styles.materialPicture}
            />
          ) : (
            <MaterialIcons
              name="play-circle-filled"
              size={38}
              style={styles.materialPicture}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("")}>
          <MaterialIcons
            name="skip-next"
            size={38}
            style={styles.materialPicture}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  materialPicture: {
    color: "#2f712f",
  },
  container: {
    flexDirection: "row",
    height: 60,
    margin: 10,
    alignItems: "center",
  },
  albumCover: {
    width: 50,
    height: 50,
  },
});

export default Controls;
