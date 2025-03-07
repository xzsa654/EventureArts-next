'use client'

import { Card, CardHeader, CardBody } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/button'
import { HiArrowRight } from 'react-icons/hi2'
import Image from 'next/image'

export default function EventCard({ event }) {
  if (!event) return null // 防止 event 為 null 時出錯

  const router = useRouter()

  if (!event || (!event.e_id && !event.c_id)) return null

  // 生成圖片路徑
  const eventImage = event.image
    ? `http://localhost:3001/uploads/chu-uploads/${event.image}`
    : 'https://heroui.com/images/hero-card-complete.jpeg' // 預設圖片

  // 動態決定跳轉網址
  const targetUrl = event.e_id
    ? `/exhibit/online-detail/${event.e_id}`
    : `/course/product/${event.c_id}`
  return (
    <Card
      radius="none"
      className="relative border border-black bg-transparent px-8 py-3 w-[350px] flex flex-col gap-4 h-auto"
    >
      {/* 右上角關閉按鈕 */}
      {/* <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer"
        // onClick={() => alert('確定取消收藏！')}
        // aria-label="關閉卡片"
      ></button> */}

      {/* 行政區 + 課程分類 */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm">{event.district}</p>
        {/* <Button
          size="sm"
          variant="bordered"
          radius="full"
          className=" text-red text-sm border-red"
        >
          課程分類
        </Button> */}
      </div>

      {/* 圖片 */}
      <div className="w-full h-[180px] overflow-hidden">
        <Image
          alt={event.name}
          className="w-full h-full object-cover"
          src={eventImage}
          width={320}
          height={180}
          priority
        />
      </div>

      {/* 活動資訊 */}
      <CardHeader className="flex flex-col items-start gap-2 p-0">
        <p className=" text-12">
          {event.start_date
            ? `${event.start_date} ~ ${event.end_date}`
            : '尚未設定日期'}
        </p>
        <h4 className="font-semibold text-base">{event.name}</h4>
        <p className="text-sm uppercase">$ {event.price} NTD</p>
      </CardHeader>

      {/* 導覽到課程或頁面按鈕 */}
      <div className="flex justify-center ">
        <Button
          size="sm"
          radius="none"
          classNames={{}}
          variant="light"
          className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-10 px-7  data-[hover=true]:bg-primary-300"
          onPress={() => router.push(targetUrl)} // 直接動態導航
        >
          查看細節
          <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
        </Button>
      </div>
    </Card>
  )
}
