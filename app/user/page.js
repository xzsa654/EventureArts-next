'use client'

import React, { useState, useEffect } from 'react'
import UserPageFrame from './_components/user-page/frame'
import GoogleAuth from './_components/google-auth'
import FacebookAuth from './_components/facebook-auth'
export default function UserPage(props) {
  return (
    <>
      <UserPageFrame />
      <GoogleAuth />
      <FacebookAuth />
    </>
  )
}
