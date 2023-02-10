import BackgroundGeolocation from 'react-native-background-geolocation';

//when app is suspended, this event is fired after specified heartbeatInterval
export function handleHeartbeat() {
  return BackgroundGeolocation.onHeartbeat(event => {
    console.info('[onHeartbeat] ', event);
  });
}
