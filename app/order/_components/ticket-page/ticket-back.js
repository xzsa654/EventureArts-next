'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function TicketPageTicketBack() {
  return (
    <div className="relative w-[350px] h-[750px]">
      {/* SVG 票券背景 */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 350 750"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12C0 5.37256 5.37256 0 12 0H338C344.627 0 350 5.37256 350 12V550C338.954 550 330 558.954 330 570C330 581.046 338.954 590 350 590V738C350 744.627 344.627 750 338 750H12C5.37256 750 0 744.627 0 738V590C11.0459 590 20 581.046 20 570C20 558.954 11.0459 550 0 550V12Z"
          fill="#E5E4E4"
        />
      </svg>

      {/* 票券內容區塊 (動態渲染 API 內容) */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-8 py-2">
        <>
          <div>
            <h6 className="text-12 text-primary-300 pt-20 pb-2">
              票券詳細資訊
            </h6>

            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              {/* 商家名稱 */}
              <h6 className="text-12 text-primary-300">商家名稱</h6>
              <p className="text-16  font-medium">Noémie Fleurs 迷花島嶼</p>
            </div>
            {/* 商家聯絡資訊 */}
            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              <h6 className="text-12 text-primary-300">聯絡資訊</h6>
              <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-500">電話</dd>
                <dt className=" text-black">0975636458</dt>
              </dl>
              <dl className=" self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-500">email</dd>
                <dt className="  text-black break-after-auto">
                  emglijlakis@test.com
                </dt>
              </dl>
            </div>
          </div>
          <div className="pb-5">
            <div className="mb-8 flex justify-center items-center ">
              <Image
                src="/Lichia/ticket5.svg"
                alt="ticket1"
                className="w-[200px] h-[200px] "
                width={200}
                height={200}
                priority
              />
            </div>
            <div className="text-12 flex flex-col justify-center text-center">
              <span>© 2025 EventureArts.</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
