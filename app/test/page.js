'use client'

import React, { useState, useEffect } from 'react'
import Map from '../course/_components/map-leaflet'

export default function Test(props) {
  return (
    <>
      <div>Test Page
        <Map address='台北101' />
      </div>
    </>
  )
}
