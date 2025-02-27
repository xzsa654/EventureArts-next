'use client'

import React, { useState, useEffect } from 'react'
import UserPageFrame from './_components/user-page/frame'
import GoogleAuth from './_components/google-auth'
import FacebookAuth from './_components/facebook-auth'
import JoinUsModal from './_components/user-page/b_player/join-us-modal'
export default function UserPage(props) {
  return (
    <>
      <UserPageFrame />
      <GoogleAuth />
      <FacebookAuth />
      <JoinUsModal />
    </>
  )
}
