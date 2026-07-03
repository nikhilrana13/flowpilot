"use client"
import { Store } from '@/redux/Store';
import React from 'react';
import { Provider } from 'react-redux';

const ReduxProvider = ({children}) => {
  return (
    <Provider store={Store}>
        {children}
    </Provider>
  );
}

export default ReduxProvider;
