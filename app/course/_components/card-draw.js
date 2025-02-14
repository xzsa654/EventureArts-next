'use client'

import React, { useState, useEffect } from 'react'
import ParaTitle from './para-title'

export default function CardDraw(props) {
  return (
    <>
    <div className="div">
    <div className="para">
        <ParaTitle title="抽卡大冒險" link="#" btn="more" />
    </div>
    <div className="w-full">
        <img src="/card-draw.png" alt="" />
    </div>
    </div>
    </>
  )
}
