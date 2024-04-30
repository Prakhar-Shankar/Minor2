import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Loginpage from '../components/Loginpage';
import Registerpage from '../components/Registerpage';
import Onboardingpage from '../components/Onboardingpage';
import FindRide from '../components/FindRide';
import SplashScreen from '../components/Splashscreen';
import OfferRide from '../components/OfferRide';
import LandingPage from '../components/LandingPage';
import FindRequest from '../components/FindRequest';
import FilteredRides from '../components/FilteredRides';
import ChatScreen from '../components/ChatScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboardingpage} />
      <Stack.Screen name="Login" component={Loginpage} />
      <Stack.Screen name="Register" component={Registerpage} />
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Find" component={FindRide} />
      <Stack.Screen name="Offer" component={OfferRide} />
      <Stack.Screen name="FindR" component={FindRequest} />
      <Stack.Screen name="FilteredRides" component={FilteredRides} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;