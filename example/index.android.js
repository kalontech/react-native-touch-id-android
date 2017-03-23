/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import RootContainer from './App/Containers/RootContainer'

export default class TouchTest extends Component {


  render() {
    return (
      <RootContainer/>
    );
  }
}


AppRegistry.registerComponent('TouchTest', () => TouchTest);
