import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from '../Themes/'

export default StyleSheet.create({
  overlay: {
    top: 0,
    right: 0,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    position: 'absolute',
    backgroundColor: Colors.black,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: Metrics.alertWidth,
    height: Metrics.alertWidth,
    backgroundColor: Colors.transparent,
    borderRadius: Metrics.smallBorderRadius,
  },
  infoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  skipButtonConstainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.alertSkipHeight,
  },
  skipButtonText: {
    flex: 1,
    ...Fonts.style.skip,
    textAlign: 'center',
    marginTop: Metrics.alertMargin
  },
  image: {
    height: Metrics.alertImage,
    width: Metrics.alertImage,
    borderRadius: Metrics.alertImage / 2,
    marginTop: Metrics.alertMargin * 2,
    resizeMode: 'contain'
  },
  name: {
    fontSize: Fonts.size.h4,
    fontWeight: 'normal',
    color: Colors.black,
    marginTop: Metrics.baseMargin
  },
  connectionTypeContainer: {
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
  },
  connectionType: {
    color: Colors.blue,
    fontSize: Fonts.size.medium,
    marginTop: 30
  },
  icon: {
    marginRight: Metrics.smallMargin,
    height: Metrics.feedIcon,
    width: Metrics.feedIcon,
    alignSelf: 'center'
  },
})
