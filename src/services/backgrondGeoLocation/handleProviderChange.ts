/* eslint-disable no-console */
import BackgroundGeolocation, {
  LocationAuthorizationRequest,
} from 'react-native-background-geolocation';

export function handleProviderChange() {
  let locationAuthorizationRequest: LocationAuthorizationRequest = 'Any';

  return BackgroundGeolocation.onProviderChange(event => {
    console.info('[onProviderChange]', event, event.status);
    switch (event.status) {
      case BackgroundGeolocation.AUTHORIZATION_STATUS_DENIED:
        console.info('- Location authorization denied');
        break;
      case BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS:
        locationAuthorizationRequest = 'Always';
        console.info('- Location always granted');
        break;
      case BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE:
        locationAuthorizationRequest = 'WhenInUse';
        console.info('- Location WhenInUse granted');
        break;
    }

    BackgroundGeolocation.setConfig({
      locationAuthorizationRequest,
    });
  });
}
