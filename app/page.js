'use client'

import React, { useState, useEffect } from 'react'
import AVatarGroup from '@/components/common/avatar-group'
import OurPagination from '@/components/common/pagination'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from '@heroui/react'

export default function AppPage(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="mt-[160]">
        <OurPagination />
      </div>
      <div className="my-[160]">
        <AVatarGroup />
      </div>
      <div className="w-full flex flex-col gap-4">
        <Popover
          onOpenChange={(open) => setIsOpen(open)}
          placement="right"
          classNames={{
            trigger: 'type:text',
          }}
        >
          <PopoverTrigger>
            <Input type="text" className="w-36" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
