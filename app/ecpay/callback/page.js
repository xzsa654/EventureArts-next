'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import ComponentsReminder from '@/app/order/_components/reminder'
import { Button } from '@heroui/button'
import { HiArrowRight } from 'react-icons/hi2'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

// 將使用 useSearchParams 的邏輯分離到獨立組件
function CallbackContent() {
  const { useSearchParams } = require('next/navigation')
  const { useEffect, useState } = require('react')
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  // 取得付款資訊
  const RtnCode = searchParams.get('RtnCode')
  const MerchantTradeNo = searchParams.get('MerchantTradeNo')
  const ticket_code = MerchantTradeNo ? MerchantTradeNo.replace(/^od/, '') : ''
  const TradeAmt = searchParams.get('TradeAmt')
  const TradeDate = searchParams.get('TradeDate')
  const PaymentDate = searchParams.get('PaymentDate')
  const PaymentType = searchParams.get('PaymentType')
  const RtnMsg = searchParams.get('RtnMsg')

  // 當 `RtnCode=1`（付款成功），發送更新 API
  useEffect(() => {
    if (RtnCode === '1' && MerchantTradeNo) {
      console.log(`付款成功，更新訂單 ${MerchantTradeNo}`)
      updateOrderStatus()
    } else {
      setLoading(false) // 確保非成功狀態也會結束載入狀態
    }
  }, [RtnCode, MerchantTradeNo])

  const updateOrderStatus = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/order/api/updatePaymentStatus`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            merchant_trade_no: MerchantTradeNo,
            trade_date: TradeDate,
            payment_date: PaymentDate,
            payment_type: PaymentType,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        console.log('訂單更新成功:', data)
        setUpdateSuccess(true)
      } else {
        console.error('訂單更新失敗:', data)
        setError(data.error || '更新失敗')
      }
    } catch (err) {
      console.error('無法更新訂單:', err)
      setError('伺服器錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#f7f5f1]">
        <p className="text-lg font-bold">正在更新訂單，請勿關閉視窗...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600">
        <p className="text-lg font-bold">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full h-auto bg-[#f7f5f1]">
        <div className="pt-40 px-16">
          <h5 className="text-xl font-bold pb-4">ECPay(綠界金流) - 付款成功</h5>
          <div className="border-t-1 border-[#dadada]">
            <dl className="flex justify-between text-16 mt-8">
              <dt>交易編號｜MerchantTradeNo :</dt>
              <dd>{MerchantTradeNo || '未提供'}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易金額｜TradeAmt :</dt>
              <dd>＄ {TradeAmt || '0'} NTD</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易時間｜TradeDate :</dt>
              <dd>{TradeDate?.replace(/\//g, '-') || '未提供'}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款時間｜PaymentDate :</dt>
              <dd>{PaymentDate?.replace(/\//g, '-') || '未提供'}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款方式｜PaymentType :</dt>
              <dd>
                {PaymentType === 'Credit_CreditCard'
                  ? '信用卡付款'
                  : PaymentType === 'TWQR_OPAY'
                  ? 'TWQR行動支付'
                  : PaymentType || '未提供'}
              </dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>回應訊息｜RtnMsg :</dt>
              <dd>
                {RtnMsg === 'Succeeded' ? '付款成功' : RtnMsg || '未提供'}
              </dd>
            </dl>
            {/* 按鈕 */}
            <div className="flex justify-center mt-40 gap-8">
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
              {ticket_code && (
                <Button
                  size="sm"
                  radius="none"
                  classNames={{}}
                  variant="light"
                  className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
                  onPress={() => router.push(`/order/ticket/${ticket_code}`)}
                >
                  查看票券
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center px-16 py-16 bg-[#f7f5f1]">
        <ComponentsReminder />
      </div>
    </>
  )
}

// 主要導出的組件，使用 Suspense 包裹使用 useSearchParams 的部分
export default function ECPayCallback() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#f7f5f1]">
          <p className="text-lg font-bold">處理付款回調中...</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
