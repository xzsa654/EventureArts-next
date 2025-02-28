'use client'

import React, { useState, useEffect } from 'react'
import {Chip} from "@heroui/react";

export default function Card1({
  region = '內湖區', 
  cate = '縫紉布藝', 
  pname = '線與布的溫度。法式手工刺繡小物製作｜Newbie Friendly', 
  pdate = '2025 | Dec.12th -Dec.20th', 
  pprice = 'NTD $3,200'
}) {
  return (
    <>
{/* <Link href={`/course/product/${c_id}`} className="block"> */}
      <div className="card1">
        <img className="w-full aspect-[2/1]" src="https://static.pressplay.cc/static/uploads/project/C5C18CCEFA4438D49F1ACAF8DBD0200D/project_image/20220720/D170DA0561B3DA3CBCDACF92CE45221C/62d7e19752676D170DA0561B3DA3CBCDACF92CE45221C20220720190559.png" alt="productImg" />
        <div className="chips flex gap-3 px-4 py-6">
          <div className='chip'>{region}</div>
          <div className='chip'>{cate}</div>
        </div>
        <div className="info space-y-2 px-4 pb-6">
          <p className='pname'>{pname}</p>
          <p className='pdate'>{pdate}</p>
          <p className='pprice'>{pprice}</p>
        </div>
      </div>
{/* </Link>    */} 
    </>
  )
}
