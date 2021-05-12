import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';


export default function DisplayPicture({route, navigation }) {

    const { image } = route.params
    const [imggaResult, SeTimggaResult] = React.useState("loading...")

    useEffect(() => {
      if(imggaResult === "loading...")
        getImaggaData()
      // postImaggaData()

    }, []);
    
    function postImaggaData() {
      let apiUrl = 'https://api.imagga.com/v2/tags';
    
      let formdata = new FormData()
      formdata.append("image_base64", image)

      const options = {
        body: JSON.stringify({
          "image_base64": {
            value: image,
          }
        }),
        // body: formdata,
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
        SeTimggaResult(JSON.stringify(responseJson))
      })
      .catch(error => {
        SeTimggaResult('error')
      })
    }
    
    function getImaggaData() {
      let apiUrl = 'https://api.imagga.com/v2/tags?image_url=https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';
      
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'apiKey': 'acc_cd4e1e72aff83d9',
          'apiSecret': '08c84ab33abb36edb2568cf07139e398',
          'Authorization': 'Basic YWNjX2NkNGUxZTcyYWZmODNkOTowOGM4NGFiMzNhYmIzNmVkYjI1NjhjZjA3MTM5ZTM5OA=='
        },
        method: 'GET',
      }
      fetch(apiUrl, options)
      .then((response) => response.json())
      .then((responseJson) => {
        SeTimggaResult(JSON.stringify(responseJson))
      })
      .catch(error => {
        SeTimggaResult('error')
      })
    }

    async function saveImage() {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        const assest = await MediaLibrary.createAssetAsync(image)
        MediaLibrary.createAlbumAsync('Laureate images', assest)
        alert('Image saved successfully')
      }else{
        console.log('Permissions denied')
      }
    }

    return (
        <View style={styles.container}>
          <NetworkStatusProps />
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
        
        <View style={styles.scrollView}>
        <ScrollView>
          <Text style={styles.text && {marginVertical:20}}>{imggaResult}</Text>
        </ScrollView>
        </View>
        
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
    scrollView: {
      maxHeight:'40%',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });