// app/_layout.tsx
import React from 'react';
import { Slot } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';

export default function RootLayout() {
  return (
    // Root container for all routes
    <View style={styles.container}>
      <Text>Loading...</Text> 
      
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// // app/_layout.tsx
// import React from 'react';
// import { Stack }   from 'expo-router';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import store, { persistor } from '../store';

// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Stack>
//           {/* These names map to the filenames below (index, signup, etc.) */}
//           <Stack.Screen name="login" options={{ headerShown: false }} />
//           <Stack.Screen name="index" options={{ headerShown: false }} />
//           <Stack.Screen name="signup" options={{ headerShown: false }} />
//           <Stack.Screen name="forgetpassword" options={{ headerShown: false }} />
//           <Stack.Screen name="passwordreset" options={{ headerShown: false }} />
//           <Stack.Screen name="decks" options={{ headerShown: false }} />
//         </Stack>
//       </PersistGate>
//     </Provider>
//   );
// }
