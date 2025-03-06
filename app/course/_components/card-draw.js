'use client'

import React, { useState, useEffect } from 'react'
import ParaTitle from './para-title'
import Link from 'next/link'

export default function CardDraw(props) {
  return (
    <>
    <div className="carddrawBG">
    <div className="para">
        <ParaTitle title="抽卡大冒險｜Card Draw" link="/course/carddraw" btn="去抽卡" />
    </div>
    
    <div className="w-full">
    <Link href="/course/carddraw" passHref>
      <img className="w-full h-auto" src="/Blair/carddraw banner.jpg" alt="Card Draw Banner" />
    </Link>
    </div>
    </div>
    </>
  )
}
