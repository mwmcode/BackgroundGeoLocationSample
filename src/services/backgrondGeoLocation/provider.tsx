import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import BackgroundGeolocation, {
  Location,
} from 'react-native-background-geolocation';
import {handleLocationChange} from './handleLocationChange';
import {handleHeartbeat} from './handleHeartbeat';
import {BGLocT} from './types';
import {handleProviderChange} from './handleProviderChange';
import {readGeoLocUserConfigSettings} from './userSettingConfigs';
import {backgroundGeoLocConfig} from './config';

const BGLocCtx = createContext<BGLocT | null>(null);

export function BackgroundGeoLocationProvider({children}: PropsWithChildren) {
  const [enabled, setEnabled] = useState<boolean | undefined>(undefined);
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    // 1. subscribe to events
    const onLocation = handleLocationChange(setLocation);
    const onHeartBeatBackground = handleHeartbeat();
    const onProviderChange = handleProviderChange();

    // 2. ready the plugin
    Promise.all([
      BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
        'org_EC26x',
        'user_EC26x',
        'https://tracker.transistorsoft.com',
      ),
      readGeoLocUserConfigSettings(),
    ]).then(([transistorAuthorizationToken]) => {
      BackgroundGeolocation.ready({
        ...backgroundGeoLocConfig,
        transistorAuthorizationToken,
      }).then(state => {
        console.log('state.enabled: ', state?.enabled);
        setEnabled(state?.enabled);
      });
    });

    // 3. remove subscriptions
    return () => {
      onLocation.remove();
      onHeartBeatBackground.remove();
      onProviderChange.remove();
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation(undefined);
    }
  }, [enabled]);

  return (
    <BGLocCtx.Provider value={{location, enabled}}>
      {children}
    </BGLocCtx.Provider>
  );
}

export function useBackgroundGeoLocation() {
  const ctx = useContext(BGLocCtx);
  if (!ctx) {
    throw new Error(
      'cannot use useBackgroundGeoLocation outside <BackgroundGeoLocationProvider />',
    );
  }
  return ctx;
}
