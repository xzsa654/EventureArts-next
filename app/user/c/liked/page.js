'use client'

import React from 'react'
import UserPageFrame from '../../_components/user-page/frame'
import UserPageCard from '../../_components/user-page/card'
import { Button } from '@heroui/react'
import { Tabs, Tab } from '@heroui/tabs'

export default function UserPage() {
  return (
    <>
      <UserPageFrame title="LIKED EVENTS">
        <div className="flex flex-col bg-blue-100 py-8">
          <Button>課程｜已收藏</Button>
          <Button>展覽｜已收藏</Button>

          <div className=" w-full p-6 flex justify-between bg-slate-300 border-y-1 border-black">
            <UserPageCard />
            <UserPageCard />
            <UserPageCard />
          </div>
        </div>
      </UserPageFrame>
    </>
  )
}
