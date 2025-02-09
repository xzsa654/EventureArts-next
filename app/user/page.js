'use client'

import React, { useState, useEffect } from 'react'
import LoginModal from '@/components/common/login/login'
import RegisterStep1 from '@/components/common/login/register'
import RegisterStep2 from '@/components/common/login/register2'
import RegisterStep3 from '@/components/common/login/register3'
import RegisterStep4 from '@/components/common/login/register4'
import ResetPassword from '@/components/common/login/reset'
export default function UserPage(props) {
  return (
    <>
      {' '}
      <ResetPassword />
      <div className="h-screen text-primary flex items-center justify-center text-9xl bg-gradient-to-r from-green-500 yellow-500 to-red-500">
        HELLOWORLD Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quasi beatae illum voluptas, animi labore praesentium tempore doloremque
        culpa itaque sapiente alias neque incidunt temporibus suscipit voluptate
        perspiciatis assumenda nihil corrupti?
      </div>
    </>
  )
}
