'use client'

import React, { useState, useEffect, useRef } from 'react'
import ModalLayout from '@/components/common/login/layout'
import {
  Form,
  Input,
  ScrollShadow,
  Textarea,
  addToast,
  Link,
} from '@heroui/react'
import BPlayerJoinUsFiles from './join-us-files'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { useAuth } from '@/hooks/use-auth'
import { ADDBRAND } from '@/lib/brands-api'

export default function JoinUsModal({ isOpen, onOpenChange }) {
  const [logoImg, setLogoImg] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    bd_address: '',
    bd_email: '',
    bd_img: '',
    bd_info: '',
    bd_logo: '',
    bd_name: '',
    bd_tel: '',
    bd_website: '',
    user_id: '',
  })

  const formRef = useRef()
  const { getAuthHeader, auth, beginBrand } = useAuth()
  const { user_id, user_role } = auth
  const title = '成為品牌'
  const tips = '成為品牌'

  const mySubmit = async (e) => {
    e.preventDefault()
    const fm = new FormData(e.target)

    const r = await fetch(ADDBRAND, {
      method: 'POST',
      body: fm,
      headers: {
        ...getAuthHeader(),
      },
    })
    const res = await r.json()
    if (!res.success) {
      addToast({
        radius: 'lg',
        description: '註冊失敗',
        color: 'danger',
        timeout: 10000,
      })
      console.log(res)

      // 展開錯誤的陣列將值丟到一個物件內
      const mergedObject = Object.assign({}, ...res.message)
      setErrorMsg((prev) => {
        return { ...prev, ...mergedObject }
      })
    } else {
      addToast({
        radius: 'lg',
        description: '註冊成功！',
        color: 'success',
        timeout: 10000,
      })
      onOpenChange(false)
      // 將 auth 的 role 更改
      beginBrand()
    }
  }

  const prompt = <div className="text-red-500 text-16">* 為必填欄位</div>
  // 必填:name email info logo type
  const formBody = (
    <ScrollShadow className=" w-full max-h-[300px]">
      <Form
        onSubmit={mySubmit}
        ref={formRef}
        validationBehavior="native"
        className='className="w-full h-full flex-row gap-5  flex  justify-between items-center"'
      >
        <div className="w-1/2 h-full  ">
          <BPlayerJoinUsFiles
            {...{ logoImg, setLogoImg, errorMessage, errorMsg }}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <Input name="user_id" className="hidden" value={user_id}></Input>
          <Input
            isRequired
            label="品牌名稱"
            variant="underlined"
            type="text"
            name="bd_name"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          ></Input>
          <div className="text-red ">{errorMsg.bd_name}</div>
          <Input
            isRequired
            label="品牌email"
            variant="underlined"
            name="bd_email"
            validate={(value) => {
              const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              if (!regex.test(value)) {
                return '請輸入有效的 Email 格式'
              }
            }}
            type="text"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          ></Input>
          <div className="text-red ">{errorMsg.bd_email}</div>
          <Textarea
            radius="none"
            name="bd_info"
            isRequired
            variant="bordered"
            className="w-full focus:text-white  group-data-[focus=true]:text-white"
            label="品牌資訊"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          />
          <div className="text-red ">{errorMsg.bd_info}</div>
          <Input
            label="聯絡電話"
            variant="underlined"
            type="text"
            validate={(value) => {
              // 選填欄位所以如果沒有填寫則跳過驗證
              if (!value) return
              const regex = /^(02|09)(-?\d{4})(-?\d{4})$/
              if (!regex.test(value)) {
                return '請輸入正確的電話號碼( 02 / 09 開頭)'
              }
            }}
            name="bd_tel"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          ></Input>
          <div className="text-red ">{errorMsg.bd_tel}</div>
          <Input
            label="地址"
            variant="underlined"
            type="text"
            name="bd_address"
            validate={(value) => {
              if (!value) return
              const regex =
                /^(台|臺)北市(中正區|大同區|中山區|松山區|大安區|萬華區|信義區|士林區|北投區|內湖區|南港區|文山區).+/
              if (!regex.test(value)) return '地址限制於台北市'
            }}
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          ></Input>
          <div className="text-red ">{errorMsg.bd_address}</div>
          <Input
            label="網站URL"
            variant="underlined"
            type="text"
            name="bd_website"
            validate={(value) => {
              if (!value) return
              const regex = /^https?:\/\/([\w-]+\.)*example\.com/
              if (!regex.test(value)) return '無效的 URL'
            }}
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
              errorMessage: 'text-red-500',
            }}
          ></Input>
          <div className="text-red ">{errorMsg.bd_website}</div>
        </div>
      </Form>
    </ScrollShadow>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        onPress={() => {
          formRef.current.requestSubmit()
          if (!logoImg) setErrorMessage(true)
        }}
        href={'#'}
        className=" text-white flex justify-center items-center "
      >
        完成註冊
        <div>
          <HiArrowNarrowRight size={20} color="white" />
        </div>
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout
        {...{
          footer,
          prompt,
          isOpen,
          onOpenChange,
          formBody,
          tips,
          title,
          size: true,
        }}
      />
    </>
  )
}
