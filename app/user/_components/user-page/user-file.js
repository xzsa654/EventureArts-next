'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@heroui/react'
import UploadsCard from './uploads-card'

export default function UserFile({ online }) {
  const offlineVersion = (
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
  )
  const onlineVersion = (
    <>
      <UploadsCard /> <UploadsCard close={'need'} />
    </>
  )
  // 線上版的上傳區
  const onlineData = {
    title: 'Add new Online Exhibition',
    tips: '限制(JPG/最少8張最多15張/各檔案最大1mb 放3個模板)',
    content: onlineVersion,
  }
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="w-full text-16 ">
          上傳專區
          <span className="ml-2 text-14 text-red">
            {online ? onlineData.tips : '限制(JPG/最多5張/各檔案最大1mb)'}
          </span>
        </div>
        {online ? onlineData.content : offlineVersion}
      </div>
    </>
  )
}
