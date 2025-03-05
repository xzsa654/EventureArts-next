'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ComponentsReminder from '../../_components/reminder'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { HiArrowRight } from 'react-icons/hi2'

import TicketPageTicketFront from '../../_components/ticket-page/ticket-front'
import TicketPageTicketBack from '../../_components/ticket-page/ticket-back'
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export default function TicketPage() {
  const { ticket_code } = useParams() // 從 URL 取得 ticket_code
  const [ticketData, setTicketData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    // 進入頁面時修改 body 背景色
    document.body.style.backgroundColor = '#f7f5f1'

    // 離開頁面時恢復原本顏色（防止影響其他頁面）
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

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
      <div className=" w-full h-auto mt-20 ">
        <p className="text-left t-16 px-10 pb-4 text-gray-800 ">您的票券</p>
        <div className="w-full h-auto flex flex-wrap justify-center items-center">
          <div className="flex flex-1 justify-center min-w-[380px] mb-6">
            {/* 傳遞訂單數據給 QR Code 票券 */}
            <TicketPageTicketFront ticketData={ticketData} />
          </div>
          <div className="flex flex-1 justify-center min-w-[380px] mb-6">
            <TicketPageTicketBack ticketData={ticketData} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Button
            size="sm"
            radius="none"
            classNames={{}}
            variant="light"
            className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
            onPress={() => router.push('/exhibit/explore')}
          >
            探索更多展覽
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
          <Button
            size="sm"
            radius="none"
            classNames={{}}
            variant="light"
            className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
            onPress={() => router.push('/course/explore')}
          >
            探索更多課程
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
          <Button
            size="sm"
            radius="none"
            classNames={{}}
            variant="light"
            className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
            onPress={() => router.push('/user/c/myticket')}
          >
            去我的訂單
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center px-10 pt-10 pb-16">
        <ComponentsReminder />
      </div>
    </>
  )
}
