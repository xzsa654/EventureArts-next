'use client'

import React, { useState, useEffect } from 'react'

import { ScrollShadow } from '@heroui/react'
import UserAddForm from './add-form'
export default function ExAdd(props) {
  return (
    <>
      <ScrollShadow className="h-[680px]">
        <UserAddForm />
      </ScrollShadow>
    </>
  )
}
