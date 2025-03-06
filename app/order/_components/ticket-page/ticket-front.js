'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { QRCode } from 'react-qrcode-logo'

export default function TicketPageTicketFront({ ticketData }) {
  if (!ticketData) return null
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
            priority
          />
        </div>
        <>
          <div>
            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              {/* 活動名稱 */}
              <h6 className="text-12 text-primary-300">活動名稱</h6>
              <h5 className="text-16  font-medium">{ticketData.event_name}</h5>
            </div>
            {/* 活動細節 */}

            <div className="border-t-1 border-black pt-4 pb-10 flex-col self-stretch justify-center items-start gap-2">
              <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">地點</dd>
                <dt className=" text-black break-words text-wrap w-[200px] ">
                  {ticketData.city}
                  {ticketData.district}
                  {ticketData.address}
                </dt>
              </dl>
              <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">時間</dd>
                <dt className=" text-black break-words text-wrap w-[200px] tracking-widest">
                  {ticketData.event_startdate} ~ {ticketData.event_enddate}
                </dt>
              </dl>
              <dl className=" self-stretch justify-start items-start gap-1 inline-flex basis-0">
                <dd className="w-[68px] text-primary-300">票價</dd>
                <dt className="  text-black break-words text-wrap w-[200px] break-after-auto">
                  $ {ticketData.trade_amt} NTD
                </dt>
              </dl>
            </div>

            {/* 持票人資訊 */}

            <div className="flex border-t-1 border-black pt-4 gap-1">
              <div className=" pb-4 flex-col self-stretch justify-center items-start gap-2 inline-flex">
                <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">參加者</dd>
                  <dt className=" w-[96px] text-black">
                    {ticketData.user_name}
                  </dt>
                </dl>
                <dl className="self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">票券編號</dd>
                  <dt className="w-[110px] basis-0 text-black break-words  text-wrap">
                    {ticketData.ticket_code}
                  </dt>
                </dl>
                <dl className=" self-stretch justify-start items-start gap-1 inline-flex basis-0">
                  <dd className="w-[68px] text-primary-300">購買時間</dd>
                  <dt className="w-[110px]  text-black break-words text-wrap  ">
                    {ticketData.trade_date}
                  </dt>
                </dl>
              </div>
              {/* 生成 QR Code */}
              <div className="flex items-center justify-center w-[90px] h-[90px] p-2 ">
                {ticketData?.ticket_code && (
                  <QRCode
                    value={ticketData.ticket_code} // QR Code 內容
                    size={88} // ✅ 設定適當大小，避免超出
                    bgColor="#E5E4E4" // 背景顏色
                    fgColor="#3B4163" // 前景顏色
                    level="H" // 容錯等級
                    style={{ maxWidth: '100%', height: 'auto' }} // ✅ 防止裁切
                  />
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
