'use client'

import React, { useState, useEffect } from 'react'

import { ScrollShadow } from '@heroui/react'
import UserCoAddForm from './add-co-form'
export default function CoAdd({ online }) {
  return (
    <>
      <ScrollShadow className="h-[680px]">
        <UserCoAddForm  />
      </ScrollShadow>
    </>
  )
}
