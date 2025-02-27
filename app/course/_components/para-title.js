'use client'

import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ParaTitle({title, link, btn}) {

  // title:左標題；link：右連結；btname：右連結顯示文字。
  return (
    <>
    <div className="py-8 inline-flex justify-between items-center w-full">
        <div className="paraLeft">{title}</div>
        <div className="paraRight inline-flex items-center">
            <a href={link}>{btn}</a>
            <MdKeyboardArrowRight />
        </div>
    </div>
    </>
  )
}
