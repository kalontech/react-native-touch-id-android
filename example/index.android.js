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
  ToastAndroid
} from 'react-native';

import Finger from 'react-native-touch-id-android'
import Toast from 'react-native-root-toast'

export default class TouchTest extends Component {



  componentDidMount() {
    Finger.isSensorAvailable()
    .then((isAvailable) => {
      ToastAndroid.show('Sensor is available and is waiting for touch', ToastAndroid.SHORT);
      this.touchAuth()
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
  }

  touchAuth(){
    Finger.requestTouch()
    .then(success => {
      ToastAndroid.show('Access granted', ToastAndroid.SHORT);
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }

  componentWillUnmount(){
    Finger.dismiss()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TouchTest', () => TouchTest);
