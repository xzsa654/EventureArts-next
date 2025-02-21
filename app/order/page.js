'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox } from '@heroui/react'
import BtnCTA from '../course/_components/btnCTA'
import { useOrder } from '@/hooks/use-order'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import './order.css'
import { Button } from '@heroui/button'
import { HiArrowRight, HiXMark } from 'react-icons/hi2'

export default function Order(props) {
  const { title, titleCB } = useOrder()
  const search = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const data = Object.fromEntries(search) // I'll get an url :localhost:3000:order/e_id=10&c_id=20

    //    get this from course and exhibit page.
    // console.log(data);
    // const {eId,cId} =data
    // if(eId){
    //     router.push(`/user?eId=${eId}`)
    // }else{
    //     router.push(`/user?cId=${cId}`)
    // }
    // titleCB(data)
  }, [])
  console.log(title)

  return (
    <>
      {/*---------- 上—— 商家資料 ----------*/}
      <div className="detail">
        <div className="orderTitle">
          <p>商品明細</p>
        </div>
        <hr />
        {/* 1. 課程名稱&價格 */}
        <div className="flex flex-row justify-between">
          <p>生活裡的花與器｜風格美感花藝選搭課｜floral design.</p>
          <p>$ 1,688 NTD</p>
        </div>
        {/* 2. 課程時間 */}
        <div className="flex flex-row justify-between">
          <p>活動時間</p>
          <p>2025-01-11~2025-01-11</p>
        </div>
        {/* 3. 課程地址 */}
        <div className="flex flex-row justify-between">
          <p>活動地址</p>
          <p>台北市內湖區文德路10號</p>
        </div>
        {/* 4. 課程備註 */}
        <div className="flex flex-row justify-between">
          <p> </p>
          <p className="note ">*請於付款後，致電品牌方進行預約確認，謝謝您。</p>
        </div>
      </div>
      {/*---------- 中—— 商品明細 ----------*/}
      <div className="detail">
        <div className="orderTitle">
          <p>商家資料</p>
        </div>
        <hr />
        {/* 1. 課程名稱&價格 */}
        <div className="flex flex-row justify-between">
          <p>商家名稱</p>
          <p>迷花島嶼</p>
        </div>
        {/* 2. 課程時間 */}
        <div className="flex flex-row justify-between">
          <p>聯絡電話</p>
          <p>02-39100200</p>
        </div>
        {/* 3. 課程地址 */}
        <div className="flex flex-row justify-between">
          <p>聯絡信箱</p>
          <p>bonfrogbf@gmail.com</p>
        </div>
      </div>

      {/*---------- 下—— 付款方式 ----------*/}
      <div className="detail">
        <div className="orderTitle">
          <p>付款方式</p>
        </div>
        <hr />
        {/* 1. 信用卡 */}
        <div className="paymentTitle flex flex-row justify-between text-16">
          信用卡一次付清
          <div className="credit flex flex-row"></div>
        </div>
      </div>

      {/*---------- 送出訂單 ----------*/}
      <div className="detail mb-8">
        {/* 導至綠界金流按鈕 */}
        <div className="flex justify-center  gap-10">
          <Button
            size="sm"
            radius="none"
            classNames={{}}
            variant="light"
            className="text-base text-gray-600 hover:text-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
          >
            取消本次購買
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
          <Button
            size="sm"
            radius="none"
            classNames={{}}
            variant="light"
            className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
          >
            綠界金流付款
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
        </div>
      </div>
    </>
  )
}
