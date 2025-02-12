'use client'

import React, { useState, useEffect } from 'react'
import AVatarGroup from '@/components/common/avatar-group'
import OurPagination from '@/components/common/pagination'
export default function AppPage(props) {
  return (
    <>
      <div className="mt-[160]">
        <OurPagination />
      </div>
      <div className="my-[160]">
        <AVatarGroup />
      </div>
    </>
  )
}
