import React from 'react';
import { Button, Easing, StyleSheet, Text, View } from 'react-native';
import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

export default function Home({ navigation}) {

  return (
    <View style={styles.container}>
      <Text> Hello! from Home screen</Text>
      <BatteryStatus />
      <NetworkStatusProps />
      <Button
        title='Go to Picture screen'
        onPress={() => navigation.navigate('Picture')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  // export default HomeScreen