'use client'

import React, { useState, useEffect } from 'react'
import FirebaseAuthPage from './_components/firebase-auth/page'
export default function UserPage(props) {
  return (
    <>
      <div>User Page</div>
      <FirebaseAuthPage />
    </>
  )
}
