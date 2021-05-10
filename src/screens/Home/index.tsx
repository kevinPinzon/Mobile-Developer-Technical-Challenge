import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import BatteryStatus from '../../components/batteryStatus.tsx'
import * as Svg from 'react-native-svg';

export default function Home({ navigation}) {
  return (
    <View style={styles.container}>
      <Text> screen from another screen!!</Text>
      <BatteryStatus/>
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