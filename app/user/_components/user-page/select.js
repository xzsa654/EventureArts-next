'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectItem, Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
export default function UserPageSelect({ type }) {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between w-full sm:justify-end ">
        <Button
          size="sm"
          onPress={() => {
            if (type == 'course') {
              return router.push('/user/b/co-mang/add')
            } else {
              return router.push('/user/b/ex-mang/add-off')
            }
          }}
          color="primary"
          radius="none"
          className="text-16 text-white max-sm:w-1/3 max-sm:text-12 sm:hidden block "
        >
          {type == 'course' ? '新增課程' : '新增線上展覽'}
        </Button>

        <Select
          aria-label="請選擇"
          className="w-48 "
          variant="underlined"
          size="sm"
          // 開啟必須添加這行
          aria-label="select"
          defaultSelectedKeys={['由新到舊排列']}
        >
          <SelectItem key={'由新到舊排列'}>收藏時間由新到舊排列</SelectItem>
          <SelectItem key={'由舊到新排列'}>由舊到新排列</SelectItem>
        </Select>
      </div>
    </>
  )
}
