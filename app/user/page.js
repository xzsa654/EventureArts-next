'use client'

import React, { useState, useEffect } from 'react'
import { useModal } from '@/contexts/modal-context'
import MessageDrawer from '@/components/common/message-drawer.js/message'
import SplitText from '@/components/common/message-drawer.js/splitText'
export default function UserPage() {
  const { isOpen, onOpenChange } = useModal().message
  const [getId, setID] = useState(null)
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }
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

      <SplitText
        text="Hello, Tailwind!"
        className="text-2xl font-semibold text-center"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </>
  )
}
