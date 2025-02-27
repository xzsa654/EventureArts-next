'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Input, Button } from '@heroui/react'
import { IoClose } from 'react-icons/io5'

export default function UploadsCard({ close = false }) {
  return (
    <div className=" relative max-sm:py-6 max-sm:pl-1 max-sm:gap-6 max-sm:flex-col max-sm:items-start max-sm:justify-between p-8 flex gap-5 w-full border-1 border-black justify-center items-center rounded-lg ">
      {close ? (
        <Button
          className=" absolute top-1  right-2"
          isIconOnly
          aria-label="Close"
          color="primary"
          variant="faded"
          size="sm"
          radius="sm"
        >
          <IoClose />
        </Button>
      ) : (
        ''
      )}
      <Input type="file" className="w-1/4  "></Input>
      <Input
        label="作品名稱"
        labelPlacement="outside-left"
        type="text"
        size="lg"
        color="warning"
        isRequired
        placeholder="上限20字"
        variant="bordered"
        className="w-2/6 max-sm:w-full max-sm:flex-auto "
        classNames={{
          base: 'justify-start data-[has-label=true]:mt-0',
          label: 'after:text-red text-red',
          inputWrapper: 'border-black',
        }}
      />
      <div className="w-1/2 max-sm:w-full">
        <Textarea
          label="作品敘述"
          labelPlacement="outside-left"
          size="lg"
          className="max-sm:flex-auto"
          placeholder="上限50字"
          minRows={3}
          classNames={{
            inputWrapper: 'bg-white border-1 border-black',
            label: 'text-black',
          }}
        />
      </div>
    </div>
  )
}
