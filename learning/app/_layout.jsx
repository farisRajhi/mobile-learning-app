// app/_layout.tsx
import React from 'react';
import { Stack }   from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from '../store';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <Text>Loading...</Text>
    </View> 
  );
}
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
