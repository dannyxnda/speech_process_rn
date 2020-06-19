import React, {useState, useEffect} from 'react';
import {Text, View, Image, Alert, StyleSheet} from 'react-native';
import axios from 'axios';

import {OPEN_WEATHER_API_KEY} from '../constants/apiKey';

const Weather = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const apiCall = () => {
    const d = new Date();
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          route.params.text
        }&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .then(res => {
        setLoading(false);
        setData(res.data);
        setTimestamp(`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
        Alert.alert(`${e}`);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.status}>
          {loading && <Text>Fetching the weather data...</Text>}
          {!!timestamp && <Text>Updated: {timestamp}</Text>}
          {error && (
            <View>
              <Image source={require('../asset/planet.jpg')} />
              <Text>Error :((</Text>
            </View>
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
