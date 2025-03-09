'use client'

import React, { useState, useEffect } from 'react'

// 引用React icon
import { FaPeopleRobbery } from "react-icons/fa6";
import { BiSolidStoreAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiPartyFlags } from "react-icons/gi";


export default function Special(props) {
  return (
    <>
            <div className="Special h-[70%] flex flex-col items-center max-w-[300px]">
              <div className='py-12'><BiSolidStoreAlt size={60} color="#3d3b3a" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title text-lg font-black'>超過百家合作品牌</p>
                <p className='subtitle h-[50%]'>從個人創作者到跨國品牌與中小企業，共同打造多元創意生態！</p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center max-w-[300px]">
              <div className='py-12'><GiPartyFlags size={60} color="#3d3b3a" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title text-lg font-black'>展覽+課程</p>
                <p className='subtitle h-[50%]'>展覽與課程一次搞定，創意體驗無縫串聯，盡情探索藝術世界！</p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center max-w-[300px]">
              <div className='py-12'><FaUsers size={60} color="#3d3b3a" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title text-lg font-black'>新會員持續增長</p>
                <p className='subtitle h-[50%]'>精準分眾推播，強化互動體驗，全面提升網站活躍度！</p>
              </div>
            </div>
            
            <div className="Special h-[70%] flex flex-col items-center max-w-[300px]">
              <div className='py-12'><FaPeopleRobbery size={60} color="#3d3b3a" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title text-lg font-black'>核心目標族群</p>
                <p className='subtitle h-[50%]'>鎖定高學習力、重視生活風格的活動愛好者，打造優質社群。</p>
              </div>
            </div>

    </>
  )
}
