/* eslint-disable no-console */
import BackgroundGeolocation, {
  Location,
  LocationError,
} from 'react-native-background-geolocation';

export function handleLocationChange(onChange: (l: Location) => void) {
  return BackgroundGeolocation.onLocation(
    (loc: Location) => {
      console.info('[onLocation]', loc.coords.latitude);
      onChange(loc);
    },
    (errCode: LocationError) => {
      if (errCode === 408) {
        console.error('[onLocation] error: LOCATION TIMEOUT', errCode);
      }
    },
  );
}
