'use client'

import React, { useState, useEffect } from 'react'
import LoginModal from '@/components/common/login/layout'
export default function UserPage(props) {
  return (
    <>
      {' '}
      <LoginModal />
      <div className="h-screen text-primary flex items-center justify-center text-9xl bg-gradient-to-r from-green-500 yellow-500 to-red-500">
        HELLOWORLD
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi beatae illum voluptas, animi labore praesentium tempore doloremque culpa itaque sapiente alias neque incidunt temporibus suscipit voluptate perspiciatis assumenda nihil corrupti?
      </div>
    </>
  )
}
