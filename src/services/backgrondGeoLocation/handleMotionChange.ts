/* eslint-disable no-console */
import BackgroundGeolocation, {
  Location,
  MotionChangeEvent,
} from 'react-native-background-geolocation';

export function handleMotionChange(onChange: (l: Location) => void) {
  return BackgroundGeolocation.onMotionChange((event: MotionChangeEvent) => {
    console.info('[onMotionChange]', event);
    onChange(event.location);
  });
}
