'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardFooter, CardHeader, Image, Button } from '@heroui/react'
export default function ComponentsCard({ title, start, end, key }) {
  return (
    <Card
      isFooterBlurred
      className="w-9/12 h-[300px] mb-5 col-span-12 sm:col-span-5 mx-auto"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          {start}~{end}
        </p>
        <h4 className="text-black font-medium text-lg">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://heroui.com/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          查看主頁
        </Button>
      </CardFooter>
    </Card>
  )
}
