'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import UserPageSelect from '../../_components/select'
import OurPagination from '@/components/common/pagination'
import ExMangContent from './ex-content'
import { HiArrowNarrowRight } from 'react-icons/hi'

import { useRouter } from 'next/navigation'
export default function ExMangPage(props) {
  const router = useRouter()

  return (
    <>
      <UserPageSelect />
      <div className="flex-auto ">
        <ExMangContent />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center ">
        <OurPagination />
        <div className="flex gap-4">
          <Button
            size="lg"
            onPress={() => {
              return router.push('/user/b/ex-mang/add-on')
            }}
            color="primary"
            radius="none"
            className="text-16 text-white max-sm:hidden hover:scale-110 transition-transform duration-200"
            endContent=<HiArrowNarrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          >
            新增線上展覽
          </Button>
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-off')}
            color="primary"
            radius="none"
            className={` text-16 text-white hover:scale-110 transition-transform duration-200`}
            endContent=<HiArrowNarrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          >
            新增線下展覽
          </Button>
        </div>
      </div>
    </>
  )
}
