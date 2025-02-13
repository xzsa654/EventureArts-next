'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Select, Chip, SelectItem } from '@heroui/react'
import { ArrowRight, CheckIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import RegisterSection from './section'
const testData = [
  { test: 'draw', id: 1 },
  { test: 'painting', id: 2 },
  { test: 'swim', id: 3 },
]

export default function RegisterStep4(props) {
  const { register4, switchToModal } = useModal()
  const { isOpen, onOpenChange } = register4
  const tips = '註冊帳號(4/4)'

  const title = '興趣列表'

  const section = (
    <RegisterSection test={{ second: 'complete', third: 'now' }} />
  )

  const formBody = (
    <div className="flex flex-col gap-[20]">
      <Select
        classNames={{
          base: 'max-w-xs',
          trigger: 'min-h-12 py-2 ',
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
      <ModalLayout
        {...{ formBody, footer, tips, title, section, isOpen, onOpenChange }}
      />
    </>
  )
}
