'use client'

import React, { useState, useEffect, useRef } from 'react'
import ModalLayout from '@/components/common/login/layout'
import {
  useDisclosure,
  Form,
  Input,
  ScrollShadow,
  Textarea,
  Select,
  SelectItem,
  Link,
} from '@heroui/react'
import BPlayerJoinUsFiles from './join-us-files'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { useAuth } from '@/hooks/use-auth'
import { ADDBRAND } from '@/lib/brands-api'

export default function JoinUsModal(props) {
  const [logoImg, setLogoImg] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const formRef = useRef()
  const { getAuthHeader, auth } = useAuth()
  const { user_id } = auth
  const title = '成為品牌'
  const tips = '成為品牌'
  const { isOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    onOpenChange()
  }, [])

  const mySubmit = async (e) => {
    e.preventDefault()
    const fm = new FormData(e.target)
    // console.log(Object.fromEntries(fm))

    const r = await fetch(ADDBRAND, {
      method: 'POST',
      body: fm,
      headers: {
        ...getAuthHeader(),
      },
    })
    const res = await r.json()
    console.log(res)
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
          <BPlayerJoinUsFiles {...{ logoImg, setLogoImg, errorMessage }} />
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

          <Textarea
            radius="none"
            name="bd_info"
            variant="bordered"
            className="w-full focus:text-white  group-data-[focus=true]:text-white"
            label="品牌資訊"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          />

          <Input
            label="聯絡電話"
            variant="underlined"
            type="text"
            name="bd_tel"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>

          <Input
            label="地址"
            variant="underlined"
            type="text"
            name="bd_address"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>

          <Input
            label="網站URL"
            variant="underlined"
            type="text"
            name="bd_website"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>
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
