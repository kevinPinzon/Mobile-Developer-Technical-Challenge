import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/Home'
import PictureScreen from './src/screens/TakePicture'
import DisplayPicture from './src/screens/DisplayPicture'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Picture' component={PictureScreen}  options={{ title: 'Taken Picture' }}/>
        <Stack.Screen name='DisplayPicture' component={DisplayPicture} options={{ title: 'Display Picture' }}/>
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
