'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function StoreProvider({ children }) {
  // 1. Initialize the ref as null
  const storeRef = useRef(null);

  // 2. Perform the "Lazy Initialization" inside the component body
  // We use the '== null' check specifically as it's the pattern 
  // React 19 expects for one-time initialization.
  if (storeRef.current == null) {
    storeRef.current = makeStore();
  }

  // 3. To satisfy the compiler, we can capture the value in a 
  // stable variable before the return.
  const store = storeRef.current;

  return <Provider store={store}>{children}</Provider>;
}