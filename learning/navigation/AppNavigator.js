// app/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import DecksScreen from '../screens/DecksScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Decks"
        component={DecksScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
