import * as React from 'react';
import * as Battery from 'expo-battery';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class BatteryStatusProps extends React.Component {

  state = {
    batteryLevel: null,
    batteryIcon: "battery"
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const batteryLevel = await Battery.getBatteryLevelAsync() * 100;
    this.setState({ batteryLevel: Math.trunc(batteryLevel)});
    
    if (batteryLevel > 60) {
      this.setState({ batteryIcon: "battery-full"});
    }else if (batteryLevel > 30) {
      this.setState({ batteryIcon: "battery-2"});
    }else{
      this.setState({ batteryIcon: "battery-1"});
    }
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={{padding:4, flexDirection: 'row'}}>
        <FontAwesome style={{ marginRight: 20}} name={this.state.batteryIcon} size={24} color='black' />
        <Text style={{ fontWeight: 'bold', marginVertical : 4}}>Battery Leveeeell: {this.state.batteryLevel}%</Text>
      </View>
    );
  }
}