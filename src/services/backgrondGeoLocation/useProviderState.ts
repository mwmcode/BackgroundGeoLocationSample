import {useCallback, useEffect, useState} from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {useOnAppStateChange} from './useOnAppStateChange';
import {StatusCodeNameMap} from './consts';
import {StatusDesc} from './types';

export function useLocationProviderState() {
  const [status, setStatus] = useState<StatusDesc | undefined>();

  const checkStatus = useCallback(() => {
    BackgroundGeolocation.getProviderState().then(result => {
      setStatus(result.status ? StatusCodeNameMap?.[result.status] : undefined);
    });
  }, []);

  useEffect(checkStatus, [checkStatus]);

  useOnAppStateChange({
    onForeground: () => {
      checkStatus();
    },
  });

  return {status};
}
