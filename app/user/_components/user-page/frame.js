'use client'

import React, { useState, useEffect } from 'react'

export default function UserPageFrame(props) {
  return (
    <>
      {/* layout */}
      <div className=" min-w-[1440px] h-[780px] mt-20 ">
        {/* Screen Message */}
        <div className="w-full border-black border-t-1 border-b-1 text-center px-16 tracking-[0.08em]">
          <h1 className="w-full text-[128px] leading-[140px] font-bold">
            LIKED EVENTS *
          </h1>
        </div>
        {/* main */}
        <div className="container border-black border-r-1 border-l-1    mx-auto flex   ">
          {/*sidebar  */}
          <div className="">
            {/* sidebar-top */}
            <ul className="w-[150px] border-r-1 border-black h-[320px] border-b-1  ">
              <li className=" border-b-1 border-black flex items-center justify-center  w-full h-[43px] ">
                我的檔案
              </li>
              <li className=" border-b-1 border-black w-full h-[43px] flex items-center justify-center ">
                訂單
              </li>
              <li className=" border-b-1 border-black  w-full h-[43px] flex items-center justify-center ">
                收藏
              </li>
            </ul>
            {/* sidebar-tail */}
            <ul className="w-[150px] border-r-1 border-black h-[320px] border-b-1  ">
              <li className=" border-b-1 border-black flex items-center justify-center  w-full h-[43px] ">
                我的品牌
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  w-full h-[43px] ">
                課程管理
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  w-full h-[43px] ">
                展覽管理
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  w-full h-[43px] ">
                訂單管理
              </li>
            </ul>
          </div>
          {/* contnet */}
          <div className="w-[990px] h-[640px]"></div>
        </div>
      </div>
    </>
  )
}
