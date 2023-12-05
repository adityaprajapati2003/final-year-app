import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Signin from '../authentication/Signin.jsx';
import Signup from '../authentication/Signup.jsx';
import { enableScreens } from 'react-native-screens';
import PasswordReset from '../authentication/PasswordReset.jsx';

enableScreens(true);

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName='signin'>
            <Stack.Screen name='signin' component={Signin}/>
            <Stack.Screen name='signup' component={Signup}/>
            <Stack.Screen name='reset' component={PasswordReset}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation