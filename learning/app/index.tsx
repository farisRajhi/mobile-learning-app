// // app/index.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './navigation/AppNavigator';
// import { Provider } from 'react-redux';
// // point at the CJS entry so Metro can find it
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import store, { persistor } from './store';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NavigationContainer>
//           <AppNavigator />
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// }

// app/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './store';

const Index: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default Index;
