"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'


const ToastProvider = () => {
  return (
     <ToastContainer
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "14px",
        },
      }}
      style={{ zIndex: 200000 }}
    />
  )
}

export default ToastProvider