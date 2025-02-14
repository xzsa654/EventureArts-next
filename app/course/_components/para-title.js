'use client'

import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ParaTitle({title, link, btn}) {

  // title:左標題；link：右連結；btname：右連結顯示文字。
  return (
    <>
    <div className="py-8 inline-flex justify-between items-center w-full">
        <div className="text-[#7f7f7f] text-[16px] font-bold">{title}</div>
        <div className="text-[#c9ae9f] text-[16px] font-normal inline-flex items-center">
            <a href={link}>{btn}</a>
            <MdKeyboardArrowRight />
        </div>
    </div>
    </>
  )
}
