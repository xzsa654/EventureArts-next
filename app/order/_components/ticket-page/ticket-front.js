'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function TicketPageTicketFront() {
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
        <div className="mt-8 items-center">
          <Image
            src="/Lichia/ticket1.svg"
            alt="ticket1"
            className="w-[286px] h-[286px] "
            width={286}
            height={286}
          />
        </div>
        <>
          <div>
            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              {/* 活動名稱 */}
              <h6 className="text-12 text-primary-300">活動名稱</h6>
              <h5 className="text-16  font-medium">
                生活裡的花與器｜風格美感花藝選搭課｜floral design
              </h5>
            </div>
            {/* 活動細節 */}

            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">地點</dd>
                <dt className=" text-black">台北市內湖區文德路10號</dt>
              </dl>
              <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">時間</dd>
                <dt className=" text-black tracking-widest">
                  2025-01-11 ~ 2025-01-11
                </dt>
              </dl>
              <dl className=" self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">票價</dd>
                <dt className="  text-black break-after-auto">$ 1,200 NTD</dt>
              </dl>
            </div>

            {/* 持票人資訊 */}

            <div className="flex border-t-1 border-black pt-4 gap-1">
              <div className=" pb-4 flex-col self-stretch justify-center items-start gap-2 inline-flex">
                <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">參加者</dd>
                  <dt className=" w-[128px] text-black">馬宜庭</dt>
                </dl>
                <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">訂單編號</dd>
                  <dt className="w-[120px] basis-0 text-black break-words ">
                    2412071627409658038150
                  </dt>
                </dl>
                <dl className=" self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">購買時間</dd>
                  <dt className="w-[120px]  text-black  ">2025-01-11 09:00</dt>
                </dl>
              </div>
              <div className="w-[88px] h-[88px] overflow-hidden">
                <Image
                  src="https://as1.ftcdn.net/v2/jpg/05/29/71/50/1000_F_529715063_RiB20Skm9T4qYoltG6VHkgLenfnP09Jl.jpg"
                  alt="ticket qrcode"
                  className="w-auto h-auto "
                  width={88}
                  height={88}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
