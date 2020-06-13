import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Voice from '@react-native-community/voice';

import Microphone from '../components/Microphone';

const ImageSearch = () => {
  const [text, setText] = useState(String);
  const [result, setResult] = useState();

  useEffect(() => {
    if (text) {
      // call api to search image
    }
  }, [text]);

  useEffect(() => {
    const onSpeechResults = e => {
      setResult(e.value);
    };
    Voice.onSpeechResults = onSpeechResults;
  }, []);

  const speechRec = async currentIcon => {
    if (currentIcon === 'microphone') {
      // start
      try {
        await Voice.start('en-US');
      } catch (e) {
        console.log('start error: ' + e);
      }
    } else {
      // stop
      try {
        await Voice.stop();
      } catch (e) {
        console.log('stop error: ' + e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image_slide}>
        <Image style={styles.image} source={require('../asset/planet.jpg')} />
      </View>
      <View style={styles.oneFlex}>
        <Microphone
          text={text}
          onMicPress={currentIcon => {
            speechRec(currentIcon);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_slide: {
    flex: 4,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  oneFlex: {
    flex: 1,
  },
  image: {
    margin: 10,
    height: 450,
    width: 350,
  },
});

export default ImageSearch;
