'use client';

import * as React from 'react';
import { View } from 'react-native';

// We import the contexts to ensure we are using the same ones as the library
import {
  SafeAreaFrameContext,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

/**
 * A web-safe version of SafeAreaProvider that avoids native-only props
 * which cause issues with React 19 and react-native-css-interop.
 */
export function SafeAreaProvider({ children }: { children: React.ReactNode }) {
  const [frame, setFrame] = React.useState(initialMetrics.frame);
  const [insets, setInsets] = React.useState(initialMetrics.insets);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateMetrics = () => {
        setFrame({
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        });
        // On web, insets are usually 0 unless using some specific mobile browsers
        // that support safe-area-inset env variables.
      };

      updateMetrics();
      window.addEventListener('resize', updateMetrics);
      return () => window.removeEventListener('resize', updateMetrics);
    }
  }, []);

  return (
    <SafeAreaFrameContext.Provider value={frame}>
      <SafeAreaInsetsContext.Provider value={insets}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaInsetsContext.Provider>
    </SafeAreaFrameContext.Provider>
  );
}
