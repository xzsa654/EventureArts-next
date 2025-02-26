'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  Accordion as HerouiReactAccordion,
  AccordionItem as HerouiReactAccordionItem,
  Avatar,
} from '@heroui/react'

import TicketPageTicketFront from '../../_components/ticket-page/ticket-front'
import TicketPageTicketBack from '../../_components/ticket-page/ticket-back'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'


export default function TicketPage() {
  const { ticket_code } = useParams() // 從 URL 取得 ticket_code
  const [ticketData, setTicketData] = useState(null)
  const [loading, setLoading] = useState(true)


  const defaultContent = (
    <p>這是預設內容，您可以在這裡提供問題解答或其他資訊。</p>
  )
  useEffect(() => {
    if (ticket_code) {
      fetch(`${API_BASE_URL}/order/api/getTicket?ticket_code=${ticket_code}`)
        .then((res) => res.json())
        .then((data) => {
          setTicketData(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error('API 錯誤:', err)
          setLoading(false)
        })
    }
  }, [ticket_code])

  if (loading) return <p>載入中...</p>
  if (!ticketData) return <p>找不到您的票券，請聯絡客服！</p>
 
  return (
    <>
      <div className=" w-full h-auto mt-20">
        <p className="text-left t-16 px-10 pb-4 text-gray-800 ">您的票券</p>
        <div className="w-full h-auto flex flex-wrap justify-center items-center">
          <div className="flex flex-1 justify-center min-w-[380px] mb-6">
           {/* 傳遞訂單數據給 QR Code 票券 */}
            <TicketPageTicketFront ticketData={ticketData}/>
          </div>
          <div className="flex flex-1 justify-center min-w-[380px] mb-6">
            <TicketPageTicketBack ticketData={ticketData}/>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center px-10 py-16">
        <p className="text-left t-16 pb-7 text-gray-800 ">票券相關資訊</p>
        <HerouiReactAccordion selectionMode="multiple">
          <HerouiReactAccordionItem
            key="1"
            aria-label="注意事項"
            startContent={
              <Avatar
                isBordered
                color="primary"
                radius="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            }
            subtitle="請詳閱以維護您的權利"
            title="注意事項"
          >
            {defaultContent}
          </HerouiReactAccordionItem>
          <HerouiReactAccordionItem
            key="2"
            aria-label="還沒想好放什麼"
            startContent={
              <Avatar
                isBordered
                color="warning"
                radius="lg"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
            }
            subtitle="還沒想好放什麼"
            title="還沒想好放什麼"
          >
            {defaultContent}
          </HerouiReactAccordionItem>
        </HerouiReactAccordion>
      </div>
    </>
  )
}
