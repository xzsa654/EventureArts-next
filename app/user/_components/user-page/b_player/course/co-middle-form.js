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
import { CustomCheckbox } from '../custom-checkbox'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function CoMiddleForm(props) {
  const [groupSelected, setGroupSelected] = React.useState([])
  return (
    <>
      <Form className="flex flex-row max-sm:flex-col max-sm:gap-8 gap-16">
        {/* left */}
        <div className="w-6/12 max-sm:w-full px-3 py-6 flex gap-8 flex-col">
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
          <div className="w-6/12 max-sm:w-full ">
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
          <div className="w-6/12 max-sm:w-full ">
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
          <div className="w-3/12 max-sm:w-4/12">
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

        <div className="w-6/12 h-full flex flex-col  max-sm:w-full    gap-8 text-16">
          產品價值點
          {/* PC */}
          <div className="max-sm:hidden  flex flex-col gap-8 text-16">
            <div className="  max-sm:py-6 flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md max-sm:w-full ">
              <Textarea
                label="標題"
                size="lg"
                labelPlacement="outside-left"
                minRows={1}
                className="w-2/3 max-sm:w-full"
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
                className="w-2/3 max-sm:w-full"
                classNames={{
                  inputWrapper: 'bg-white border-1 border-black',
                  label: 'text-black',
                }}
              />
            </div>
            <div className=" max-sm:py-6 flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md max-sm:w-full ">
              <Textarea
                label="標題"
                size="lg"
                labelPlacement="outside-left"
                minRows={1}
                className="w-2/3 max-sm:w-full"
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
                className="w-2/3 max-sm:w-full"
                classNames={{
                  inputWrapper: 'bg-white border-1 border-black',
                  label: 'text-black',
                }}
              />
            </div>
            <div className=" max-sm:py-6 flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md max-sm:w-full ">
              <Textarea
                label="標題"
                size="lg"
                labelPlacement="outside-left"
                minRows={1}
                className="w-2/3 max-sm:w-full"
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
                className="w-2/3 max-sm:w-full"
                classNames={{
                  inputWrapper: 'bg-white border-1 border-black',
                  label: 'text-black',
                }}
              />
            </div>
          </div>
          {/* 手機版 */}
          <div className="max-sm:flex-row text-16 flex max-sm:my-4 md:hidden   ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
              slidesPerView={1.2}
            >
              <SwiperSlide>
                <div className="max-sm:py-6 flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md max-sm:w-full ">
                  <Textarea
                    label="標題"
                    size="lg"
                    labelPlacement="outside-left"
                    minRows={1}
                    className="w-2/3 max-sm:w-full"
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
                    className="w-2/3 max-sm:w-full"
                    classNames={{
                      inputWrapper: 'bg-white border-1 border-black',
                      label: 'text-black',
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" max-sm:py-6 flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md max-sm:w-full ">
                  <Textarea
                    label="標題"
                    size="lg"
                    labelPlacement="outside-left"
                    minRows={1}
                    className="w-2/3 max-sm:w-full"
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
                    className="w-2/3 max-sm:w-full"
                    classNames={{
                      inputWrapper: 'bg-white border-1 border-black',
                      label: 'text-black',
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" max-sm:py-6 max-sm:w-full flex justify-center max-sm:flex-col gap-4 max-sm:border-1 max-sm:border-black max-sm:p-2 max-sm:rounded-md  ">
                  <Textarea
                    label="標題"
                    size="lg"
                    labelPlacement="outside-left"
                    minRows={1}
                    className="w-2/3 max-sm:w-full"
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
                    className="w-2/3 max-sm:w-full"
                    classNames={{
                      inputWrapper: 'bg-white border-1 border-black',
                      label: 'text-black',
                    }}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
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
