import React from 'react';
import { NavigationContainer,  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/Home'
import PictureScreen from './src/screens/TakePicture'
import DisplayPicture from './src/screens/DisplayPicture'

import { StatusBar, AppState } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT_TOKEN = 'https://easy-soup.glitch.me/token';
const PUSH_ENDPOINT_MESSAGE = 'https://easy-soup.glitch.me/message';

const registerForPushNotifications = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  console.log('tokeeen', token)

  return fetch(PUSH_ENDPOINT_TOKEN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token.data,
      }
    }),
  })
  .then((responseJson) => {
  })
  .catch(error => {
  })
}

const sendPush = async (title: string) => {
  return fetch(PUSH_ENDPOINT_MESSAGE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "title": title,
    }),
  });
}

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {
  
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    registerForPushNotifications()
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // sendPush('Welcome back')
    }else{
      sendPush('¡See you later!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <React.Fragment>
        <NavigationContainer>
         <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Picture' component={PictureScreen}  options={{ title: 'Taken Picture' }}/>
          <Stack.Screen name='DisplayPicture' component={DisplayPicture} options={{ title: 'Display Picture' }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </React.Fragment>
    );
  }

}