import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Two')}>
      <Text>ScreenOne</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Three')}>
      <Text>ScreenTwo</Text>
    </TouchableOpacity>
  );
};
const ScreenThree = ({ navigation: { goBack, navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Tabs', { Screen: 'TV' })}>
      <Text>ScreenThree</Text>
    </TouchableOpacity>
  );
};

export default function NativeStacks() {
  return (
    <Stack.Navigator screenOptions={{ headerBackVisible: true }}>
      <Stack.Screen name="One" component={ScreenOne} options={{ title: '11' }}></Stack.Screen>
      <Stack.Screen name="Two" component={ScreenTwo}></Stack.Screen>
      <Stack.Screen name="Three" component={ScreenThree}></Stack.Screen>
    </Stack.Navigator>
  );
}
