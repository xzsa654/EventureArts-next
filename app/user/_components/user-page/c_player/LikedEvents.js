'use client'

import React from 'react'

import UserPageCard from './card'
import UserPageSelect from '../select'
import OurPagination from '@/components/common/pagination'
import { Tabs, Tab } from '@heroui/tabs'

export default function LikedEvents() {
  return (
    <>
      <UserPageSelect />
      <div className="flex flex-col border-t-5 border-black ">
        {/* 細橫線 */}
        <div className="border-b-[1px] border-black w-full mt-2 "></div>

        {/* 使用 Tabs 來取代 Button */}

        <Tabs
          size="lg"
          aria-label="收藏的內容"
          classNames={{
            tabList: ' gap-96 w-full relative rounded-none p-0 justify-center',
            cursor: 'w-full bg-[#D6AA4D] ease-in-out ',
            tab: 'max-w-fit px-6 h-8 font-serif',
            tabContent:
              'group-data-[selected=true]:text-yellow-600 text-16 ease-in-out ',
          }}
          variant="underlined"
        >
          {/* 課程收藏 Tab */}
          <Tab
            key="likedCourses"
            title="課程｜已收藏"
            className="flex items-center space-x-2 "
          >
            <div className="w-full py-4 flex justify-evenly  border-y-1 border-black">
              <UserPageCard />
              <UserPageCard />
              <UserPageCard />
            </div>
          </Tab>

          {/* 展覽收藏 Tab */}
          <Tab
            key="likedExhibits"
            title="展覽｜已收藏"
            className="flex items-center space-x-2"
          >
            <div className="w-full py-4 flex justify-evenly  border-y-1 border-black">
              <UserPageCard />
              <UserPageCard />
            </div>
          </Tab>
        </Tabs>
        <div className="flex justify-center">
          <OurPagination />
        </div>
      </div>
    </>
  )
}
