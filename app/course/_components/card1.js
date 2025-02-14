'use client'

import React, { useState, useEffect } from 'react'
import {Chip} from "@heroui/react";

export default function Card1(props) {
  return (
    <>
      <div className="card1 w-96">
        <img className="w-full aspect-[2/1]" src="https://static.pressplay.cc/static/uploads/project/C5C18CCEFA4438D49F1ACAF8DBD0200D/project_image/20220720/D170DA0561B3DA3CBCDACF92CE45221C/62d7e19752676D170DA0561B3DA3CBCDACF92CE45221C20220720190559.png" alt="productImg" />
        <div className="chips flex gap-3 px-4 py-6">
          <Chip variant="bordered" className='border-black text-black'>大安區</Chip>
          <Chip variant="bordered" className='border-black text-black'>戶外活動</Chip>
        </div>
        <div className="info space-y-2 px-4 pb-6">
          <p className='pdate'>2025 | Dec.12th -Dec.20th </p>
          <p className='pname'>烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師</p>
          <p className='pprice'>NTD $3,200</p>
        </div>
      </div>
      
    </>
  )
}
