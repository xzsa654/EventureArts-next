'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectItem } from '@heroui/react'
export default function UserPageSelect(props) {
  return (
    <>
      <div className="flex justify-end">
        <Select
          className="w-48"
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
