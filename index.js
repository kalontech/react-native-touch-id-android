import { NativeModules } from 'react-native';

const Fingerprint = NativeModules.Fingerprint;



export default {
  requestTouch() {
    return new Promise((resolve, reject) => {
      Fingerprint.requestTouch().then(result => {
        if (result.error) {
          return reject(result.error);
        }

        resolve(true);
      })
    })
  },

  dismiss: () => {
    return Fingerprint.dismiss();
  },

  isSensorAvailable() {
    return new Promise((resolve, reject) => {
      Fingerprint.isSensorAvailable().then(result => {
        if (result.error) {
          return reject(result.error);
        }

        resolve(true);
      })
    })
  }
}
