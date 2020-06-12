import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import WeatherSearch from './screens/WeatherSearch';
import ImageSearch from './screens/ImageSearch';
import VideoSearch from './screens/VideoSearch';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WeatherStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Find weather at somewhere"
        component={WeatherSearch}
      />
    </Stack.Navigator>
  );
};

const ImageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Speak to find images" component={ImageSearch} />
    </Stack.Navigator>
  );
};

const VideoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Speak to find videos" component={VideoSearch} />
    </Stack.Navigator>
  );
};

const Route = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Weather') {
            iconName = focused ? 'cloud' : 'cloud';
          } else if (route.name === 'Image') {
            iconName = focused ? 'image' : 'image';
          } else if (route.name === 'Video') {
            iconName = focused ? 'video-camera' : 'video-camera';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Weather" component={WeatherStack} />
      <Tab.Screen name="Image" component={ImageStack} />
      <Tab.Screen name="Video" component={VideoStack} />
    </Tab.Navigator>
  );
};

export default Route;
