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
        <ParaTitle title="合作品牌｜Brand Partners" link="/event" btn="See more" />
    </div>
    <div className="flex flex-row justify-around">
    {/* 品牌卡1 */}
    <a href="#">
      <div className="outside border-y-1 border-black w-[280px] h-full">
        <img className="blogo my-4" src="https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg" alt="" />
        <div className="binfo">
          <p className="bname text-xl font-bold">Spark Lab</p>
          <p className='binfomy-4'>專注於星象研究的工作室，提供天文講座與觀測體驗，讓星空愛好者探索宇宙奧秘。</p>
        </div>
      </div>
    </a>
    {/* 品牌卡2 */}
    <a href="#">
      <div className="outside border-y-1 border-black w-[280px] h-full">
        <img className="blogo my-4" src="https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg" alt="" />
        <div className="binfo">
          <p className="bname text-xl font-bold">Spark Lab</p>
          <p className='binfomy-4'>專注於星象研究的工作室，提供天文講座與觀測體驗，讓星空愛好者探索宇宙奧秘。</p>
        </div>
      </div>
    </a>
    {/* 品牌卡3 */}
    <a href="#">
      <div className="outside border-y-1 border-black w-[280px] h-full">
        <img className="blogo my-4" src="https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg" alt="" />
        <div className="binfo">
          <p className="bname text-xl font-bold">Spark Lab</p>
          <p className='binfomy-4'>專注於星象研究的工作室，提供天文講座與觀測體驗，讓星空愛好者探索宇宙奧秘。</p>
        </div>
      </div>
    </a>
    {/* 品牌卡4 */}
    <a href="#">
      <div className="outside border-y-1 border-black w-[280px] h-full">
        <img className="blogo my-4" src="https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg" alt="" />
        <div className="binfo">
          <p className="bname text-xl font-bold">Spark Lab</p>
          <p className='binfomy-4'>專注於星象研究的工作室，提供天文講座與觀測體驗，讓星空愛好者探索宇宙奧秘。</p>
        </div>
      </div>
    </a>


      {/* 加入您的品牌 */}
      <a href="/event">
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
