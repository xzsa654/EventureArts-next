'use client'

import React, { useState, useEffect } from 'react'

export default function Headline(props) {
  return (
    <>
<div className="h-[155px] py-[35px] justify-center items-center inline-flex">
    <div className="grow shrink basis-0 h-[85px] justify-start items-center flex">
        <div className="grow shrink basis-0 px-5 flex-col justify-center items-center inline-flex">
            <div className="text-black text-[31px] font-semibold font-['IBM Plex Mono'] tracking-[2.48px]">Courses</div>
            <div className="text-center text-black text-[13px] font-normal font-['IBM Plex Mono'] tracking-wide">Expolre nearby offline <br/>courses in Taipei.</div>
        </div>
        <div className="w-[629px] px-2 border-l border-r border-black flex-col justify-center items-center gap-[23px] inline-flex">
            <div className="text-[#2a2a2a] text-[40px] font-black font-['Noto Serif TC'] tracking-[8px]"> 我的藝術探險夥伴 </div>
            <div className="text-center text-[#2a2a2a] text-xs font-normal font-['Noto Serif TC'] tracking-widest">說走就走！探索台北線下課程</div>
        </div>
        <div className="grow shrink basis-0 px-5 flex-col justify-center items-center inline-flex">
            <div className="text-black text-[31px] font-semibold font-['IBM Plex Mono'] tracking-[2.48px]">EventureArts</div>
            <div className="text-center text-black text-[13px] font-normal font-['IBM Plex Mono'] tracking-wide">Your best partner for <br/>Arts and Events adventures.</div>
        </div>
    </div>
</div>
    </>
  )
}
