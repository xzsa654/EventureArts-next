'use client'

import React, { useState, useEffect } from 'react'
import FirebaseAuthPage from './_components/firebase-auth'
import VerifyEmailPage from './_components/verify_email'
export default function UserPage(props) {
  return (
    <>
      <div>User Page</div>
      <FirebaseAuthPage />
      <VerifyEmailPage />
    </>
  )
}
