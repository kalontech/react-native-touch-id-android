import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from '../Themes/'

export default StyleSheet.create({
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
  button: {
    height: Metrics.alertButtonHeight,
    alignSelf: 'stretch',
    borderRadius: Metrics.smallBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.blue
  },
  buttonText: {
    ...Fonts.style.skip,
    textAlign: 'center',
  },
})
