'use client'

import React, { useState, useEffect } from 'react'

import { ScrollShadow } from '@heroui/react'
import UserAddForm from '../add-form'
export default function ExAdd({ online }) {
  return (
    <>
      <ScrollShadow className="h-[680px]">
        <UserAddForm online={online} />
      </ScrollShadow>
    </>
  )
}
