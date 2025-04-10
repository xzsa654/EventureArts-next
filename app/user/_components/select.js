'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectItem, Button } from '@heroui/react'
export default function UserPageSelect({ type }) {
  return (
    <>
      <div className="flex justify-between w-full sm:justify-start ">
        <Select
          aria-label="請選擇"
          className="w-48 "
          variant="underlined"
          size="sm"
          defaultSelectedKeys={['由新到舊排列']}
        >
          <SelectItem key={'由新到舊排列'}>收藏時間由新到舊排列</SelectItem>
          <SelectItem key={'由舊到新排列'}>由舊到新排列</SelectItem>
        </Select>
      </div>
    </>
  )
}
