'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@heroui/react'
export default function UserFile(props) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="w-full text-16 ">
          上傳專區
          <span className="ml-2 text-14 text-red">
            限制(JPG/最多5張/各檔案最大1mb)
          </span>
        </div>
        <div>
          <Input
            type="file"
            multiple
            accept="image/jpeg"
            size="lg"
            radius="full"
            className=" w-2/6 mb-4"
            classNames={{
              label: 'after:text-red',
              inputWrapper: 'bg-white border-1 border-black ',
            }}
          />
          {/* Preview */}
          <div className="w-full p-56 border-1  rounded-md border-black"></div>
        </div>
      </div>
    </>
  )
}
