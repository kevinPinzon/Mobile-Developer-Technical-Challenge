import * as React from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class NetworkStatusProps extends React.Component {

  state = {
    networkState: null,
  };

  netInfo = NetInfo.addEventListener(state => {
    if (state.isConnected){
      this.setState({networkState:"Connected!"});
    }else{
      this.setState({networkState:"Disconnected!"});
    }
  })

  render() {
    return (  
      <View>
        <Text>
          Internet status conection: {this.state.networkState}
        </Text>
      </View>
    );
  }
}


