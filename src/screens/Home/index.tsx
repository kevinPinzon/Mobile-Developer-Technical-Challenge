import React from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

export default function Home({ navigation}) {

  return (
    <View style={styles.container}>
      <NetworkStatusProps />
      <BatteryStatus />
      <View style={styles.containerBtns}>
        <Button style={styles.button}
          title='Take new picture'
          onPress={() => navigation.navigate('Picture')}
        />
        <Button style={styles.button}
          title='Load Picture from galery'
          onPress={() => navigation.navigate('Picture')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 20,
    marginHorizontal: 40
  },
  containerBtns: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  button: {
    width: 250,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginHorizontal: "1%",
    marginBottom: 6,
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

  // export default HomeScreen