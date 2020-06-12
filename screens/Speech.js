import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Speech = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image_slide}>
        <Image style={styles.image} source={require('../asset/planet.jpg')} />
      </View>
      <View style={styles.keyword}>
        <Text style={styles.keyword_text}>Planet</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="microphone" size={50} color="red" />
        </TouchableOpacity>
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
    flex: 8,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    margin: 10,
    height: 450,
    width: 350,
  },
  keyword: {
    flex: 1,
  },
  keyword_text: {
    fontWeight: 'bold',
    fontSize: 30,
    borderBottomWidth: 3,
  },
  button: {
    flex: 1,
  },
});

export default Speech;
