import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

import {OPEN_WEATHER_API_KEY} from '../constants/OpenWeatherApi';

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('hanoi');
  const [tempCity, setTempCity] = useState('');
  const [data, setData] = useState({});

  // const storeData = async weatherObj => {
  //   try {
  //     await AsyncStorage.setItem('weatherData', JSON.stringify(weatherObj));
  //     console.log(weatherObj);
  //   } catch (e) {
  //     Alert.alert('Error saving data!');
  //   }
  // };

  const apiCall = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .then(res => {
        setLoading(false);
        setTempCity('');
        setCity('');
        setData(res.data);
        // storeData(res.data);
        // AsyncStorage.setItem('fetchedTime', new Date().getTime());
      })
      .catch(e => {
        setLoading(false);
        // setTempCity('');
        // setCity('');
        Alert.alert(`${e}`);
      });
  };

  // useEffect(async () => {
  //   try {
  // const weatherDataStorage = await AsyncStorage.getItem('weatherData');
  // const fetchedTime = await AsyncStorage.getItem('fetchedtime');
  // console.log(fetchedTime);
  // const now = new Date().getTime();
  // if (weatherDataStorage && (fetchedTime + 3600 000) < now) {
  // if (weatherDataStorage) {
  //   setData(weatherDataStorage);
  // } else {
  //   apiCall();
  // }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

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
      <View style={styles.status}>
        {loading ? (
          <Text>Fetching the weather data...</Text>
        ) : (
          <Text>Current Weather</Text>
        )}
      </View>
      {data.weather && (
        <View>
          <View style={styles.mainWeather}>
            <Image
              style={styles.icon}
              source={{
                uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
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
      <View style={styles.newCity}>
        <TextInput
          style={styles.input}
          placeholder="Enter the city"
          onChangeText={text => setTempCity(text)}
          value={tempCity}
        />
        <View style={styles.button}>
          <Button onPress={() => setCity(tempCity)} title="Check" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  status: {
    margin: 10,
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
    fontSize: 30,
    color: 'gray',
  },
  addition: {
    // flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  additionItem: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  city: {
    fontSize: 25,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textTransform: 'capitalize',
  },
  newCity: {
    width: 200,
    marginTop: 20,
    // alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },

  button: {
    width: 100,
  },
});

export default Weather;
