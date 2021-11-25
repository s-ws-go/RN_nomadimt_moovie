import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NativeStacks from './Stacks';
import Tabs from './Tabs';

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={NativeStacks} />
    </Nav.Navigator>
  );
};

export default Root;
