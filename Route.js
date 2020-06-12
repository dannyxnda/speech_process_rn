import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Weather from './screens/Weather';
import Speech from './screens/Speech';
import GameList from './screens/GameList';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WeatherStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={Weather} />
    </Stack.Navigator>
  );
};

const SpeechStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Speech to find images" component={Speech} />
    </Stack.Navigator>
  );
};

const Route = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Categories') {
            iconName = focused ? 'book' : 'book';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'cloud' : 'cloud';
          } else if (route.name === 'Game') {
            iconName = focused ? 'gamepad' : 'gamepad';
          } else if (route.name === 'Speech') {
            iconName = focused ? 'search' : 'search';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Weather" component={WeatherStack} />
      <Tab.Screen name="Speech" component={SpeechStack} />
      <Tab.Screen name="Game" component={GameList} />
    </Tab.Navigator>
  );
};

export default Route;
