'use client'

import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  DateRangePicker,
  Select,
  SelectItem,
  CheckboxGroup,
  Textarea,
} from '@heroui/react'
import { CustomCheckbox } from './custom-checkbox'

export default function CoMiddleForm(props) {
  const [groupSelected, setGroupSelected] = React.useState([])
  return (
    <>
      <Form className="flex flex-row gap-16">
        {/* left */}
        <div className="w-6/12 px-3 py-6 flex gap-8 flex-col">
          <div className="text-red-500 text-2xl font-semibold ">* 為必填</div>
          <div>
            <Input
              label="展覽名稱"
              labelPlacement="outside"
              type="text"
              size="lg"
              color="warning"
              isRequired
              variant="underlined"
              className="w-full "
              classNames={{
                label: 'after:text-red',
                inputWrapper: 'border-black',
              }}
            />
          </div>
          <div>
            <DateRangePicker
              size="lg"
              label="展覽日期"
              radius="full"
              isRequired
              classNames={{
                inputWrapper: 'bg-white border-1 border-black shadow-none ',
                label: 'text-black group-data-[required=true]:after:text-red',
              }}
            />
          </div>
          <div className="w-6/12 ">
            <Select
              aria-label="status"
              size="lg"
              label="展覽狀態"
              isRequired
              variant="underlined"
              placeholder="請選擇展覽目前狀態"
              classNames={{
                label: 'after:text-red group-data-[filled=true]:text-black ',
                value: 'text-black',
                trigger: 'border-black',
              }}
            ></Select>
          </div>
          <div className="w-6/12 ">
            <Select
              aria-label="place"
              size="lg"
              label="展覽地點"
              isRequired
              variant="underlined"
              placeholder="請選擇行政區"
              classNames={{
                label: 'after:text-red group-data-[filled=true]:text-black ',
                value: 'text-black',
                trigger: 'border-black',
              }}
              className="mb-3"
            ></Select>
            <Select
              size="lg"
              isRequired
              aria-label="place2"
              variant="underlined"
              placeholder="請選擇地點"
              classNames={{
                label: 'after:text-red group-data-[filled=true]:text-black ',
                value: 'text-black',
                trigger: 'border-black',
              }}
            ></Select>
          </div>
          <div className="w-3/12">
            <Input
              size="lg"
              label="價格"
              placeholder="金額"
              radius="full"
              className="w-full h-7"
              labelPlacement="outside"
              classNames={{
                label: 'text-black',
                inputWrapper: 'bg-white border-1 border-black ',
                input: 'border-black ',
              }}
            />
          </div>
        </div>
        {/* right */}
        <div className="w-6/12 h-full flex flex-col gap-8">
          <Textarea
            label="展覽摘要"
            size="lg"
            labelPlacement="outside"
            minRows={5}
            classNames={{
              inputWrapper: 'bg-white border-1 border-black',
              label: 'text-black',
            }}
          />
          <Textarea
            label="展覽詳細描述"
            labelPlacement="outside"
            size="lg"
            minRows={8}
            classNames={{
              inputWrapper: 'bg-white border-1 border-black',
              label: 'text-black text-16',
            }}
          />
          <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
              className="gap-1"
              label="展覽類型"
              isRequired
              classNames={{ label: 'text-black after:text-red' }}
              orientation="horizontal"
              value={groupSelected}
              onChange={setGroupSelected}
            >
              <CustomCheckbox value="視覺藝術">視覺藝術</CustomCheckbox>
              <CustomCheckbox value="當代藝術">當代藝術</CustomCheckbox>
              <CustomCheckbox value="藝術與科技">藝術與科技</CustomCheckbox>
              <CustomCheckbox value="歷史藝術">歷史藝術</CustomCheckbox>
              <CustomCheckbox value="社會與政治藝術">
                社會與政治藝術
              </CustomCheckbox>
              <CustomCheckbox value="藝術與文化">藝術與文化</CustomCheckbox>
              <CustomCheckbox value="藝術裝置與展覽設計">
                藝術裝置與展覽設計
              </CustomCheckbox>
              <CustomCheckbox value="交互式藝術">交互式藝術</CustomCheckbox>
            </CheckboxGroup>
          </div>
        </div>
      </Form>
    </>
  )
}
