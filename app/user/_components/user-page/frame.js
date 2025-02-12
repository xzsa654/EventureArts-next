'use client'

import React, { useState, useEffect } from 'react'
import { Image } from '@heroui/react'
import { Link } from '@heroui/react'
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
          <div>
            {/* sidebar-top */}
            <ul className="w-[150px] border-r-1 border-black h-[320px] border-b-1 text-16 font-cn  ">
              <li className=" border-b-1 border-black flex items-center justify-center   h-[43px] ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black hover:text-yellow-600"
                >
                  我的檔案
                </Link>
              </li>
              <li className=" border-b-1 border-black h-[43px] flex items-center justify-center ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-yellow-600"
                >
                  訂單
                </Link>
              </li>
              <li className=" border-b-1 border-black   h-[43px] flex items-center justify-center ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-yellow-600"
                >
                  收藏
                </Link>
              </li>
            </ul>

            {/* sidebar-tail */}
            <ul className="w-[150px] relative flex flex-col border-r-1 border-black h-[320px] border-b-1 text-16 font-cn  ">
              <li className=" border-b-1 border-black flex items-center justify-center   h-[43px] ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-green-600"
                >
                  我的品牌
                </Link>
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  h-[43px] ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-green-600"
                >
                  課程管理
                </Link>
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  h-[43px] ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-green-600"
                >
                  展覽管理
                </Link>
              </li>
              <li className=" border-b-1 border-black flex items-center justify-center  h-[43px] ">
                <Link
                  href="#"
                  underline="hover"
                  className="text-black  hover:text-green-600"
                >
                  訂單管理
                </Link>
              </li>
              <li className=" w-full grow flex justify-center items-center ">
                <Image src="Yao/user/Group 47.svg" alt="decorate"></Image>
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
