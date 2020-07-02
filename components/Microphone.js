import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';

const Microphone = ({navigation}) => {
  const [icon, setIcon] = useState('microphone');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('vi-VN');

  useEffect(() => {
    const onSpeechStart = e => {
      setIcon('pause');
    };
    const onSpeechEnd = e => {
      console.log('end: ' + e);
    };
    const onSpeechError = e => {
      Alert.alert('Error while listening!');
      setIcon('microphone');
    };
    const onSpeechResults = e => {
      console.log('result: ' + e.value[0]);
      setIcon('microphone');

      setText(e.value[0]);
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
  }, []);

  const touchMicro = async () => {
    if (icon === 'microphone') {
      try {
        await Voice.start(language);
        console.log('start rec');
      } catch (e) {
        console.log('start error: ' + e);
      }
    } else if (icon === 'pause') {
      try {
        await Voice.stop();
        console.log('stop rec');
        setIcon('hourglass-o');
      } catch (e) {
        console.log('stop error: ' + e);
      }
    } else {
      console.log('...processing');
    }
  };

  return (
    <View style={styles.container_}>
      <View style={styles.threeFlex}>
        {!!text ? (
          <View>
            <View style={styles.oneFlex}>
              <TouchableOpacity
                style={styles.oneFlex}
                onPress={() => {
                  navigation.navigate('WeatherSearch', {text: text});
                }}>
                <Icon name="cloud" size={50} color="blue" />
                <Text style={styles.div}>Search weather in location </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.oneFlex}>
              <TouchableOpacity
                style={styles.oneFlex}
                onPress={() => {
                  navigation.navigate('ImageSearch', {text: text});
                }}>
                <Icon name="image" size={50} color="blue" />
                <Text style={styles.div}>Search for images</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.oneFlex}>
              <TouchableOpacity
                style={styles.oneFlex}
                onPress={() => {
                  navigation.navigate('VideoSearch', {text: text});
                }}>
                <Icon name="video-camera" size={50} color="blue" />
                <Text style={styles.div}>Search for videos</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.recWarn}>Record First xD</Text>
        )}
      </View>

      <View style={styles.twoFlex}>
        <View style={styles.keyword}>
          <Text style={styles.keyword_text}>{text || '- - -'}</Text>
        </View>
      </View>

      <View style={styles.oneFlex_}>
        <View style={styles.controlPart}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() =>
              setLanguage(language === 'vi-VN' ? 'en-US' : 'vi-VN')
            }>
            <Text>{language}</Text>
            <Icon name="language" size={32} color="blue" />
          </TouchableOpacity>
        </View>

        <View style={styles.controlPart}>
          <TouchableOpacity onPress={touchMicro}>
            <Icon name={icon} size={50} color="red" />
          </TouchableOpacity>
        </View>

        <View style={styles.controlPart}>
          <TouchableOpacity
            onPress={() => {
              setText('');
              Voice.destroy().then(Voice.removeAllListeners);
              setIcon('microphone');
            }}>
            <Icon name="rotate-left" size={50} color="#1E1E1E" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_: {
    flex: 1,
  },
  threeFlex: {
    flex: 3,
    alignItems: 'center',
  },
  twoFlex: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  oneFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneFlex_: {
    borderTopWidth: 1,
    borderTopColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  controlPart: {
    flexBasis: '33%',
    alignItems: 'center',
  },
  keyword: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  keyword_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#515A6B',
    color: '#515A6B',
  },
  divider: {
    width: 50,
    height: 1,
    backgroundColor: 'blue',
  },
  recWarn: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
    color: '#E68585',
  },
});

export default Microphone;
