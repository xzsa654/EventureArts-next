'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@heroui/react'
import UserPageSelect from './select'
import OurPagination from '@/components/common/pagination'
export default function UserPageProfileFrame({
  title = 'MY PROFILE *',
  children,
}) {
  return (
    <>
      {/* layout */}
      <div className=" min-w-[1140px] h-[92vh] mt-20 flex flex-col">
        {/* Screen Message */}
        <div className="w-full border-black border-t-1 border-b-1 text-center px-16 tracking-[0.08em]">
          <h1 className="w-full text-[128px] leading-[140px] font-sans font-bold">
            {title}
          </h1>
        </div>
        {/* main */}
        <div
          className="container flex-auto 
          border-black border-r-1 border-l-1 mx-auto flex"
        >
          {/*sidebar  */}
          <div className="h-full border-black border-r-1">
            {/* sidebar-top */}
            <ul className=" w-[150px] border-black border-b-1 h-1/2">
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-yellow-600 ">
                  我的檔案
                </Link>
              </li>
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-yellow-600 ">
                  訂單
                </Link>
              </li>
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-yellow-600 ">
                  收藏
                </Link>
              </li>
            </ul>

            {/* sidebar-tail */}
            <ul className="w-[150px] border-black border-b-1 h-1/2 flex flex-col ">
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-green-600 ">
                  我的品牌
                </Link>
              </li>
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-green-600 ">
                  課程管理
                </Link>
              </li>
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-green-600 ">
                  展覽管理
                </Link>
              </li>
              <li className="font-cn  border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link href="#" size="md" className="hover:text-green-600 ">
                  訂單管理
                </Link>
              </li>
              <li className="flex items-center justify-center grow">
                <Image
                  src="/Lichia/3-line-start.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </li>
            </ul>
          </div>
          {/* content */}
          <div className="w-full flex h-auto ">{children}</div>
        </div>
      </div>
    </>
  )
}
