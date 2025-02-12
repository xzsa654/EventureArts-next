'use client'

import React from 'react'
import Headline from './_components/headline'
import Carousel from './_components/carousel'
import Searchbox from './_components/searchbox'
import ParaTitle from './_components/para-title'

export default function CoursePage(props) {
  return (
    
    //body用justify-center置中；div裡面若非滿版，用mx-auto置中。
    <div className="flex justify-center flex-col
    h-full h-screen bg-cover bg-center bg-no-repeat bg-[url('https://i.imgur.com/EM2tRJ6.jpeg')]">
        <div className='px-16 py-8 mx-auto'><Headline /></div>
        <Carousel />
        <div className='px-16 py-8 mx-auto w-full'><Searchbox /></div>
        <ParaTitle title="探索課程" link="#" btnname="查看更多" />


    </div>
  )
}