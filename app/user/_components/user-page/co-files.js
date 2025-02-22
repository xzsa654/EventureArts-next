'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input, Image } from '@heroui/react'
export default function CoUserFile() {
  const files = useRef()
  return (
    <div className="w-1/2 max-sm:w-full max-sm:mt-3 max-sm:p-1  p-5 max-sm:gap-1 gap-2 flex max-sm:justify-between border border-black rounded-md ">
      <div className="w-1/5  flex flex-col gap-2 items-center   ">
        <div className="h-2/3 flex items-center">
          <button
            className="text-16 max-sm:text-12"
            onClick={() => files.current.click()}
          >
            選擇檔案 |
          </button>
          <Input
            ref={files}
            type="file"
            multiple
            accept="image/jpeg"
            size="lg"
            className="hidden"
            radius="none"
            classNames={{
              label: 'after:text-red',
              inputWrapper: 'border-1 ',
            }}
          />
        </div>
        <div className="border flex flex-col items-center max-sm:w-full p-2 w-2/3 bg-zinc rounded-md gap-3">
          <Image
            alt="small-icon-1"
            src="/chu-images/img_5.jpg"
            className=" rounded-sm cursor-pointer "
            width={50}
          />
          <Image
            alt="small-icon-1"
            src="/chu-images/img_9.jpg"
            className=" rounded-sm cursor-pointer "
            width={50}
          />
          <Image
            alt="small-icon-1"
            src="/chu-images/img_15.jpg"
            className=" rounded-sm cursor-pointer"
            width={50}
          />
          <Image
            alt="small-icon-1"
            src="/chu-images/img_17.jpg"
            className=" rounded-sm cursor-pointer"
            width={50}
          />
        </div>
      </div>

      <Image
        src="/chu-images/img_5.jpg"
        alt="main"
        className=" max-sm:justify-end flex "
        radius="none"
      ></Image>
    </div>
  )
}
