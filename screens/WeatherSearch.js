import React, {useState, useEffect} from 'react';
import {Text, View, Image, Alert, StyleSheet} from 'react-native';
import axios from 'axios';

import {OPEN_WEATHER_API_KEY} from '../constants/OpenWeatherApi';

import Microphone from '../components/Microphone';

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('hanoi');
  const [timestamp, setTimestamp] = useState('');
  const [data, setData] = useState({});

  const apiCall = () => {
    const d = new Date();
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .then(res => {
        setLoading(false);
        setCity('');
        setData(res.data);
        setTimestamp(`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`);
      })
      .catch(e => {
        setLoading(false);
        // setCity('');
        Alert.alert(`${e}`);
      });
  };

  useEffect(() => {
    console.log(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`,
    );
    if (city) {
      setLoading(true);
      apiCall();
    }
  }, [city]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.status}>
          {loading ? (
            <Text>Fetching the weather data...</Text>
          ) : (
            <Text>Updated: {timestamp}</Text>
          )}
        </View>
        {data.weather && (
          <View>
            <View style={styles.mainWeather}>
              <Image
                style={styles.icon}
                source={{
                  uri: `http://openweathermap.org/img/w/${
                    data.weather[0].icon
                  }.png`,
                }}
              />
              <Text style={styles.mainText}>{data.weather[0].main}</Text>
            </View>

            <Text style={styles.city}>{data.name}</Text>
            <View style={styles.addition}>
              <View style={styles.additionItem}>
                <Text style={styles.description}>
                  {data.weather[0].description}
                </Text>
                <Text>
                  Temperature: {(data.main.temp - 273).toFixed(2)}&#176;
                </Text>
                <Text>Humidity: {data.main.humidity}%</Text>
                <Text>Cloud: {data.clouds.all}%</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={styles.oneFlex}>
        <Microphone sendKeyword={w => setCity(w)} />
      </View>
      {/* <View style={styles.newCity}>
        <TextInput
          style={styles.input}
          placeholder="Enter the city"
          onChangeText={text => setTempCity(text)}
          value={tempCity}
        />
        <View style={styles.button}>
          <Button onPress={() => setCity(tempCity)} title="Check" />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 16,
    alignItems: 'center',
  },
  content: {
    flex: 4,
  },
  oneFlex: {
    flex: 1,
  },
  status: {
    margin: 20,
    marginBottom: 50,
  },
  mainWeather: {
    // flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 128,
    height: 128,
  },
  mainText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'gray',
  },
  addition: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  additionItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  city: {
    fontSize: 40,
    // marginTop: 40,
    marginRight: 10,
    // marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textTransform: 'capitalize',
  },
  // newCity: {
  //   width: 200,
  //   marginTop: 20,
  //   // alignItems: 'center',
  // },
  // input: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: 'gray',
  //   marginBottom: 10,
  // },

  // button: {
  //   width: 100,
  // },
});

export default Weather;
