'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Select, Chip, SelectItem } from '@heroui/react'
import {
  ArrowRight,
  StatusIcon,
  CheckIcon,
  BracketsIcon,
} from '@/public/user/icons'

const testData = [
  { test: 'draw', id: 1 },
  { test: 'painting', id: 2 },
  { test: 'swim', id: 3 },
]

export default function RegisterStep4(props) {
  const tips = '註冊帳號(4/4)'

  const title = '興趣列表'

  const section = (
    <div className="flex items-center gap-1  w-full">
      {/* 左侧项目 */}
      <div className="flex items-center ">
        <div className="flex flex-col ">
          <StatusIcon color="#91D9CE" />
          <div className="text-green-300 h-[36px] ">基本資料</div>
        </div>
      </div>

      {/* 中间项目 */}
      <div className="flex items-center">
        <div className="flex flex-col ">
          <StatusIcon color="#91D9CE" />
          <div className="text-green-300 h-[36px]">大頭貼</div>
        </div>
      </div>

      {/* 右邊项目 */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <BracketsIcon color="#FFC45C" />
          <div className="text-yellow w-full h-[36px]">興趣列表</div>
        </div>
      </div>
    </div>
  )

  const formBody = (
    <div className="flex flex-col gap-[20]">
      <Select
        classNames={{
          base: 'max-w-xs',
          trigger: 'min-h-12 py-2',
          label: 'group-data-[filled=true]:text-white',
          value: 'text-white text-tiny',
          selectorIcon: 'text-white text-tiny',
        }}
        items={testData}
        isMultiline={true}
        label="課程類型"
        labelPlacement="outside"
        placeholder="請挑選感興趣的課程分類"
        selectionMode="multiple"
        variant="bordered"
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip
                  color="primary"
                  radius="large"
                  key={item.key}
                  startContent=<CheckIcon />
                >
                  {item.data.test}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(testData) => (
          <SelectItem key={testData.id} textValue={testData.test}>
            <span className="text-small">{testData.test}</span>
          </SelectItem>
        )}
      </Select>
      <Select
        classNames={{
          base: 'max-w-xs',
          trigger: 'min-h-12 py-2',
          label: 'group-data-[filled=true]:text-white',
          value: 'text-white',
          selectorIcon: 'text-white',
        }}
        items={testData}
        isMultiline={true}
        label="展覽類型"
        labelPlacement="outside"
        defaultSelectedKeys={''}
        selectedKeys={''}
        placeholder="請挑選感興趣的展覽分類"
        selectionMode="multiple"
        variant="bordered"
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip
                  color="primary"
                  radius="large"
                  key={item.key}
                  startContent=<CheckIcon />
                >
                  {item.data.test}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(testData) => (
          <SelectItem key={testData.id} textValue={testData.test}>
            <span className="text-small">{testData.test}</span>
          </SelectItem>
        )}
      </Select>
    </div>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link href={'#'} className=" flex justify-center items-center ">
        完成註冊
        <div className="">
          <ArrowRight />
        </div>
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout {...{ formBody, footer, tips, title, section }} />
    </>
  )
}
