// File: index.tsx

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import CoFounders from './Screens/CoFounder'; // Import the new CoFounders screen
import Community from './Screens/Community';
import Connections from './Screens/Connections';
import ConnectionsList from './Screens/connectionsList';
import Events from './Screens/Events';
import HomeScreen from './Screens/HomeScreen';
import Investments from './Screens/Investments';
import Mentors from './Screens/Mentors';
import Opportunities from './Screens/Opportunities';
import ProfileScreen from './Screens/ProfileScreen';
import Selling from './Screens/Selling';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

export type RootStackParamList = {
   Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Onboarding: undefined;
 
  Connections: undefined;
  Mentors: undefined;
  CoFounders: undefined; // New route added
  Selling: undefined;
  Investments: undefined;
  Community: undefined;
  Opportunities: undefined;
  Events: undefined;
  ConnectionsList:undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// ***Note for Expo Router***: Since Expo Router automatically provides a NavigationContainer,
// do not wrap your navigator in a NavigationContainer here.
const Index: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
  <Stack.Screen name="SignIn" component={SignIn} />
  <Stack.Screen name="SignUp" component={SignUp} />
  <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Connections" component={Connections} />
      <Stack.Screen name="Mentors" component={Mentors} />
      <Stack.Screen name="CoFounders" component={CoFounders} />
      <Stack.Screen name="Selling" component={Selling}/>
      <Stack.Screen name="Investments" component={Investments}/>
      <Stack.Screen name="Community" component={Community}/>
      <Stack.Screen name="Opportunities" component={Opportunities}/>
      <Stack.Screen name="ConnectionsList" component={ConnectionsList} />
      <Stack.Screen name="Events" component={Events}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Index;