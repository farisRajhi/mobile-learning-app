// app/navigation/AppNavigator.js
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import DecksScreen from '../screens/DecksScreen';

// import HomeScreen  from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Decks" component={DecksScreen} options={{ headerShown: false }}/>
        
        {/* <Stack.Screen name="Home"  component={HomeScreen}  /> */}
      </Stack.Navigator>
  );
}
