import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from '../Screens/Movies';
import TvScreen from '../Screens/Tv';
import SearchScreen from '../Screens/Search';

import { useColorScheme } from 'react-native';
import { BLACK_COLOR, BLUE_COLOR, GRAY_COLOR, RED_COLOR } from '../styles/Color';
//preload 했던 ionicon 가져와서 사용
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: isDark ? BLACK_COLOR : GRAY_COLOR }}
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : GRAY_COLOR },
        tabBarActiveTintColor: isDark ? RED_COLOR : BLUE_COLOR,
        tabBarLabelStyle: { marginTop: -5, fontSize: 10 },
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : GRAY_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? RED_COLOR : BLUE_COLOR,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="film-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TvScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="tv-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
