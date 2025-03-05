'use client'

import React, { useState, useEffect } from 'react'
import { useModal } from '@/contexts/modal-context'
import MessageDrawer from '@/components/common/message-drawer.js/message'
export default function UserPage() {
  const { isOpen, onOpenChange } = useModal().message
  const [getId, setID] = useState(null)
  return (
    <>
      <button
        onClick={() => {
          setID(100)
          onOpenChange()
        }}
      >
        測試案你
      </button>
      {getId && (
        <MessageDrawer id={getId} isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  )
}
