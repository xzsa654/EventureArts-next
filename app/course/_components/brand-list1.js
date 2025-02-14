'use client'

import React, { useState, useEffect } from 'react'
import ParaTitle from './para-title'
import CardB1 from './card-b1'
import { Button } from '@heroui/react'

export default function BrandList1(props) {
  return (
    <>
    <div className="div">
    <div className="para">
        <ParaTitle title="合作品牌" link="#" btn="See more" />
    </div>
    <div className="flex flex-row justify-between">
      <CardB1 />
      <CardB1 />
      <CardB1 />
      <CardB1 />
      {/* 加入您的品牌 */}
      <a href="#">
        <div className="joinus w-[200px] h-[400px] flex flex-col justify-center items-center">
          <img className="my-4" src="https://i.pinimg.com/736x/ca/9e/38/ca9e38be0fd50bb8ecca273ef20995a1.jpg" alt="" />
          <div className="binfo">
          <Button color="primary" variant="ghost">
            加入我們！
          </Button>
          </div>
        </div>
      </a>

    </div>
    </div>
    </>
  )
}
