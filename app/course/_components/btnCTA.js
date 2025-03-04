'use client'

import React, { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { Button } from '@heroui/react'

export default function BtnCTA({ text, onClick = () => {} }) {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Button
          onPress={onClick}
          radius="full"
          className="bg-[#000000] text-white text-[15px] h-[50px]"
        >
          <span>{text}</span>
          <BsArrowRight />
        </Button>
      </div>
    </>
  )
}
