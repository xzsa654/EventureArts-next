'use client'

import React, { useState, useEffect } from 'react'
import {Chip} from "@heroui/react";
import Link from 'next/link';

export default function Card1({
  c_id,
  img = '/Blair/carousel-banner/banner1-crown.png',
  region = '內湖區', 
  cate = '縫紉布藝', 
  pname = '線與布的溫度。法式手工刺繡小物製作｜Newbie Friendly', 
  pdate = '2025 | Dec.12th -Dec.20th', 
  pprice = 'NTD $3,200'
}) {
  
  return (
    <>
<Link href={`/course/product/${c_id||20}`} className="block">
      <div className="card1">
        <img className="w-full aspect-[2/1]" src={img} alt="productImg" />
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
</Link>   
    </>
  )
}
