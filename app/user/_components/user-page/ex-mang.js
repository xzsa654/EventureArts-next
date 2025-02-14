'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import UserPageSelect from './select'
import OurPagination from '@/components/common/pagination'
import { ArrowRight } from '@/public/Yao/icons'
import CourseMangContent from './ex-content'
import { useRouter } from 'next/navigation'
export default function CourseMang(props) {
  const router = useRouter()
  return (
    <>
      <UserPageSelect />
      <div className="flex-auto ">
        <CourseMangContent />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <OurPagination />
        <div className="flex gap-4">
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-off')}
            color="primary"
            radius="none"
            className="text-16 text-white"
            endContent=<ArrowRight />
          >
            新增線上展覽
          </Button>
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-on')}
            color="primary"
            radius="none"
            className="text-16 text-white"
            endContent=<ArrowRight />
          >
            新增線下展覽
          </Button>
        </div>
      </div>
    </>
  )
}
