import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Loginpage from '../components/Loginpage';
import Registerpage from '../components/Registerpage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Loginpage} />
      <Stack.Screen name="Register" component={Registerpage} />
    </Stack.Navigator>
  );
};

export default AuthStack;