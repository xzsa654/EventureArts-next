'use client'

import React, { useState, useEffect } from 'react'
import ModalLayout from '@/components/common/login/layout'
import CPlayerEditSelect from './edit-select'
import {
  Form,
  Input,
  ScrollShadow,
  Textarea,
  Button,
  Chip,
  DatePicker,
  Select,
  SelectItem,
  Link,
} from '@heroui/react'
import { CheckIcon } from '@/public/Yao/icons'

import { HiArrowNarrowRight } from 'react-icons/hi'

export default function EditModal({ data, isOpen, onOpenChange = () => {} }) {
  const gender = [
    { label: '男性', key: 'male' },
    { label: '女性', key: 'female' },
    { label: '不願透漏', key: 'not provided' },
  ]
  const title = '成為品牌'
  const tips = '成為品牌'

  const prompt = <div className="text-red text-16">* 為必填欄位</div>
  // 必填:name email info logo type
  const formBody = (
    <ScrollShadow className=" w-full max-h-[300px]">
      <Form className='className="w-full h-full flex-row gap-10  flex  justify-between items-center"'>
        <div className="w-1/2 h-full flex flex-col gap-4">
          <Input
            isRequired
            label="真實姓名"
            variant="underlined"
            type="text"
            className="w-full"
            defaultValue={data.user_name}
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>
          <Input
            isRequired
            label="手機號碼"
            variant="underlined"
            type="text"
            className="w-full"
            defaultValue={data.mobile}
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>
          <Input
            label="暱稱"
            variant="underlined"
            type="text"
            className="w-full"
            defaultValue={data.nickname}
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white after:text-red-500',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          ></Input>
          <Select
            className="w-full"
            label="性別"
            placeholder="請選擇性別"
            name="gender"
            defaultSelectedKeys={[data.gender]}
            variant={'underlined'}
            classNames={{
              base: 'w-full',
              trigger: 'min-h-12 py-2 ',
              label: 'group-data-[filled=true]:text-white',
              value:
                'text-white text-tiny group-data-[has-value=true]:text-white',
              selectorIcon: 'text-white text-tiny',
            }}
          >
            {gender.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/2 flex flex-col gap-3 pe-10">
          <DatePicker
            showMonthAndYearPickers
            label="生日"
            color="danger"
            defaultValue={data.birthday}
            variant="underlined"
            classNames={{
              base: 'w-full pb-2',
              wrapper:
                '-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[380px] overflow-x-scroll',
            }}
            name="birthday"
          />

          <Textarea
            radius="none"
            name="profile"
            variant="bordered"
            className="max-w-xs focus:text-white  group-data-[focus=true]:text-white"
            label="個人簡介"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
            }}
          />
          <CPlayerEditSelect
            prev_c_interest={data.c_interest}
            prev_e_interest={data.e_interest
              ?.replace(/\s*\([^)]*\)/g, '')
              .split(',')}
          />
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
