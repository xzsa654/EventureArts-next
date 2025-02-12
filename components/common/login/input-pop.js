'use client'

import React, { useState, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  useDisclosure,
  Alert,
} from '@heroui/react'
// 預設 pop 內容
const InitialPop = ({ popTitle, popContent }) => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <Alert
      className="w-full text-blue-400"
      isVisible={isVisible}
      title={popTitle}
      variant="faded"
    >
      <div>{popContent}</div>
    </Alert>
  )
}

export default function InputPop({
  label = '',
  className = '',
  isPop = true,
  type = '',
  name = '',
  popContent = '',
  popTitle = '',
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className={className}>
        <Input
          label={label}
          type={type}
          name={name}
          onClick={onOpen}
          variant="underlined"
          classNames={{
            label: 'text-white group-data-[focus=true]:text-white',
            input:
              'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
          }}
        />
        {isPop && (
          <Popover
            showArrow
            placement="bottom"
            isOpen={isOpen}
            classNames={{ content: 'px-0 py-0' }}
            onOpenChange={onOpenChange}
          >
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
            <PopoverContent>
              <InitialPop popTitle={popTitle} popContent={popContent} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}
