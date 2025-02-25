'use client'

import React, { useState, useEffect, useRef } from 'react'
import ModalLayout from '@/components/common/login/layout'
import CPlayerEditSelect from './edit-select'
import { UPDATED } from '@/lib/user-api'
import { useAuth } from '@/hooks/use-auth'
import {
  Form,
  Input,
  ScrollShadow,
  Textarea,
  DatePicker,
  Select,
  SelectItem,
  Link,
  addToast,
} from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { HiArrowNarrowRight } from 'react-icons/hi'

export default function EditModal({
  data,
  isOpen,
  onOpenChange = () => {},
  onReSend = () => {},
}) {
  const { getAuthHeader } = useAuth()
  const gender = [
    { label: '男性', key: 'male' },
    { label: '女性', key: 'female' },
    { label: '不願透漏', key: 'not provided' },
  ]
  const [birthday, setBirthday] = useState()
  // 取完資料了在進行解碼
  useEffect(() => {
    if (data.birthday) {
      setBirthday(parseDate(data.birthday))
    }
  }, [data])
  const [e_interest, setEInterest] = useState([])
  const [c_interest, setCInterest] = useState([])
  const title = '編輯資料'
  const tips = '會員編輯'
  const formRef = useRef()

  // 將傳回的興趣做成作為陣列
  const liked = (e, c) => {
    setCInterest(Array.from(c))
    setEInterest(Array.from(e))
  }
  // 處理表單
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    data.set('e_interest', e_interest)
    data.set('c_interest', c_interest)
    const r = await fetch(UPDATED, {
      method: 'put',
      body: data,
      headers: { ...getAuthHeader() },
    })
    const res = await r.json()

    if (res.success) {
      addToast({
        radius: 'lg',
        title: '編輯成功',
        description: res.message,
        color: 'success',
        timeout: 5000,
      })
      onReSend(true)
      onOpenChange(false)
    } else {
      addToast({
        radius: 'lg',
        title: '編輯失敗',
        description: res.message,
        color: 'warning',
        timeout: 5000,
      })
    }
  }
  const prompt = <div className="text-red text-16">* 為必填欄位</div>
  const formBody = (
    <ScrollShadow className=" w-full max-h-[300px]">
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        className='className="w-full h-full flex-row gap-10  flex  justify-between items-center"'
      >
        <div className="w-1/2 h-full flex flex-col gap-4">
          <Input className="hidden" name="user_id" value={data.user_id}></Input>
          <Input
            isRequired
            label="真實姓名"
            variant="underlined"
            name="user_name"
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
            name="mobile"
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
            name="nickname"
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
            defaultValue={birthday}
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
            defaultValue={data.profile}
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
            prev_e_interest={data.e_interest}
            liked={liked}
          />
        </div>
      </Form>
    </ScrollShadow>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        href={'#'}
        onPress={() => {
          formRef.current.requestSubmit()
        }}
        className=" text-white flex justify-center items-center "
      >
        完成編輯
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
