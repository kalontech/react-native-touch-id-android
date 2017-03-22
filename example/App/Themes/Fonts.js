// @flow

const type = {
  base: 'Graphik-Medium',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic',
  regular: 'Graphik-Regular',
  semibold: 'Graphik-Semibold',
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  h7: 16,
  h8: 13,
  h9: 11,
  largeName: 24,
  input: 18,
  regular: 17,
  feedName: 16,
  medium: 14,
  small: 11,
  tiny: 8.5,
  buttonText: 15,
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  footerButton: {
    fontFamily: type.base,
    fontSize: size.small,
    color: 'black'
  },
  rowStyle: {
    fontFamily: type.regular,
    fontSize: size.h7,
  },
  whiteMedium17: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: 'white',
  },
  skip: {
    fontFamily: type.semibold,
    fontSize: size.regular,
    color: 'white',
  },
  deleteAlert: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: 'black',
  }
}

export default {
  type,
  size,
  style
}
