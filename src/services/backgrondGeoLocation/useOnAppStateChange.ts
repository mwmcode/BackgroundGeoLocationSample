import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

export function useOnAppStateChange({onForeground}: {onForeground(): void}) {
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        onForeground();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, [onForeground]);
}
