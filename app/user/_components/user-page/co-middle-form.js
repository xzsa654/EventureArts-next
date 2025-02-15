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

export default function ExMiddleForm(props) {
  const [groupSelected, setGroupSelected] = React.useState([])
  return (
    <>
      <Form className="flex flex-row gap-16">
        {/* left */}
        <div className="w-6/12 px-3 py-6 flex gap-8 flex-col">
          <div className="text-red-500 text-2xl font-semibold ">* 為必填</div>
          <div>
            <Input
              label="課程名稱"
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
              label="課程日期"
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
              label="課程狀態"
              isRequired
              variant="underlined"
              placeholder="請選擇課程目前狀態"
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
              label="課程地點"
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
        <div className="w-6/12 h-full flex flex-col  gap-8 text-16">
          <div className="flex justify-center gap-4 ">
            <Textarea
              label="標題"
              size="lg"
              labelPlacement="outside-left"
              minRows={1}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
            <Textarea
              label="敘述"
              size="lg"
              labelPlacement="outside-left"
              minRows={3}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
          </div>
          <div className="flex justify-center gap-4 ">
            <Textarea
              label="標題"
              size="lg"
              labelPlacement="outside-left"
              minRows={1}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
            <Textarea
              label="敘述"
              size="lg"
              labelPlacement="outside-left"
              minRows={3}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
          </div>
          <div className="flex justify-center gap-4 ">
            <Textarea
              label="標題"
              size="lg"
              labelPlacement="outside-left"
              minRows={1}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
            <Textarea
              label="敘述"
              size="lg"
              labelPlacement="outside-left"
              minRows={3}
              className="w-2/3"
              classNames={{
                inputWrapper: 'bg-white border-1 border-black',
                label: 'text-black',
              }}
            />
          </div>

          <Textarea
            label="課程簡介"
            labelPlacement="outside"
            size="lg"
            minRows={4}
            classNames={{
              inputWrapper: 'bg-white border-1 border-black',
              label: 'text-black text-16',
            }}
          />
          <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
              className="gap-1"
              label="課程類型"
              isRequired
              classNames={{ label: 'text-black after:text-red' }}
              orientation="horizontal"
              value={groupSelected}
              onChange={setGroupSelected}
            >
              <CustomCheckbox value="花藝植栽">花藝植栽</CustomCheckbox>
              <CustomCheckbox value="縫紉布藝">縫紉布藝 </CustomCheckbox>
              <CustomCheckbox value="食尚餐飲">食尚餐飲</CustomCheckbox>
              <CustomCheckbox value="運動健身">運動健身</CustomCheckbox>
              <CustomCheckbox value="音樂舞蹈">音樂舞蹈</CustomCheckbox>
              <CustomCheckbox value="講座分享">講座分享</CustomCheckbox>
              <CustomCheckbox value="戶外踏青">戶外踏青</CustomCheckbox>
              <CustomCheckbox value="身心靈">身心靈</CustomCheckbox>
            </CheckboxGroup>
          </div>
        </div>
      </Form>
    </>
  )
}
