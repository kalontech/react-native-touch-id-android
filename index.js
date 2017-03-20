import { NativeModules } from 'react-native';

const Fingerprint = NativeModules.Fingerprint;



module.exports = {
  requestTouch: (callback) => {
    return Fingerprint.requestTouch(callback);
  },
  dismiss: () => {
    return Fingerprint.dismiss();
  },
  isSensorAvailable: () => {
    return Fingerprint.isSensorAvailable();
  },
}
