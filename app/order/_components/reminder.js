'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Accordion as HerouiReactAccordion,
  AccordionItem as HerouiReactAccordionItem,
  Avatar,
} from '@heroui/react'

export default function ComponentsReminder(props) {
  const defaultContent = (
    <p>這是預設內容，您可以在這裡提供問題解答或其他資訊。</p>
  )
  return (
    <>
      <p className="text-left t-16 pb-3  text-gray-800 border-dashed border-b-1 border-[#dadada]">
        票券相關資訊
      </p>
      <HerouiReactAccordion selectionMode="multiple" className="px-0">
        <HerouiReactAccordionItem
          key="1"
          aria-label="購票須知"
          startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
          subtitle="請詳閱以維護您的權利"
          title="購票須知"
        >
          <p className="text-12">
            • 付款成功後，您的票券將顯示於會員中心的「我的訂單」頁面。
            <br />
            • 本平台不會發送票券Email通知，請記得至會員中心查看。
            <br />
            • 本票券為記名制，包含訂單編號與購買者姓名，故不可轉讓或修改姓名。
            <br />•
            付款成功即代表您同意本票券使用規則，請務必確認資訊正確後再購買。
          </p>
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="2"
          aria-label="票券使用規則"
          startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
          subtitle="參加活動時請記得出示您的票券"
          title="票券使用規則"
        >
          <p className="text-12">
            • 不可退票：本活動無退票機制，請確認行程後再行購買。
            <br />
            • 不可轉讓：票券僅限購買者本人使用，入場時需驗證購票資訊。
            <br />•
            驗票方式：請至會員中心的「我的訂單」頁面查看電子票券，並於活動當天出示QRCode或訂單資訊以供現場驗票。
          </p>
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="3"
          aria-label="退票與更換政策"
          startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
          subtitle="本平台所有活動採實名制認證故不提供退票機制"
          title="退票與更換政策"
        >
          <p className="text-12">
            • 本活動無退票機制，請確認行程後再行購買。
            <br />
            • 若因個人因素無法參加，票券不可轉讓或變更使用人。
            <br />•
            若因活動主辦單位因素（如活動取消、延期）導致無法參與，請聯繫客服處理。
          </p>
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="4"
          aria-label="驗票與入場"
          startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
          subtitle="請妥善保管您的票券於活動當天出示"
          title="驗票與入場"
        >
          <p className="text-12">
            • 活動當天請出示電子票券QRCode供現場驗票。
            <br />
            • 票券驗證後不得重複使用，每張票僅限一次入場。
            <br />
            • 部分活動可能要求身份驗證，請攜帶有效證件（如身份證、學生證等）。
            <br />• 若票券無法正常顯示，請提前聯繫客服。
          </p>
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="5"
          aria-label="常見問題（FAQ）"
          startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
          subtitle="修改姓名、轉讓票券、現場購票、活動時間相關"
          title="常見問題（FAQ）"
        >
          <p className="text-12">
            Q：購票後可以修改姓名嗎？
            <br />
            A：票券為記名制，購票時請確認資訊正確，完成交易後不可修改姓名，若有特殊狀況請聯繫客服。
            <br /> <br />
            Q：可以轉讓票券給朋友嗎？
            <br />
            A：目前不支援票券轉讓，僅限購買者本人使用，故請於購票前再三確認。
            <br /> <br />
            Q：可以現場購票嗎？
            <br />
            A：是否提供現場票視活動而定，請參考活動頁面資訊。
            <br /> <br />
            Q：活動當天遲到還能進場嗎？
            <br />
            A：依據活動規則，部分活動可能不允許遲到，請務必準時抵達。
            <br />
          </p>
        </HerouiReactAccordionItem>
      </HerouiReactAccordion>
    </>
  )
}
