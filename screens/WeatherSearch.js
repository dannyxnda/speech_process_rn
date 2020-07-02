import React, {useState, useEffect} from 'react';
import {Text, View, Image, Alert, StyleSheet} from 'react-native';

import {OPEN_WEATHER_API_KEY} from '../constants/apiKey';

const WeatherSearch = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState('');
  const [data, setData] = useState({});

  const getWeather = () => {
    const d = new Date();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        route.params.text
      }&appid=${OPEN_WEATHER_API_KEY}`,
    )
      .then(response => response.json())
      .then(resJson => {
        console.log(resJson);
        setLoading(false);
        setData(resJson);
        setTimestamp(`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert(`${e}`);
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <Text>Fetching the weather data...</Text>
        ) : (
          <View>
            {data.weather && !loading ? (
              <View>
                {!!timestamp && <Text>Updated: {timestamp}</Text>}

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
            ) : (
              <View>
                <Image source={require('../asset/planet.jpg')} />
                <Text>Error :((</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
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
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textTransform: 'capitalize',
  },
});

export default WeatherSearch;
