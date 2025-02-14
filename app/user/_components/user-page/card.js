'use client'

import { Card, CardHeader, CardBody } from '@heroui/react'
import { Button } from '@heroui/button'
import { HiArrowRight, HiXMark } from 'react-icons/hi2'
import Image from 'next/image'

export default function UserPageCard() {
  return (
    <Card
      radius="none"
      className="relative border border-black bg-transparent px-8 py-3 w-[320px] flex flex-col gap-2 h-auto"
    >
      {/* 右上角關閉按鈕 */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer"
        // onClick={() => alert('確定取消收藏！')}
        // aria-label="關閉卡片"
      >
        <HiXMark className="w-5 h-5 " />
      </button>

      {/* 行政區 + 課程分類 */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm">行政區</p>
        <Button
          size="sm"
          variant="bordered"
          radius="full"
          className=" text-red text-sm border-red"
        >
          課程分類
        </Button>
      </div>

      {/* 圖片 */}
      <Image
        alt="event first photo"
        className="w-full h-[180px] object-cover"
        src="https://heroui.com/images/hero-card-complete.jpeg"
        width={320}
        height={219}
      />

      {/* 活動資訊 */}
      <CardHeader className="flex flex-col items-start gap-1 p-0">
        <p className="tracking-normal">2025 | Dec.12th - Dec.20th</p>
        <h4 className="font-semibold text-base">
          這裡放活動名稱這裡放活動名稱這裡放活動名稱這裡放活動名稱這裡
        </h4>
        <p className="text-sm uppercase">$ 3200 NTD</p>
      </CardHeader>

      {/* 買票按鈕 */}
      <div className="flex justify-end ">
        <Button
          size="sm"
          radius="none"
          variant="light"
          className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2"
        >
          買票
          <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
        </Button>
      </div>
    </Card>
  )
}
