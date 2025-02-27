'use client'

import React, { useState, useEffect } from 'react'
import ParaTitle from './para-title'

export default function CardDraw(props) {
  return (
    <>
    <div className="carddrawBG">
    <div className="para">
        <ParaTitle title="抽卡大冒險｜Card Draw" link="/course/carddraw" btn="去抽卡" />
    </div>
    <div className="w-full">
      <img className="w-full h-auto" src="https://fakeimg.pl/1000x200/" />
    </div>
    </div>
    </>
  )
}
