// import React from 'react';
// import AppNavigator from './navigation/AppNavigator';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './store';

// export default function App() {
//   // return <AppNavigator />;
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <AppNavigator />
//       </PersistGate>
//     </Provider>
//   );
// }

// App.js
// import React from 'react';
// import AppNavigator from './navigation/AppNavigator';
// import { Provider } from 'react-redux';
// // ← point at the CJS entry so Metro can resolve it:
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import store, { persistor } from './store';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <AppNavigator />
//       </PersistGate>
//     </Provider>
//   );
// }


export { default } from 'expo-router';
