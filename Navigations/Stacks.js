import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details } from '../Screens/Details';
import { BLACK_COLOR, RED_COLOR } from '../styles/Color';

const Stack = createNativeStackNavigator();

export default function NativeStacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: BLACK_COLOR },
        headerTitleStyle: { color: RED_COLOR },
        contentStyle: { backgroundColor: BLACK_COLOR },
      }}
    >
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
}
