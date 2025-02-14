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
        <Button
          size="lg"
          onPress={() => router.push('/user/b/ex-add')}
          color="primary"
          className="text-16 text-white"
          endContent=<ArrowRight />
        >
          新增體驗課程
        </Button>
      </div>
    </>
  )
}
