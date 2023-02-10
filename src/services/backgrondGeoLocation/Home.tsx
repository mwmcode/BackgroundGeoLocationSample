import React from 'react';
import {Text} from 'react-native';
import {BackgroundGeoLocationProvider} from './provider';

export function HomeScreen() {
  return (
    <BackgroundGeoLocationProvider>
      <Text>Home screen</Text>
    </BackgroundGeoLocationProvider>
  );
}
