'use client'

import React, { useState, useEffect } from 'react'
import FirebaseAuthPage from './_components/firebase-auth'
import VerifyEmailPage from './_components/verify_email'
import { Button } from '@heroui/react'
export default function UserPage(props) {
  return (
    <>
      <Button color="">CLick me</Button>
      <div>User Page</div>
      <FirebaseAuthPage />
      <VerifyEmailPage />
    </>
  )
}
