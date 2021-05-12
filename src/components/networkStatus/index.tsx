import * as React from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Feather } from '@expo/vector-icons';

export default class NetworkStatusProps extends React.Component {

  state = {
    networkState: null,
  };

  componentDidMount() {
    const netInfo = NetInfo.addEventListener(state => {
      if (state.isConnected){
        this.setState({networkState:"Connected"});
      }else{
        this.setState({networkState:"Disconnected"});
      }
    })
  }


  render() {

    return (
      <View style={{padding:4, flexDirection: 'row'}}>
        <Feather style={{ marginRight: 26}} name="wifi" size={24} color="black" />
        <Text style={{ fontWeight: 'bold', marginVertical : 4}}>Internet status conection: {this.state.networkState}</Text>
      </View>
    );
  }
}


