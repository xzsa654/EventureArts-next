'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'
import { isDev } from '@/config'
import Link from 'next/link'
import { Button } from '@heroui/button'
import { HiArrowRight } from 'react-icons/hi2'

export default function ECPayCallback() {
  // 取得網址參數，例如: ?RtnCode=xxxxxx
  const searchParams = useSearchParams()
  // const rtnCode = searchParams.get('RtnCode');

  if (isDev) console.log('RtnCode', searchParams?.get('RtnCode'))

  return (
    <>
      <div className=" w-full  h-screen bg-[#f7f5f1]">
        <div className=" pt-40 px-16">
          <h5 className="text-xl font-bold pb-4">
            ECPay(綠界金流) - 已完成付款
          </h5>
          <div className="border-t-1  border-[#dadada]">
            <dl className="flex justify-between text-16 mt-8">
              <dt>交易編號｜MerchantTradeNo :</dt>
              <dd>{searchParams?.get('MerchantTradeNo')}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易金額｜TradeAmt :</dt>
              <dd>＄ {searchParams?.get('TradeAmt')} NTD</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>交易時間｜TradeDate :</dt>
              <dd>{searchParams?.get('TradeDate')?.replace(/\//g, '-')}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款時間｜PaymentDate :</dt>
              <dd>{searchParams?.get('TradeDate')?.replace(/\//g, '-')}</dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>付款方式｜PaymentType :</dt>
              <dd>
                {searchParams?.get('PaymentType') === 'Credit_CreditCard'
                  ? '信用卡付款'
                  : searchParams?.get('PaymentType') === 'TWQR_OPAY'
                  ? 'TWQR行動支付'
                  : searchParams?.get('PaymentType')}
              </dd>
            </dl>
            <dl className="flex justify-between text-16 mt-4">
              <dt>回應訊息｜RtnMsg :</dt>
              <dd>
                {searchParams?.get('RtnMsg') === 'Succeeded'
                  ? '付款成功'
                  : searchParams?.get('RtnMsg')}
              </dd>
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
