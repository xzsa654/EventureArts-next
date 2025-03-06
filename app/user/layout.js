// app/user/layout.js
'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Image } from '@heroui/react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Loading from '@/components/common/loading'

export default function UserLayout({ children }) {
  const { auth } = useAuth()
  // 当前路由
  const pathName = usePathname().split('/user')[1]
  const [loading, setLoading] = useState(!auth.token)

  // 改背景顏色
  useEffect(() => {
    // 進入頁面時修改背景顏色
    document.body.style.backgroundColor = '#f7f5f1'

    // 離開頁面時恢復原本顏色
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  // onload 还没载完前的 loading
  useEffect(() => {
    const loadData = async () => {
      try {
        if ((await auth.token) !== '') setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // 获取页面标题
  const getPageTitle = () => {
    if (pathName.startsWith('/b/profile')) return '#MY BRAND'
    if (pathName.startsWith('/b/ex-mang')) return '#EXHIBIT MANG.'
    if (pathName.startsWith('/b/co-mang')) return '#COURSE MANG.'
    if (pathName.startsWith('/c/liked')) return 'LIKED EVENTS *'
    if (pathName.startsWith('/c/profile')) return 'MY PROFILE *'
    if (pathName.startsWith('/c/myticket')) return 'MY TICKET *'
    if (pathName.startsWith('/message')) return 'Message'
    return ''
  }

  const isActive = { c: 'text-yellow-600', b: 'text-green-600' }

  if (loading) return <Loading />
  if (!auth?.token)
    return (
      <div className="h-screen mt-20 flex text-3xl items-center justify-center text-center text-black">
        請先登入EventureArts，查看更多
      </div>
    )

  return (
    <>
      {/* layout */}
      <div className="max-sm:w-full mt-20 flex flex-col">
        {/* Screen Message */}
        <div className="w-full border-black border-t-1 border-b-1 text-center max-sm:px-0 px-16 tracking-[0.08em]">
          <h1 className="w-full max-sm:text-4xl text-[128px] leading-[140px] font-bold">
            {getPageTitle()}
          </h1>
        </div>
        <div
          className="container h-full flex-auto  max-sm:border-none max-sm:px-2
          border-black border-r-1 border-l-1  mx-auto max-sm:my-0  flex max-sm:flex-col"
        >
          {/* 这里保留你原有的侧边栏代码 */}
          {/*sidebar  */}
          <div className="h-auto border-black w-[150px] border-r-1 max-sm:hidden  ">
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
                  href="/user/c/myticket"
                  size="md"
                  className={` text-16 hover:text-yellow-600 ${
                    pathName == '/c/myticket' ? isActive.c : ''
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
            {auth.user_role == 'brand' && (
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
            )}
          </div>

          {/* content */}
          <div
            className={`w-full flex flex-col h-auto gap-5 ${
              pathName.includes('profile') || pathName.includes('message')
                ? ''
                : 'mx-12 my-6 max-sm:my-2 max-sm:mx-0'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
