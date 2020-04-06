import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const playList: object[] = [
    {
      title: 'Clarinet Concerto in A major, K. 622 - I. Allegro',
      author: 'Wolfgang Amadeus Mozart',
      source: 'musopen.org',
      uri:
        '../assets/sounds/Clarinet Concerto in A major, K. 622 - I. Allegro.mp3',
      imageSource: '../assets/images/Mozart_cover.jpg',
    },
    {
      title: 'Le Nozze di Figaro - No. 11 Cavatina',
      author: 'Wolfgang Amadeus Mozart',
      source: 'musopen.org',
      uri: '../assets/sounds/Le Nozze di Figaro - No. 11 Cavatina.mp3',
      imageSource: '../assets/images/Mozart_cover2.jpg',
    },
    {
      title: 'Mozart - Serenade No. 5, K. 204 in D major - IV. Menuetto',
      author: 'Wolfgang Amadeus Mozart',
      source: 'musopen.org',
      uri:
        '../assets/sounds/Mozart - Serenade No. 5, K. 204 in D major - IV. Menuetto.mp3',
      imageSource: '../assets/images/Mozart_cover.jpg',
    },
  ];

  interface Props {}

  interface State {
    isPlaying: boolean;
    playbackInstance: object | null;
    currentIndex: number;
    volume: number;
    isBuffering: boolean;
  }
  
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
  
        // this.loadAudio();
      } catch (e) {
        console.log(e);
      }
    }
  
    render() {
      const { isPlaying } = this.state;
  
      return (
        <View style={styles.container}>
          <Image
            style={styles.albumCover}
            source={require('../assets/images/Mozart_cover.jpg')}
          />
  
          <TouchableOpacity onPress={() => alert('')}>
            <MaterialIcons name="skip-previous" size={38} color="#7470ff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('')}>
            {isPlaying ? (
              <MaterialIcons name="pause-circle-filled" size={38} color="#7470ff" />
            ) : (
              <MaterialIcons name="play-circle-filled" size={38} color="#7470ff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('')}>
            <MaterialIcons name="skip-next" size={38} color="#7470ff" />
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      margin: 10,
      alignItems: 'center',
    },
    albumCover: {
      width: 50,
      height: 50,
    },
  });
  
  export default Controls;
  