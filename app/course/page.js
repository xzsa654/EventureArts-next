'use client'

import React from 'react'
import Headline from './_components/headline'
import Carousel from './_components/carousel'
import Searchbox from './_components/searchbox'
import ParaTitle from './_components/para-title'
import QuickLinks from './_components/quick-links'
import NewProduct from './_components/new-product'
import CardDraw from './_components/card-draw'
import TopSix from './_components/top-six'
import BrandList1 from './_components/brand-list1'

export default function CoursePage(props) {
  return (
    
    //body用justify-center置中；div裡面若非滿版，用mx-auto置中。
    <div className="mt-20 flex justify-center flex-col h-full">
        <div className='px-16 my-7 mx-auto'><Headline /></div>
        <Carousel />
        <div className='px-16 pt-8 mx-auto w-full'><Searchbox /></div>
        <div className='px-24 py-8 mx-auto w-full'><QuickLinks /></div>
        <div className='px-16 pb-8 mx-auto w-full'><NewProduct /></div>
        <div className='px-16 pb-8 mx-auto w-full'><CardDraw /></div>
        <div className='px-16 pb-8 mx-auto w-full'><TopSix /></div>
        <div className='px-16 pb-8 mx-auto w-full'><BrandList1 /></div>
    </div>
  )
}