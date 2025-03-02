'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Select, Chip, SelectItem } from '@heroui/react'
import { CheckIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import { HiArrowNarrowRight } from 'react-icons/hi'
import RegisterSection from './section'
import { useAuth } from '@/hooks/use-auth'
import { ALLOPTIONS } from '@/lib/authorization-api'

export default function RegisterStep4(props) {
  const { register } = useAuth()
  // 控制選項的狀態
  const [options, setOptions] = useState([])
  // 選中的狀態
  const [c_interest, setCInterest] = useState([])
  const [e_interest, setEInterest] = useState([])
  const [shouldSend, setShouldSend] = useState(false)
  // 1. 取得options
  useEffect(() => {
    fetch(ALLOPTIONS)
      .then((r) => r.json())
      .then((result) => {
        setOptions(result)
      })
  }, [])
  useEffect(() => {
    if (shouldSend) register(c_interest, e_interest)
  }, [shouldSend])
  const { register4 } = useModal()
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
        items={options[1]?.course}
        isMultiline={true}
        label="課程類型"
        labelPlacement="outside"
        placeholder="請挑選感興趣的課程分類"
        selectionMode="multiple"
        variant="bordered"
        onSelectionChange={setCInterest}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip
                  color="primary"
                  radius="lg"
                  key={item?.data.c_optionID}
                  startContent=<CheckIcon />
                >
                  {item?.data.c_optionName}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(course) => (
          <SelectItem key={course.c_optionID} textValue={course.c_optionID}>
            <span className="text-small">{course.c_optionName}</span>
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
        items={options[0]?.exhibition}
        isMultiline={true}
        label="展覽類型"
        labelPlacement="outside"
        defaultSelectedKeys={''}
        onSelectionChange={setEInterest}
        placeholder="請挑選感興趣的展覽分類"
        selectionMode="multiple"
        variant="bordered"
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip
                  color="primary"
                  radius="lg"
                  key={item?.data.e_optionID}
                  startContent=<CheckIcon />
                >
                  {item?.data.e_optionName.split('(')[0]}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(exhibition) => (
          <SelectItem
            key={exhibition?.e_optionID}
            textValue={exhibition?.e_optionName}
          >
            <span className="text-small">
              {exhibition?.e_optionName.split('(')[0]}
            </span>
          </SelectItem>
        )}
      </Select>
    </div>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        onClick={() => {
          onOpenChange(false)
          setShouldSend(true)
        }}
        href={'#'}
        className=" flex justify-center items-center "
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
        {...{ formBody, footer, tips, title, section, isOpen, onOpenChange }}
      />
    </>
  )
}
