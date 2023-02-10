/**
 * Configs that the user can change (set on/off) from Settings screen should only be set/read by helpers (or hook) below
 *
 * https://transistorsoft.github.io/react-native-background-geolocation/interfaces/config.html#geolocation-options
 *
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {Config} from 'react-native-background-geolocation';
import {backgroundGeoLocConfig} from './config';

type UserConfigT = Pick<Config, 'stopOnTerminate' | 'preventSuspend'>;

const {stopOnTerminate, preventSuspend} = backgroundGeoLocConfig;

export async function readGeoLocUserConfigSettings(): Promise<UserConfigT> {
  let userConfigs = {};
  try {
    const storedConfigs = await AsyncStorage.getItem(
      'bg_geo_loc_user_settings',
    );
    if (storedConfigs) {
      userConfigs = JSON.parse(storedConfigs);
    }
  } catch {}

  return {
    stopOnTerminate,
    preventSuspend,
    ...userConfigs,
  };
}

export async function setGeoLocationUserSettings(
  userConfig: Partial<UserConfigT>,
) {
  const currentUserConfigs = await readGeoLocUserConfigSettings();
  const newSettings = {...currentUserConfigs, ...userConfig};

  return await AsyncStorage.setItem(
    'bg_geo_loc_user_settings',
    JSON.stringify(newSettings),
  );
}

export function useGeoLocUserConfigSettings() {
  const [userConfigs, __setUserConfigs] = useState<UserConfigT>({
    stopOnTerminate,
    preventSuspend,
  });

  useEffect(() => {
    (async () => {
      __setUserConfigs(await readGeoLocUserConfigSettings());
    })();
  }, []);

  const setUserConfigs = useCallback(
    async (newConfig: Partial<UserConfigT>) => {
      await setGeoLocationUserSettings(newConfig);
      __setUserConfigs(prev => ({...prev, ...newConfig}));
    },
    [],
  );

  return {userConfigs, setUserConfigs};
}
