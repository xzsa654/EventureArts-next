'use client'

import React, { useState, useEffect } from 'react'
import { Pagination } from '@heroui/react'
export default function OurPagination({ total = 15 }) {
  return (
    <>
      <Pagination
        classNames={{
          cursor:
            'bg-transparent text-black outline outline-3 outline-primary ',
        }}
        radius="none"
        total={total}
        initialPage={1}
        showControls
        variant="light"
      />
    </>
  )
}
