'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input, Image } from '@heroui/react'
export default function CoUserFile() {
  const files = useRef()
  return (
    <div className="w-1/2  p-5 gap-2 flex border border-black rounded-md ">
      <div className="w-1/5  flex flex-col gap-2 items-center   ">
        <div className="h-2/3 flex items-center">
          <button className="text-16" onClick={() => files.current.click()}>
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
        <div className="border flex flex-col items-center p-2 w-2/3 bg-zinc rounded-md gap-3">
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
      <div className="w-4/5 ">
        <Image src="/chu-images/img_5.jpg" alt="main" radius="none"></Image>
      </div>
    </div>
  )
}
