'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { Tabs, Tab } from '@heroui/tabs'
import Link from 'next/link'
import Image from 'next/image'
import {
  HiOutlineTicket,
  HiOutlineReceiptPercent,
  HiArrowDown,
} from 'react-icons/hi2'
import { USERDATA } from '@/lib/user-api'

export default function MyticketPage() {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const [data, setData] = useState([])

  // 未登入轉址
  useEffect(() => {
    if (auth?.token) {
      fetch(USERDATA + '/getAllTickets', {
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((r) => r.json())
        .then((result) => {
          setData(result || []) // 避免 null 或 undefined
        })
        .catch((err) => console.error('載入票券失敗:', err))
    }
  }, [auth?.token])
  console.log(data)
  return (
    <>
      <div className="flex items-center">
        本表格預設為：下單時間由新到舊排列
        <HiArrowDown />
      </div>
      <div className="flex flex-col border-t-5  border-black">
        {/* 細橫線 */}
        <div className="border-b-1p border-black w-full mt-2"></div>

        {/* 使用 Tabs 來取代 Button */}
        <Tabs
          size="lg"
          aria-label="票券"
          classNames={{
            tabList: ' gap-96 w-full relative rounded-none p-0 justify-center',
            cursor: 'w-full bg-[#D6AA4D] ease-in-out ',
            tab: 'max-w-fit px-6 h-8 font-serif',
            tabContent:
              'group-data-[selected=true]:text-yellow-600 text-16 ease-in-out px-0',
          }}
          variant="underlined"
        >
          {/* 課程收藏 Tab */}
          <Tab
            key="CoursesTicket"
            title="課程｜已購買票券"
            className=" items-center  "
          >
            <div className="w-full flex flex-col border-t-1 border-black h-[660px] overflow-y-scroll">
              <table className="w-full">
                <thead className="max-sm:hidden sticky top-0 z-10 bg-[#f7f5f1] text-center text-16 font-cn ">
                  <tr className="w-full bg-[#f7f5f1]">
                    <th className="w-[280px] p-[10px] font-regular">
                      訂單編號
                    </th>
                    <th className="p-[10px] font-regular">課程名稱</th>
                    <th className="p-[10px] font-regular">課程日期</th>
                    <th className="p-[10px] font-regular">付款金額</th>
                    <th className="p-[10px] font-regular">票券</th>
                    {/* <th className="p-[10px] font-regular">收據（還沒切頁面）</th> */}
                  </tr>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black"></div>
                </thead>
                <tbody className="text-center font-cn h-8">
                  {data
                    ?.filter((item) => item.c_id !== null) // 只顯示課程
                    ?.sort((a, b) => b.order_id - a.order_id) // 根據 order_id 由大到小排序
                    ?.map((course) => (
                      <tr
                        key={course.order_id}
                        className="border-b-1 border-black"
                      >
                        <td className="font-mono w-[280px] max-w-[280px] ">
                          {course.merchant_trade_no}
                        </td>
                        <td className="w-[280px] max-w-[280px] break-words whitespace-normal text-center">
                          <div className="group relative inline-block w-full">
                            <Link
                              href={`/course/product/${course.c_id}`}
                              className="text-primary inline-flex flex-col items-center px-2 py-1 transition-all duration-200 hover:text-green-600 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-green-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                            >
                              {course.event_name}
                            </Link>
                          </div>
                        </td>
                        <td className="font-mono w-[280px] max-w-[280px] tracking-wider">
                          {course.event_startdate} ~ {course.event_enddate}
                        </td>
                        <td className="font-mono w-[280px] max-w-[280px]">
                          $ {course.event_price} NTD
                        </td>
                        <td className="py-4 border-b border-black text-center">
                          <div className="flex justify-center items-center">
                            <Link
                              href={`/order/ticket/${course.ticket_code}`}
                              className="block"
                            >
                              <HiOutlineTicket size={28} />
                            </Link>
                          </div>
                        </td>
                        {/* <td className="py-4 border-b border-black text-center">
                          <div className="flex justify-center items-center">
                            <Link href="#" className="block">
                              <HiOutlineReceiptPercent size={28} />
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Tab>

          {/* 展覽收藏 Tab */}
          <Tab
            key="likedExhibitsTicket"
            title="展覽｜已購買票券"
            className="items-center"
          >
            <div className="w-full flex flex-col border-t-1 border-black h-[740px] overflow-y-scroll">
              <table>
                <thead className="max-sm:hidden text-center text-16 font-cn">
                  <tr className="w-full ">
                    <th className="w-[280] border-b-3 border-black p-[10px] font-regular">
                      訂單編號
                    </th>
                    <th className="border-b-3 border-black p-[10px] font-regular">
                      展覽名稱
                    </th>
                    <th className="border-b-3 border-black p-[10px] font-regular">
                      展覽日期
                    </th>
                    <th className="border-b-3 border-black p-[10px] font-regular">
                      付款金額
                    </th>
                    <th className="border-b-3 border-black p-[10px] font-regular">
                      票券
                    </th>
                    {/* <th className="border-b-3 border-black p-[10px] font-regular">
                      收據（還沒切頁面）
                    </th> */}
                  </tr>
                </thead>
                <tbody className="text-center font-cn h-8">
                  {data
                    ?.filter((item) => item.e_id !== null) // 只顯示展覽
                    ?.sort((a, b) => b.order_id - a.order_id) // 根據 order_id 由大到小排序
                    ?.map((exhibit) => (
                      <tr
                        key={exhibit.order_id}
                        className="border-b-1 border-black"
                      >
                        <td className="font-mono w-[280px] max-w-[280px]">
                          {exhibit.merchant_trade_no}
                        </td>
                        <td className="w-[280px] max-w-[280px] break-words whitespace-normal text-center">
                          <div className="group relative inline-block w-full">
                            <Link
                              href={`/exhibit/detail/${exhibit.e_id}`}
                              className="text-primary inline-flex flex-col items-center px-2 py-1 transition-all duration-200 hover:text-green-600 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-green-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                            >
                              {exhibit.event_name}
                            </Link>
                          </div>
                        </td>
                        <td className="font-mono w-[280px] max-w-[280px] tracking-wider ">
                          {exhibit.event_startdate} ~ {exhibit.event_enddate}
                        </td>
                        <td className=" font-mono w-[280px] max-w-[280px]">
                          $ {exhibit.event_price} NTD
                        </td>
                        <td className="py-4 border-b border-black text-center">
                          <div className="flex justify-center items-center">
                            <Link
                              href={`/order/ticket/${exhibit.ticket_code}`}
                              className="block"
                            >
                              <HiOutlineTicket size={28} />
                            </Link>
                          </div>
                        </td>
                        {/* <td className="py-4 border-b border-black text-center">
                          <div className="flex justify-center items-center">
                            <Link href="#" className="block">
                              <HiOutlineReceiptPercent size={28} />
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
