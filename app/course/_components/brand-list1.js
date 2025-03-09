'use client'

import React, { useState, useEffect } from 'react'
import ParaTitle from './para-title'
import CardB1 from '../../event/_components/card-b1'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function BrandList1(props) {
  return (
    <>
    <div className="">
      <div className="para">
          <ParaTitle title="合作品牌｜Brand Partners" link="/event" btn=" " />
      </div>

      {/* 品牌卡集合 */}
      <div className="flex flex-wrap justify-between">
      {/* 品牌卡4 */}
      <Link href="/brandsinfo/83">
        <div className="outside border-y-1 border-black w-[250px] h-auto">
          <img className="blogo my-4" src="/Blair/brand-logo/logo4.png" alt="" />
          <div className="binfo">
            <p className="bname text-xl font-bold py-4">OLIVIA 水晶能量工坊</p>
            <p className='binfomy-4 pb-4'>以水晶啟動內在能量，親手打造你的專屬幸運符，感受純粹的心靈共鳴。</p>
          </div>
        </div>
      </Link>

      {/* 品牌卡1 */}
      <Link href="/brandsinfo/84">
        <div className="outside border-y-1 border-black w-[250px] h-auto">
          <img className="blogo my-4" src="/Blair/brand-logo/logo1.png" alt="" />
          <div className="binfo">
            <p className="bname text-xl font-bold py-4">Kinsley Floral Atelier</p>
            <p className='binfomy-4 pb-4'>以花藝點綴生活之美：質感花藝體驗，開啟你的綻放時刻。</p>
          </div>
        </div>
      </Link>
      {/* 品牌卡2 */}
      <Link href="/brandsinfo/85">
        <div className="outside border-y-1 border-black w-[250px] h-auto">
          <img className="blogo my-4" src="/Blair/brand-logo/logo2.png" alt="" />
          <div className="binfo">
            <p className="bname text-xl font-bold py-4">aurora scent</p>
            <p className='binfomy-4 pb-4'>探索專屬氣味，客製你的獨特香氛記憶，讓每一天都有專屬於你的香氣。</p>
          </div>
        </div>
      </Link>
      {/* 品牌卡3 */}
      <Link href="/brandsinfo/86">
        <div className="outside border-y-1 border-black w-[250px] h-auto">
          <img className="blogo my-4" src="/Blair/brand-logo/logo3.png" alt="" />
          <div className="binfo">
            <p className="bname text-xl font-bold py-4">卡比咖啡學校</p>
            <p className='binfomy-4 pb-4'>卡比咖啡結合 咖啡職人教學 與 美食饗宴，打造一個能 學習、品味、分享 的複合式空間，讓每杯咖啡都充滿故事與溫度。</p>
          </div>
        </div>
      </Link>
      {/* 品牌卡5：加入我們 */}
      <Link href="/event">
        <div className="outside border-y-1 border-black w-[250px] h-auto">
          <img className="blogo my-4" src="/Blair/brand-logo/join-us.png" alt="" />
          <div className="binfo">
            <p className="bname text-xl font-bold py-4">加入我們</p>
            <p className='binfomy-4 pb-4'>加入我們，讓品牌被看見！</p>
          </div>
        </div>
      </Link>
      
      </div>
    </div>
    </>
  )
}
