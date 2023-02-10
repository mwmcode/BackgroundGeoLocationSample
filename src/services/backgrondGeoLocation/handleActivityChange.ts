/* eslint-disable no-console */
import BackgroundGeolocation from 'react-native-background-geolocation';

export function handleActivityChange() {
  return BackgroundGeolocation.onActivityChange(event => {
    // TODO: remove console.log
    console.info('[onActivityChange]', event);
  });
}
