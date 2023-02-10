import BackgroundGeolocation, {
  Config,
} from 'react-native-background-geolocation';
import {Platform} from 'react-native';

export const backgroundGeoLocConfig: Config = {
  debug: true,
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  startOnBoot: true,
  locationAuthorizationRequest: 'Always',
  useSignificantChangesOnly: true,
  desiredAccuracy:
    Platform.OS === 'android'
      ? 100
      : BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  // enableHeadless: true,
  stopOnTerminate: false,
  distanceFilter: 1000,
  stationaryRadius: 500,
  preventSuspend: false,
  heartbeatInterval: 2500,
  locationAuthorizationAlert: {
    titleWhenNotEnabled: 'Background location is not enabled',
    titleWhenOff: 'Background location-services usage',
    instructions: 'location needed for this and that',
    cancelButton: 'Cancel',
    settingsButton: 'Settings',
  },
  backgroundPermissionRationale: {
    title: "Allow to access this device's location in the background?",
    message:
      'location needed for this and that {backgroundPermissionOptionLabel} location permission',
    positiveAction: 'Change to {backgroundPermissionOptionLabel}',
    negativeAction: 'Cancel',
  },
  locationTimeout: 60,
  logMaxDays: 3,
  maxRecordsToPersist: 100,
  showsBackgroundLocationIndicator: false, // iOS
};
