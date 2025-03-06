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
    <div class="bg-[url('/chu-images/img-bg.jpg')] bg-fixed">
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
  )
}