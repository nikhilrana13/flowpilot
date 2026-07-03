"use client"
import { Persistor } from '@/redux/Store'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'


const PersistProvider = ({children}) => {
  return (
    <PersistGate loading={null} persistor={Persistor}>
        {children}
    </PersistGate>
  )
}

export default PersistProvider