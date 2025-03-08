'use client'

import { Suspense } from 'react'
import './order.css'

// 將使用 useSearchParams 的邏輯分離到獨立組件
function OrderContent() {
  const { useState, useEffect } = require('react')
  const { useSearchParams, useRouter } = require('next/navigation')
  const { useAuth } = require('@/hooks/use-auth')
  const ComponentsReminder = require('./_components/reminder').default
  const { Button } = require('@heroui/button')
  const { HiArrowRight } = require('react-icons/hi2')
  const { useModal } = require('@/contexts/modal-context')

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

  const searchParams = useSearchParams() // 使用 useSearchParams 取 query
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth() // 取得登入資訊
  const { onOpenChange } = useModal().login

  const [e_id, setEId] = useState(null)
  const [c_id, setCId] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ 確保 searchParams 只會在 Client Side 執行
  useEffect(() => {
    setEId(searchParams.get('e_id'))
    setCId(searchParams.get('c_id'))
  }, [searchParams])

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
      // 加入 Authorization 標頭
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
        <div className="detail">
          <div className="orderTitle">
            <p>商品明細</p>
          </div>
          <hr />
          {/* 1. 活動名稱 */}
          <div className="flex flex-row justify-between">
            <p>活動名稱</p>
            <p>{orderData.event_name}</p>
          </div>
          {/* 2. 活動價格 */}
          <div className="flex flex-row justify-between">
            <p>活動票價</p>
            <p>$ {orderData.event_price} NTD</p>
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
            <p className="note ">
              *請於付款後，致電品牌方進行預約確認，謝謝您。
            </p>
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
          <div className="flex justify-center gap-10">
            <Button
              size="sm"
              radius="none"
              classNames={{}}
              variant="light"
              className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7 data-[hover=true]:bg-primary-300"
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
                  amount: orderData.event_price,
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

// 主要導出的組件，使用 Suspense 包裹
export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#f7f5f1]">
          <p className="text-lg font-bold">載入訂單資訊中...</p>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  )
}
