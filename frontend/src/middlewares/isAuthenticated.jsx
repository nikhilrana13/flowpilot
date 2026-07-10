"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const IsAuthenticated = ({children}) => {
  const router = useRouter();
  const user = useSelector((state) => state.Auth.user);
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);
  if (!user) return null; // loader

  return children;
}

export default IsAuthenticated;
