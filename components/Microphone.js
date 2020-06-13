import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Microphone = ({text, onMicPress}) => {
  const [icon, setIcon] = React.useState('microphone');

  const touchIcon = () => {
    onMicPress(icon);
    setIcon(icon === 'microphone' ? 'pause' : 'microphone');
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
    // justifyContent: 'center',
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
