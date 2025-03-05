'use client'

import React, { useState, useEffect } from 'react'
import { Select, Chip, SelectItem } from '@heroui/react'
import { CheckIcon } from '@/public/Yao/icons'
import { ALLOPTIONS } from '@/lib/authorization-api'
export default function CPlayerEditSelect({
  prev_c_interest,
  liked = () => {},
  prev_e_interest,
}) {
  prev_c_interest = prev_c_interest?.split(',')
  prev_e_interest = prev_e_interest?.split(',')

  // 控制選項的狀態
  const [options, setOptions] = useState([])

  // 選中的狀態
  const [c_interest, setCInterest] = useState(['1', '2'])

  const [e_interest, setEInterest] = useState([])

  // 1. 取得options
  useEffect(() => {
    fetch(ALLOPTIONS)
      .then((r) => r.json())
      .then((result) => {
        setOptions(result)
      })
  }, [])
  useEffect(() => {
    if (options.length) {
      // 將prev_c_interest 和 prev_e_interest 的值添加原本的 key
      const defaultSelectC = new Set(
        options[1]?.course
          .filter((v) => {
            if (prev_c_interest.indexOf(v.c_optionName) !== -1) {
              return v
            }
          })
          .map((i) => i.c_optionID.toString())
      )

      const defaultSelectE = new Set(
        options[0]?.exhibition
          .filter((v) => {
            if (prev_e_interest.indexOf(v.e_optionName) !== -1) {
              return v
            }
          })
          .map((i) => i.e_optionID.toString())
      )
      setEInterest(defaultSelectE)
      setCInterest(defaultSelectC)
    }
  }, [options])

  useEffect(() => {
    liked(e_interest, c_interest)
  }, [e_interest, c_interest])

  // 在資料載入前不渲染 Select 或顯示載入中狀態
  if (!options[1]?.course || !options[0]?.exhibition) {
    return null // 或顯示 loading
  }

  return (
    <>
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
        selectedKeys={c_interest}
        variant="bordered"
        onSelectionChange={(item) => {
          setCInterest(item)
        }}
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
        selectedKeys={e_interest}
        labelPlacement="outside"
        onSelectionChange={(item) => {
          setEInterest(item)
        }}
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
                  {item?.data.e_optionName?.split('(')[0]}
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
              {exhibition?.e_optionName?.split('(')[0]}
            </span>
          </SelectItem>
        )}
      </Select>
    </>
  )
}
