'use client'

import React, { useState, useEffect } from 'react'
import ModalLayout from '@/components/common/login/layout'
import {
  useDisclosure,
  Form,
  Input,
  ScrollShadow,
  Textarea,
  Button,
  Select,
  SelectItem,
  Link,
} from '@heroui/react'
import { PiUploadSimple } from 'react-icons/pi'
import { HiArrowNarrowRight } from 'react-icons/hi'

export default function ComponentsJoinUsModal(props) {
  const title = '成為品牌'
  const tips = '成為品牌'
  const { isOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    onOpenChange()
  }, [])
  const prompt = <div className="text-yellow text-16">* 為必填欄位</div>
  // 必填:name email info logo type
  const formBody = (
    <ScrollShadow className=" w-full max-h-[300px]">
      <Form className='className="w-full h-full flex-row gap-5  flex  justify-between items-center"'>
        <div className="w-1/2 h-full  ">
          <div className="text-16 text-yellow mb-3">
            ‼️限制(JPG/各檔案最大1mb )
          </div>
          <div className='mb-2 text-white after:content-["*"] after:text-red '>
            品牌LOGO
          </div>
          <div className=" w-full h-1/2 flex items-center gap-5  ">
            <div className=" w-[100px] flex justify-center items-center aspect-square ">
              <Button isIconOnly className="w-full h-full" radius="none">
                <PiUploadSimple size={20} />
                上傳照片
              </Button>
            </div>
          </div>
          <div className="text-white my-4">品牌圖片</div>
          <div className=" w-full h-[100px]">
            <Button radius="none" isIconOnly className="h-full w-full">
              <PiUploadSimple size={20} />
              上傳照片
            </Button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <Input name="member_id" className="hidden"></Input>
          <Input
            isRequired
            label="品牌名稱"
            variant="underlined"
            type="text"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>

          <Input
            isRequired
            label="品牌email"
            variant="underlined"
            type="email"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>

          <Textarea
            radius="none"
            isRequired
            name="profile"
            variant="bordered"
            className="max-w-full focus:text-white  group-data-[focus=true]:text-white"
            label="品牌資訊"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          />

          <Select
            isRequired
            label="品牌類型"
            variant="underlined"
            className="w-full"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          >
            <SelectItem value={'exhibition'}>展覽</SelectItem>
            <SelectItem value={'course'}>課程</SelectItem>
          </Select>

          <Input
            label="聯絡電話"
            variant="underlined"
            type="text"
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
        href={'#'}
        className=" text-white flex justify-center items-center "
      >
        完成註冊
        <div className="">
          <HiArrowNarrowRight size={20} color="white" />
        </div>
      </Link>
    </div>
  )
  return (
    <>
      <div>Components JoinUsModal</div>

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
