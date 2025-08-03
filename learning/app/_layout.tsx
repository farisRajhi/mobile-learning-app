// app/_layout.tsx
import React from 'react';
import { Stack }   from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          {/* These names map to the filenames below (index, signup, etc.) */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="forget-password" options={{ headerShown: false }} />
          <Stack.Screen name="password-reset" options={{ headerShown: false }} />
          <Stack.Screen name="decks" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
