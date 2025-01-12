'use client'

import React, { useState, useEffect } from 'react'
import { FIREBASE_LOGIN } from '@/lib/user-api'
export default function FirebaseApiPage({ token = '' }) {
  useEffect(() => {
    if (token) {
      fetchData(token)
    }
  }, [token])
  const fetchData = async (token) => {
    try {
      const res = await fetch(FIREBASE_LOGIN, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>FirebaseLogin Page</div>
    </>
  )
}
