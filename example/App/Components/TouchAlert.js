import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Text,
  ToastAndroid
} from 'react-native'

import styles from './TouchAlertStyles'
import {Colors, Images} from '../Themes/'


export default class TouchAlert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {fadeAnim: new Animated.Value(0)}
  }

  componentDidMount() {
    this._animate(this.props);
  }

  componentWillReceiveProps(newProps) {
    this._animate(newProps);
  }

  _animate(newProps){
    return Animated.timing(this.state.fadeAnim, {
      toValue: newProps.visible ? 0.85 : 0,
      duration: 400
    }).start();
  }

  render() {

    if (this.props.visible) {
      return (
        <Animated.View style={[styles.overlay,{opacity: this.state.fadeAnim}]}>
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={()=>{this.props.dismissDialog()}}
            visible={true}>
            <View style={styles.main}>
              <View style={styles.main}>
                {this.renderAlert()}
              </View>
              <TouchableOpacity style={styles.skipButtonConstainer} onPress={() => {this.props.dismissDialog()}}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Animated.View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderAlert () {
    let image = Images.fingerprint

    return (
      <View style={styles.dialog}>
        <View style={styles.infoWrapper}>
          <Image source={image} style={styles.image}/>
          <View style={styles.connectionTypeContainer}>
            <Text style={styles.connectionType}>
              Touch sensor to verify your identity
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

TouchAlert.propTypes = {
  visible: React.PropTypes.bool,
  dismissDialog: React.PropTypes.func,
}
