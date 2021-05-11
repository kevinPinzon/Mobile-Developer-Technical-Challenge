import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';

import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';


export default function DisplayPicture({route, navigation }) {

    const { image } = route.params
    const [imggaResult, SeTimggaResult] = React.useState('vacio')

    useEffect(() => {
      if(imggaResult === 'vacio')
        getImaggaData()
    }, []);
    
    function getImaggaData() {
      let apiUrl = 'https://api.imagga.com/v2/tags';
      
      let params = {
        image_base64: image
      };

      let formData = new FormData()
      formData.append("image_base64", image)
      
      const options = {
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'apiKey': 'acc_cd4e1e72aff83d9',
          'apiSecret': '08c84ab33abb36edb2568cf07139e398',
          'Authorization': 'Basic YWNjX2NkNGUxZTcyYWZmODNkOTowOGM4NGFiMzNhYmIzNmVkYjI1NjhjZjA3MTM5ZTM5OA=='
          
        },
        method: 'POST',
      }

      fetch(apiUrl, options)
      .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson)
          SeTimggaResult('success')
          console.log('getImaggaData - success',responseJson)
        })
        .catch(error => {
          SeTimggaResult('error')
          console.error('getImaggaData - error', error)
        })
    }

    async function saveImage() {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        const assest = await MediaLibrary.createAssetAsync(image)
        MediaLibrary.createAlbumAsync('Laureate images', assest)
        alert('image saved!')
      }else{
        alert('Permissions denied')
      }
    }

    return (
        <View style={styles.container}>
          {/* <NetworkStatusProps /> */}
          <BatteryStatus />

          <View
            style={{
            backgroundColor: 'transparent',
            flex: 1,
            width: '100%',
            height: '100%',
            marginTop: 20
            }}
        >
            <ImageBackground
            source={{uri: image}}
            style={{
            flex: 1
            }}
            >
            </ImageBackground>
        </View>
        
        <Text style={{marginVertical:20}}>JSON: {imggaResult}</Text>

        <View>
            <Button style={styles.button}
                title='Save this picture to gallery'
                onPress={() => saveImage()}/>
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
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    label: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 24,
    },
  });