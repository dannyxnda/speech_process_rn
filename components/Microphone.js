import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';

const Microphone = ({sendKeyword}) => {
  const [icon, setIcon] = useState('microphone');
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      sendKeyword(text);
    }
  }, [text]);

  useEffect(() => {
    const onSpeechResults = e => {
      // setResult(e.value);
      console.log(e.value);
    };
    Voice.onSpeechResults = onSpeechResults;
  }, []);

  const switchIcon = setIcon(icon === 'microphone' ? 'pause' : 'microphone');

  const touchIcon = async () => {
    // onMicPress(icon);
    if (icon === 'microphone') {
      try {
        await Voice.start('en-US');
        switchIcon();
      } catch (e) {
        console.log('start error: ' + e);
      }
    } else {
      try {
        await Voice.stop();
        switchIcon();
      } catch (e) {
        console.log('stop error: ' + e);
      }
    }
  };

  return (
    <View style={styles.container_}>
      <View style={styles.oneFlex}>
        <View style={styles.keyword}>
          <Text style={styles.keyword_text}>{text || '- - -'}</Text>
        </View>
      </View>
      <View style={styles.oneFlex}>
        <TouchableOpacity onPress={touchIcon}>
          <Icon name={icon} size={50} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_: {
    flex: 1,
    alignItems: 'center',
  },
  oneFlex: {
    flex: 1,
  },
  keyword: {
    flex: 1,
  },
  keyword_text: {
    fontWeight: 'bold',
    fontSize: 30,
    borderBottomWidth: 3,
  },
});

export default Microphone;
