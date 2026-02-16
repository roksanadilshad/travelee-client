// 'use client';

// import { Provider } from 'react-redux';
// import { makeStore } from './store';
// import { useRef } from 'react';

// export default function StoreProvider({ children }) {
//   const storeRef = useRef();
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore();
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }