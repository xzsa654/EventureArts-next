'use client'

import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ParaTitle({title, link, btnname}) {

  // title:左標題；link：右連結；btname：右連結顯示文字
  return (
    <>
    <div className="py-2.5 px-16 justify-between items-center inline-flex">
        <div className="text-[#7f7f7f] text-[16px] font-bold">{title}</div>
        <div className="text-[#E3C8B9] text-[16px] font-normal inline-flex items-center">
            <a href={link}>{btnname}</a>
            <MdKeyboardArrowRight />
        </div>
    </div>
    </>
  )
}
