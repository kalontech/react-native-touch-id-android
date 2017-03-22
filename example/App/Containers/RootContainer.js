/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';

import Finger from 'react-native-touch-id-android'
import { Metrics, Colors, Fonts } from '../Themes/'
import styles from './RootContainerStyles'

import TouchAlert from '../Components/TouchAlert'

export default class RootContainer extends Component {

  constructor(){
    super()

    this.state = {
      modalVisible: false,
    }
  }

  touchAuth(){
    Finger.isSensorAvailable()
      .then((isAvailable) => {
        this.setState({modalVisible: true})
        Finger.requestTouch()
            .then(success => {
              ToastAndroid.show('Access granted', ToastAndroid.SHORT);
              this.setState({modalVisible: false})
            })
            .catch(error => {
              ToastAndroid.show(error, ToastAndroid.SHORT);
              this.setState({modalVisible: false})
            });
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>{
              this.touchAuth()
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Enable scanner</Text>
        </TouchableOpacity>
        <TouchAlert
          visible={this.state.modalVisible}
          dismissDialog={()=> this.setState({modalVisible: false}) }
          />
      </View>
    );
  }

  componentWillUnmount(){
    Finger.dismiss()
  }
}


AppRegistry.registerComponent('RootContainer', () => RootContainer);
