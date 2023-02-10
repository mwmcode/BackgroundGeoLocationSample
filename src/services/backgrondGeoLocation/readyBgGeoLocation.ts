import BackgroundGeolocation from 'react-native-background-geolocation';
import {backgroundGeoLocConfig} from './config';
import {readGeoLocUserConfigSettings} from './userSettingConfigs';

export async function readyBgGeoLocation() {
  try {
    const [transistorAuthorizationToken, userConfigSettings] =
      await Promise.all([
        BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
          'org_EC26x',
          'user_EC26x',
          'https://tracker.transistorsoft.com',
        ),
        readGeoLocUserConfigSettings(),
      ]);

    return await BackgroundGeolocation.ready({
      ...backgroundGeoLocConfig,
      ...userConfigSettings,
      transistorAuthorizationToken,
    });
  } catch (err) {
    console.error('Error readying geolocation ', err);
  }
}
