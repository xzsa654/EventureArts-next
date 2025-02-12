'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@heroui/react'
import { usePathname } from 'next/navigation'
export default function Footer(props) {
  const footerHref = [
    { title: '常見問題', href: '#' },
    { title: '上架規範', href: '#' },
    { title: '了解EventureArts', href: '#' },
    { title: '隱私權政策', href: '#' },
  ]
  const pathname = usePathname();
  if (pathname === '/') return null; // 如果是首頁，就不渲染 Footer
  return (
    <>
      <div className="w-full   bg-black text-white flex  max-sm:p-0 p-10 flex-col  justify-center items-center gap-10   bottom-0">
        {/* Footer Content  */}
        <div className="flex justify-between w-[1140] font-serif  py-5  border-t-1  max-sm:hidden">
          {/* start content */}
          <ul className="text-16 w-full  text-secondary px-10 flex flex-col gap-[10] ">
            <p>舉辦活動</p>
            {footerHref.map((item, i) => {
              if (i < 2) {
                return (
                  <li key={i}>
                    <Link className=" text-white" size="sm" href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
          {/* center content */}
          <ul className="text-16  w-full   text-secondary flex flex-col gap-[10] ">
            <p>關於我們</p>
            {footerHref.map((item, i) => {
              if (i >= 2) {
                return (
                  <li key={i}>
                    <Link className=" text-white" size="sm" href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                )
              }
            })}
          </ul>

          {/* end content */}
          <ul className="text-16  w-full   text-secondary flex flex-col gap-[10] ">
            <p>聯絡我們</p>
            <li className="text-12 text-white ">eventurearts@gmail.com</li>
          </ul>
        </div>

        {/*Copyright  */}
        <p className=" max-[540px]:text-12">
          © 2025 EventureArts. All Rights Reserved.
        </p>
      </div>
    </>
  )
}
