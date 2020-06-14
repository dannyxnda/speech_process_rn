import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';

const Microphone = ({sendKeyword}) => {
  const [icon, setIcon] = useState('microphone');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('vi-VN');

  useEffect(() => {
    if (text) {
      sendKeyword(text);
    }
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [text]);

  useEffect(() => {
    Voice.isAvailable().then(r => console.log('avalable: ' + r));

    const onSpeechEnd = e => {
      console.log('end: ' + e);
    };
    const onSpeechError = e => {
      console.log('error: ' + e);
    };
    const onSpeechResults = e => {
      console.log('result: ' + e.value[0]);
      setText(e.value[0]);
    };

    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
  }, []);

  const touchMicro = async () => {
    if (icon === 'microphone') {
      try {
        await Voice.start(language);
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
      <View style={styles.oneFlex_}>
        <TouchableOpacity
          style={styles.half}
          onPress={() => setLanguage(language === 'vi-VN' ? 'en-US' : 'vi-VN')}>
          <Text>{language}</Text>
          <Icon name="language" size={32} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.half} onPress={touchMicro}>
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
  oneFlex_: {
    // display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  half: {
    flexBasis: '50%',
    alignItems: 'center',
    // alignContent: 'center',
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
