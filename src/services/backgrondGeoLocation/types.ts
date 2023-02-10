import {Location} from 'react-native-background-geolocation';

export type StatusDesc =
  | 'Always'
  | 'WhenInUse'
  | 'Denied'
  | 'Restricted'
  | 'NotDetermined';

export type BGLocT = {
  location?: Location | null;
  enabled?: boolean;
  status?: StatusDesc;
};
