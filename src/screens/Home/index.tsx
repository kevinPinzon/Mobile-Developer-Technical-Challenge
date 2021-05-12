import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

export default function Home({ navigation}) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        if (status !== 'granted') {
          alert('No se han concedido permiso para accesar a la galeria del dispositivo.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      navigation.navigate('DisplayPicture', {image: result.uri})
    }
  }

  return (
    <View style={styles.container}>
      <NetworkStatusProps />
      <BatteryStatus />
      
      <View style={styles.containerBtns}>
        <View style={{marginVertical:2}}>
          <Button
            title='Take new pictures'
            onPress={() => navigation.navigate('Picture')}
          />
        </View>
      
        <View style={{marginVertical:2}}>
          <Button
            title='Load Picture from gallery'
            onPress={pickImage}
          />
        </View>
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