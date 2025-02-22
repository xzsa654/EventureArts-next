'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Image } from '@heroui/react'
import Link from 'next/link'
import Mang from './b_player/mang'
import ExAdd from './b_player/exhibit/ex-add'
import CoAdd from './b_player/course/co-add'
import LikedEvents from './c_player/LikedEvents'
import CPlayerProfile from './c_player/profile'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import BPlayerProfile from './b_player/profile'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function UserPageFrame(props) {
  // 當前路由
  const pathName = usePathname().split('/user')[1]
  console.log(pathName)

  // 路由對應的 title 和 components
  const routing = {
    '/b/profile': {
      title: 'Brand PROFILE.',
      components: <BPlayerProfile />,
    },
    '/b/ex-mang': {
      title: '#EXHIBIT MANG.',
      components: <Mang />,
    },
    '/b/ex-mang/add-on': { title: '#EXHIBIT MANG.', components: <ExAdd /> },
    '/b/ex-mang/add-off': {
      title: '#EXHIBIT MANG.',
      components: <ExAdd online={true} />,
    },
    '/c/liked': { title: 'LIKED EVENTS *', components: <LikedEvents /> },
    '/b/co-mang': {
      title: '#COURSE MANG.',
      components: <Mang type={'course'} />,
    },
    '/b/co-mang/add': {
      title: '#COURSE MANG.',
      components: <CoAdd />,
    },
    '/c/profile': {
      title: 'MY PROFILE.',
      components: <CPlayerProfile />,
    },
  }

  const isActive = { c: 'text-yellow-600', b: 'text-green-600' }

  return (
    <>
      {/* layout */}
      <div className="  max-sm:w-full mt-20 flex flex-col">
        {/* Screen Message */}
        <div className="w-full border-black border-t-1 border-b-1 text-center max-sm:px-0 px-16 tracking-[0.08em]">
          <h1 className="w-full max-sm:text-4xl text-[128px] leading-[140px] font-bold">
            {routing[pathName]?.title}
            {/* MY PROFILE * */}
          </h1>
        </div>
        {/* main */}

        {/* sidebar-mobile */}
        <div className="flex justify-between p-2 my-2  md:hidden   ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={2.7}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <Link
                href="/user/c/profile"
                className={`hover:text-yellow-600 ${
                  pathName == 'profile' ? isActive.c : ''
                }   text-[14px] mb-5`}
              >
                我的檔案
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-yellow-600 ${
                  pathName == 'order' ? isActive.c : ''
                }  text-[14px]`}
              >
                訂單
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-yellow-600 ${
                  pathName == 'liked' ? isActive.c : ''
                }    text-[14px]`}
              >
                收藏
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-green-600 ${
                  pathName == 'profile' ? isActive.b : ''
                }`}
              >
                我的品牌
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-green-600 ${
                  pathName.split('/')[2] == 'co-mang' ? isActive.b : ''
                }`}
              >
                課程管理
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-green-600 ${
                  pathName.split('/')[2] == 'ex-mang' ? isActive.b : ''
                }`}
              >
                展覽管理
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="#"
                size="md"
                className={`hover:text-green-600 ${
                  pathName == 'order' ? isActive.b : ''
                }`}
              >
                訂單管理
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>

        <div
          className="container h-full flex-auto  max-sm:border-none max-sm:px-2
          border-black border-r-1 border-l-1  mx-auto max-sm:my-0  flex max-sm:flex-col "
        >
          {/*sidebar  */}
          <div className="h-auto border-black border-r-1 max-sm:hidden  ">
            {/* 用戶端 sidebar-top */}
            <ul className="border-black border-b-1 h-1/2">
              <li className=" font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="/user/c/profile"
                  size="md"
                  className={` text-16 hover:text-yellow-600 ${
                    pathName == '/c/profile' ? isActive.c : ''
                  }`}
                >
                  我的檔案
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 w-full h-[50px] flex items-center justify-center ">
                <Link
                  href="#"
                  size="md"
                  className={` text-16 hover:text-yellow-600 ${
                    pathName == 'order' ? isActive.c : ''
                  }`}
                >
                  訂單
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 w-full h-[50px] flex items-center justify-center ">
                <Link
                  href="/user/c/liked"
                  size="md"
                  className={`text-16 hover:text-yellow-600 ${
                    pathName == '/c/liked' ? isActive.c : ''
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
                  href="/user/b/profile"
                  size="md"
                  className={` text-16 hover:text-green-600 ${
                    pathName == '/b/profile' ? isActive.b : ''
                  }`}
                >
                  我的品牌
                </Link>
              </li>
              <li className=" font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="/user/b/co-mang"
                  size="md"
                  className={`text-16 hover:text-green-600 ${
                    pathName.split('/')[2] == 'co-mang' ? isActive.b : ''
                  }`}
                >
                  課程管理
                </Link>
              </li>
              <li className="  font-cn border-black border-b-1 flex items-center justify-center  w-full h-[50px] ">
                <Link
                  href="/user/b/ex-mang"
                  size="md"
                  className={`text-16 hover:text-green-600 ${
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
                  className={`text-16 hover:text-green-600 ${
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
          <div
            className={`w-full flex flex-col h-auto gap-5 ${
              pathName.includes('profile')
                ? ''
                : 'mx-12 my-6 max-sm:my-2 max-sm:mx-0'
            }`}
          >
            {routing[pathName]?.components}
          </div>
        </div>
      </div>
    </>
  )
}
