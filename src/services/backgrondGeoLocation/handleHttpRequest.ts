/* eslint-disable no-console */
import BackgroundGeolocation, {
  HttpEvent,
} from 'react-native-background-geolocation';

export function handleHttpRequest() {
  return BackgroundGeolocation.onHttp((response: HttpEvent) => {
    // TODO: remove console.log
    console.info('[onHttp] ', response);
    //, response.responseText);
    //setSecurityClearance(response.responseText)
  });
}
