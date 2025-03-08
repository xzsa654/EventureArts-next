'use client'

import React from 'react'
import Headline from './_components/headline'
import Carousel from './_components/carousel'
import QuickLinks from './_components/quick-links'
import NewProduct from './_components/new-product'
import CardDraw from './_components/card-draw'
import TopSix from './_components/top-six'
import BrandList1 from './_components/brand-list1'
import { motion } from "framer-motion";

export default function CoursePage(props) {
  return (

  <motion.div
  initial={{ opacity: 0, y: 50 }} // 初始狀態：透明、向下偏移50px
  animate={{ opacity: 1, y: 0 }}  // 結束狀態：不透明、完全可見
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // 设置动画时间 & 延迟
  className=""
  >
  <div className="bg-[url('/chu-images/img-bg.jpg')] bg-fixed">
    <div className="flex justify-center flex-col h-full">
        <div className='mt-20 px-16 pt-8 pb-4 mx-auto w-[80%]'><Headline /></div>
        <div className='px-16 pt-8 mx-auto w-full'><Carousel /></div>
        <div className='px-24 pt-12 mx-auto w-full'><QuickLinks /></div>
        <div className='px-16 pt-8 mx-auto w-full'><NewProduct /></div>
        <div className='px-16 pt-8 mx-auto w-full'><CardDraw /></div>
        <div className='px-16 pt-8 mx-auto w-full'><TopSix /></div>
        <div className='px-16 py-16 mx-auto w-full'><BrandList1 /></div>
    </div>
  </div>
  </motion.div>
  )
}