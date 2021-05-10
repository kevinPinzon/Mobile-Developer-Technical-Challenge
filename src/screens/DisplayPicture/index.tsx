import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'

export default function DisplayPicture({route, navigation }) {

    const { image } = route.params

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
        
        <Text style={{marginVertical:20}}>JSON</Text>

        <View>
            <Button style={styles.button}
                title='Save this picture from gallery'
                onPress={() => null}/>
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