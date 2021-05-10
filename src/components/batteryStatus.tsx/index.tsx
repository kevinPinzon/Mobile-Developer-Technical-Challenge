import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface componentNameProps {}

const BatteryStatus = () => {

  return (
    <View style={styles.container}>
      <Text>Estado de bateria</Text>
    </View>
  );
};

export default BatteryStatus;

const styles = StyleSheet.create({
  container: {}
});
