'use client'

import React, { useState, useEffect } from 'react'
import { Alert } from '@heroui/react'
export default function MessageHeader(props) {
  return (
    <>
      <div className="h-[50px] ">
        <Alert title="名字" description="品牌名" color="primary" />
      </div>
    </>
  )
}
