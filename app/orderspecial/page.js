'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import ComponentsReminder from '../order/_components/reminder'
import { Button } from '@heroui/button'
import { HiArrowRight } from 'react-icons/hi2'
import { useModal } from '@/contexts/modal-context'
import { Suspense } from 'react'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

// 分離使用 useSearchParams 的部分到單獨組件
function OrderContent() {
  const { useSearchParams } = require('next/navigation') // 動態引入
  const searchParams = useSearchParams()
  const e_id = searchParams.get('e_id')
  const c_id = searchParams.get('c_id')
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { onOpenChange } = useModal().login

// 改背景顏色
useEffect(() => {
  // 進入頁面時修改背景顏色
  document.body.style.backgroundColor = '#f7f5f1'

  // 離開頁面時恢復原本顏色
  return () => {
    document.body.style.backgroundColor = ''
  }
}, [])

  useEffect(() => {
    if ((e_id || c_id) && !orderData) {
      fetch(
        `${API_BASE_URL}/order/api/getOrderDetails?e_id=${e_id || ''}&c_id=${
          c_id || ''
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching order details:', err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [e_id, c_id])

  if (loading) return <p>載入中...</p>
  if (!orderData) return <p>無法生成訂單，請再試一遍</p>

  return (
    <>
      {/*---------- 上—— 商家資料 ----------*/}
      <div className="mt-20">
      <div className="py-5 px-16 leading-10">
        <div className="orderTitle">
        <p className="text-xl font-bold">商品明細</p>
        </div>
        <hr className="bg-[#dadada] h-[1px] border-0" />
        {/* 1. 活動名稱 */}
        <div className="flex flex-row justify-between">
          <p>活動名稱</p>
            <p>{orderData.event_name}</p>
        </div>
        {/* 2. 活動價格 */}
        <div className="flex flex-row justify-between">
          <p>活動票價</p>
          <p className=" line-through">$ {orderData.event_price} NTD</p>
        </div>
        {/* 3. 活動時間 */}
        <div className="flex flex-row justify-between">
          <p>活動時間</p>
          <p>
            {orderData.event_startdate} ~ {orderData.event_enddate}
          </p>
        </div>
        {/* 4. 活動地址 */}
        <div className="flex flex-row justify-between">
          <p>活動地址</p>
          <p>
            {orderData.city}
            {orderData.district}
            {orderData.address}
          </p>
        </div>
        {/* 4. 課程備註 */}
        <div className="flex flex-row justify-between">
          <p> </p>
          <p className="note ">*請於付款後，致電品牌方進行預約確認，謝謝您。</p>
        </div>
      </div>
      {/*---------- 中—— 商品明細 ----------*/}
      <div className="py-5 px-16 leading-10">
        <div className="orderTitle">
        <p className="text-xl font-bold">商家資料</p>
        </div>
        <hr className="bg-[#dadada] h-[1px] border-0" />
        {/* 1. 課程名稱&價格 */}
        <div className="flex flex-row justify-between">
          <p>商家名稱</p>
          <p>{orderData.bd_name}</p>
        </div>
        {/* 2. 課程時間 */}
        <div className="flex flex-row justify-between">
          <p>聯絡電話</p>
          <p>{orderData.bd_tel}</p>
        </div>
        {/* 3. 課程地址 */}
        <div className="flex flex-row justify-between">
          <p>聯絡信箱</p>
          <p>{orderData.bd_email}</p>
        </div>
      </div>

      {/*---------- 下—— 付款方式 ----------*/}
      <div className="py-5 px-16 leading-10">
        <div className="orderTitle">
        <p className="text-xl font-bold">付款方式</p>
        </div>
        <hr className="bg-[#dadada] h-[1px] border-0" />
        {/* 1. 信用卡 */}
        <div className="paymentTitle flex flex-row justify-between text-16">
          <p>信用卡一次付清</p>
          <h5 className=" text-red font-bold">$ 1000 NTD</h5>
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
            onPress={() => router.push('/')}
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
            onPress={() => {
              // ✅ 檢查是否有登入
              if (!auth?.token) {
                return onOpenChange(true)
              }

              // 使用登入者的 user_id & user_name
              const data = {
                user_id: auth.user_id,
                e_id,
                c_id,
                event_name: orderData.event_name,
                event_price: orderData.event_price,
                event_startdate: orderData.event_startdate,
                event_enddate: orderData.event_enddate,
                locat_id: orderData.locat_id,
                locat_name: orderData.locat_name,
                city: orderData.city,
                district: orderData.district,
                address: orderData.address,
                bd_id: orderData.bd_id,
                bd_name: orderData.bd_name,
                bd_tel: orderData.bd_tel,
                bd_email: orderData.bd_email,
                amount: 1000, //來自抽卡的special_price，固定金額為$1000 作為結帳畫面。
              }

              window.location.href = `http://localhost:3001/ecpay-test?${new URLSearchParams(
                data
              )}`
            }}
          >
            綠界金流付款
            <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center px-16 py-16 bg-[#f7f5f1]">
        <ComponentsReminder />
      </div>
      </div>
    </>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>載入訂單中...</div>}>
      <OrderContent />
    </Suspense>
  )
}
