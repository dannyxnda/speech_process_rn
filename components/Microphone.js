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
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [text]);

  Voice.isAvailable().then(r => console.log('avalable: ' + r));
  // Voice.isRecognizing().then(r => console.log('recog: ' + r));

  // Voice.onSpeechResults()
  const touchIcon = async () => {
    if (icon === 'microphone') {
      try {
        await Voice.start('en-US');
        setIcon('pause');
        console.log('start rec');
      } catch (e) {
        console.log('start error: ' + e);
      }
    } else {
      try {
        await Voice.stop();
        setIcon('microphone');
        console.log('stop rec');
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
