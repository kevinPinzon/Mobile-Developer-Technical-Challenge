import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';
import BatteryStatus from '../../components/batteryStatus'
import NetworkStatusProps from '../../components/networkStatus'
import {Camera} from 'expo-camera'

let camera: Camera

export default function Picture({ navigation}) {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.front)

  const _startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()

    if (status === 'granted') {
      setStartCamera(true)
    } else {
      console.log("Access denied")
    }
  }
  _startCamera.call()

  const _switchCamera = async () => {
    if (cameraType == Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
    } else {
      setCameraType(Camera.Constants.Type.front)
    }
  }

  const _takePicture = async () => {
    if (!camera) return
    
    const photo = await camera.takePictureAsync()
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const CameraPreview = ({photo}: any) => {

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        
        <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
        >
        </ImageBackground>
      </View>
    )
  }
  
  const _retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    _startCamera()
  }

  return (
    <View style={styles.container}>
      {/* <NetworkStatusProps /> */}
      <BatteryStatus /> 
      
      <Button style={styles.button} title='Clear' disabled={!previewVisible} onPress={_retakePicture} />
      <View style={styles.boxContainer}>
      {startCamera ? (
        previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} savePhoto={null} />
        ) : (
          <Camera
            type={cameraType}
            style={{flex: 1,width:"100%"}}
            ratio={'1:1'}
            ref={(r) => {
              camera = r
            }}
          ></Camera>
        )
      ) : (
        
        <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
        <TouchableOpacity
        onPress={_startCamera}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Start camara
          </Text>
        </TouchableOpacity>
      </View>
      )}
      
    </View>
  
    <View>
      <Button style={styles.button} title='Flip Camera' disabled={!startCamera || previewVisible} onPress={_switchCamera} />
      <Button style={styles.button} title='Take picture' disabled={!startCamera || previewVisible} onPress={_takePicture} />
      <Button style={styles.button} title='Next' disabled = {!previewVisible} 
        onPress={() => navigation.navigate('DisplayPicture', {image: capturedImage.uri})}
      />
    </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    margin:10,
    justifyContent: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 40
  },
  disable: {
    backgroundColor: '#14274e',
    fontSize: 240,
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});
