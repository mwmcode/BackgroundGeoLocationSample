import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import BackgroundGeolocation, {
  Location,
} from 'react-native-background-geolocation';
import {handleLocationChange} from './handleLocationChange';
import {handleHeartbeat} from './handleHeartbeat';
import {BGLocT} from './types';
import {handleProviderChange} from './handleProviderChange';
import {backgroundGeoLocConfig} from './config';

const BGLocCtx = createContext<BGLocT | null>(null);

export function BackgroundGeoLocationProvider({children}: PropsWithChildren) {
  const [location, setLocation] = useState<Location>();

  useLayoutEffect(() => {
    console.log('efffect')
    // 1. subscribe to events
    const onLocation = handleLocationChange(setLocation);
    const onHeartBeatBackground = handleHeartbeat();
    const onProviderChange = handleProviderChange();

    // 2. ready the plugin
    BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
      'org_EC26x',
      'user_EC26x',
      'https://tracker.transistorsoft.com',
    ).then(transistorAuthorizationToken => {
      BackgroundGeolocation.ready({
        ...backgroundGeoLocConfig,
        transistorAuthorizationToken,
      }).then(state => {
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      });
    });

    // 3. remove subscriptions
    return () => {
      console.log('ssssssttttooopp')
      onLocation.remove();
      onHeartBeatBackground.remove();
      onProviderChange.remove();
    };
  }, []);
console.log('okokok')
  return <BGLocCtx.Provider value={{location}}>{children}</BGLocCtx.Provider>;
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
