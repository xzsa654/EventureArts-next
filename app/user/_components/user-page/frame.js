'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Link, Image, ScrollShadow, Button } from '@heroui/react'
import CourseMang from './ex-mang'
import ExAdd from './ex-add'
export default function UserPageFrame(props) {
  // 當前路由
  const pathName = usePathname().split('/user')[1]

  // 路由對應的title和components
  const routing = {
    '/b/ex-mang': {
      title: '#EXHIBIT MANG.',
      components: <CourseMang />,
    },
    '/b/ex-mang/add-on': { title: '#EXHIBIT MANG.', components: <ExAdd /> },
    '/b/ex-mang/add-off': {
      title: '#EXHIBIT MANG.',
      components: <ExAdd online={true} />,
    },
  }

  const isActive = { c: 'text-yellow-600', b: 'text-green-600' }

  return (
    <>
      {/* layout */}
      <div className=" min-w-[1140px] h-[92vh] mt-20 flex flex-col">
        {/* Screen Message */}
        <div className="w-full border-black border-t-1 border-b-1 text-center px-16 tracking-[0.08em]">
          <h1 className="w-full text-[128px] leading-[140px] font-bold">
            {routing[pathName]?.title}
            {/* MY PROFILE * */}
          </h1>
        </div>
        {/* main */}

        <div
          className="container flex-auto 
          border-black border-r-1 border-l-1 mx-auto flex "
        >
          {/*sidebar  */}
          <div className="h-full border-black border-r-1">
            {/* 用戶端 sidebar-top */}
            <ul className="w-[150px]  border-black border-b-1 h-1/2">
              <li className=" font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-yellow-600 ${
                    pathName == 'profile' ? isActive.c : ''
                  }`}
                >
                  我的檔案
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 w-full h-[50px] flex items-center justify-center ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-yellow-600 ${
                    pathName == 'order' ? isActive.c : ''
                  }`}
                >
                  訂單
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 w-full h-[50px] flex items-center justify-center ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-yellow-600 ${
                    pathName == 'liked' ? isActive.c : ''
                  }`}
                >
                  收藏
                </Link>
              </li>
            </ul>

            {/* 品牌端 sidebar-tail */}
            <ul className="w-[150px] border-black border-b-1 h-1/2 flex flex-col ">
              <li className=" border-b-1 font-cn  border-black flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-green-600 ${
                    pathName == 'profile' ? isActive.b : ''
                  }`}
                >
                  我的品牌
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-green-600 ${
                    pathName == 'co-mang' ? isActive.b : ''
                  }`}
                >
                  課程管理
                </Link>
              </li>
              <li className="  font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="/user/b/ex-mang"
                  size="md"
                  className={`hover:text-green-600 ${
                    pathName.split('/')[2] == 'ex-mang' ? isActive.b : ''
                  }`}
                >
                  展覽管理
                </Link>
              </li>
              <li className="  font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="#"
                  size="md"
                  className={`hover:text-green-600 ${
                    pathName == 'order' ? isActive.b : ''
                  }`}
                >
                  訂單管理
                </Link>
              </li>
              <li className="flex items-center justify-center grow">
                <Image
                  src="/Yao/user/Group 47.svg" // public 資料夾內的 logo.svg
                  alt="Logo"
                />
              </li>
            </ul>
          </div>
          {/* content */}
          <div className="w-full flex flex-col h-auto gap-5 mx-12 my-6">
            {routing[pathName]?.components}
          </div>
        </div>
      </div>
    </>
  )
}
