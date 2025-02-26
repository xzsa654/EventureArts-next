'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// import { useOrder } from '@/hooks/use-order' // 取得 useOrder
import { Button } from '@heroui/button'
import { HiArrowRight } from 'react-icons/hi2'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export default function ECPayCallback() {
  // 取得網址參數，例如: ?RtnCode=xxxxxx
  const searchParams = useSearchParams()
  // const rtnCode = searchParams.get('RtnCode');
  const router = useRouter()
  // const { orderData, setOrderData } = useOrder() // 取出商品資訊
  const [loading, setLoading] = useState(true) // 顯示 Loading 畫面
  const [error, setError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  // const [orderResult, setOrderResult] = useState(null)

  // 取得付款資訊
  const RtnCode = searchParams.get('RtnCode') // 綠界回傳碼
  const MerchantTradeNo = searchParams.get('MerchantTradeNo') // 訂單號
  const ticket_code = MerchantTradeNo.replace(/^od/, '') // 去掉 "od"
  const TradeAmt = searchParams.get('TradeAmt') // 交易金額
  const TradeDate = searchParams.get('TradeDate') // 交易時間
  const PaymentDate = searchParams.get('PaymentDate') // 付款時間
  const PaymentType = searchParams.get('PaymentType') // 付款方式
  const RtnMsg = searchParams.get('RtnMsg') // 回應訊息

  // ===== 舊寫法用useOrder這個自定義hook(useContext)不行，因為去綠界會刷頁面所以資料會不見。 start =====
  // useEffect(() => {
  //   console.log('orderData in callback:', orderData) // 檢查 orderData 是否正確

  //   if (RtnCode === '1') {
  //     console.log('🔍 orderData in callback.js:', orderData)

  // 如果 orderData 丟失，重新從 API 取得
  //     if (!orderData) {
  //       console.log('⚠️ orderData 丟失，重新從 API 取得資料...')
  //       fetch(
  //         `${API_BASE_URL}/order/api/getOrderDetails?merchant_trade_no=${MerchantTradeNo}`
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log('重新獲取 orderData:', data)
  //           setOrderData(data)
  //           sendOrderToDatabase(data)
  //         })
  //         .catch((err) => {
  //           console.error('無法取得 orderData:', err)
  //           setError('無法取得訂單資訊，請聯繫客服')
  //           setLoading(false)
  //         })
  //     } else {
  //       console.log('orderData 已存在，直接送到資料庫:', orderData)
  //       sendOrderToDatabase(orderData)
  //     }
  //   }
  // }, [RtnCode])

  // const sendOrderToDatabase = (data) => {
  //   const ticket_code = MerchantTradeNo.replace(/^od/, '')

  //   fetch(`${API_BASE_URL}/order/api/createOrder`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       user_id,
  //       user_name,
  //       ticket_code,
  //       merchant_trade_no: MerchantTradeNo,
  //       trade_amt: TradeAmt,
  //       trade_date: TradeDate,
  //       payment_date: PaymentDate,
  //       payment_type: PaymentType,
  //       event_name: data.event_name || data.name, // 確保對應 key
  //       event_price: data.event_price || data.price,
  //       locat_name: data.locat_name,
  //       city: data.city,
  //       district: data.district,
  //       address: data.address,
  //       bd_name: data.bd_name,
  //       bd_tel: data.bd_tel,
  //       bd_email: data.bd_email,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log('✅ 訂單儲存成功:', result)
  //       setOrderData(null)
  //       setOrderResult(result)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.error('訂單儲存失敗:', err)
  //       setError('無法儲存訂單，請聯繫客服')
  //       setLoading(false)
  //     })
  // }
  // ===== 舊寫法用useOrder這個自定義hook(useContext)不行，因為去綠界會刷頁面所以資料會不見。 end =====

  // 當 `RtnCode=1`（付款成功），發送更新 API
  useEffect(() => {
    if (RtnCode === '1' && MerchantTradeNo) {
      console.log(`付款成功，更新訂單 ${MerchantTradeNo}`)
      updateOrderStatus()
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
  // if (isDev) console.log('RtnCode', searchParams?.get('RtnCode'))  eddy老師

  return (
    <>
      <div className=" w-full  h-screen bg-[#f7f5f1]">
        <div className=" pt-40 px-16">
          <h5 className="text-xl font-bold pb-4">ECPay(綠界金流) - 付款成功</h5>
          <div className="border-t-1  border-[#dadada]">
            <dl className="flex justify-between text-16 mt-8">
              <dt>交易編號｜MerchantTradeNo :</dt>
              <dd>{MerchantTradeNo}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易金額｜TradeAmt :</dt>
              <dd>＄ {TradeAmt} NTD</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易時間｜TradeDate :</dt>
              <dd>{TradeDate?.replace(/\//g, '-')}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款時間｜PaymentDate :</dt>
              <dd>{PaymentDate?.replace(/\//g, '-')}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款方式｜PaymentType :</dt>
              <dd>
                {PaymentType === 'Credit_CreditCard'
                  ? '信用卡付款'
                  : PaymentType === 'TWQR_OPAY'
                  ? 'TWQR行動支付'
                  : PaymentType}
              </dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>回應訊息｜RtnMsg :</dt>
              <dd>{RtnMsg === 'Succeeded' ? '付款成功' : RtnMsg}</dd>
            </dl>
            {/* 按鈕 */}
            <div className="flex justify-center mt-40 gap-10">
              <Button
                size="sm"
                radius="none"
                classNames={{}}
                variant="light"
                className="text-base text-yellow-600 hover:text-yellow-300 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mt-5 px-7  data-[hover=true]:bg-primary-300"
              >
                回到首頁
                <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
              </Button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 返回的範例:
// http://localhost:3000/ecpay/callback?CustomField1=&CustomField2=&CustomField3=&CustomField4=&MerchantID=3002607&MerchantTradeNo=od20241130223942231&PaymentDate=2024%2F11%2F30+23%3A11%3A51&PaymentType=TWQR_OPAY&PaymentTypeChargeFee=0&RtnCode=1&RtnMsg=Succeeded&SimulatePaid=0&StoreID=&TradeAmt=1000&TradeDate=2024%2F11%2F30+22%3A39%3A42&TradeNo=2411302239425452&CheckMacValue=958DF6A1C508F2A90F04440AF0F464960A71E315EBA903A4FCD53C1517C043ED
