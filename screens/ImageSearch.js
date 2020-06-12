import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

import Microphone from '../components/Microphone';

const ImageSearch = () => {
  const [text, setText] = useState(String);

  useEffect(() => {
    if (text) {
      // call api to search image
    }
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.image_slide}>
        <Image style={styles.image} source={require('../asset/planet.jpg')} />
      </View>
      <View style={styles.oneFlex}>
        <Microphone
          text={text}
          onMicPress={() => {
            console.log('button works');
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
