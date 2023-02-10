import BackgroundGeolocation from 'react-native-background-geolocation';
import {StatusDesc} from './types';

export const StatusCodeNameMap: Record<number, StatusDesc> = {
  [BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS]: 'Always',
  [BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE]: 'WhenInUse',
  [BackgroundGeolocation.AUTHORIZATION_STATUS_DENIED]: 'Denied',
  [BackgroundGeolocation.AUTHORIZATION_STATUS_RESTRICTED]: 'Restricted',
  [BackgroundGeolocation.AUTHORIZATION_STATUS_NOT_DETERMINED]: 'NotDetermined',
};
