// 這是event頁面
'use client'

import React, { useState } from 'react';
import BtnCTA from '../course/_components/btnCTA';
import CardB1 from './_components/card-b1';
import ReactCompareImage from 'react-compare-image';
import ReactPageScroller from 'react-page-scroller';
import UploadProcess from './_components/upload-process';
import AccordionQa from './_components/accordion-qa';
import Special from './_components/special';
import { useDisclosure } from '@heroui/react'
import JoinUsModal from '../user/_components/b_player/join-us-modal'


// 引用樣式表
import styles from "./event.module.css";

export default function Event(props) {
  // 使用Full page Scroll
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (number) => {
    setCurrentPage(number)
  }
  const { isOpen, onOpenChange } = useDisclosure()

  return (
    <div className="whole h-screen w-screen">
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
      >
        {/* 1. 讓您的品牌被看見 Banner*/}
        <div className="section1 h-screen mt-20 flex flex-col gap-4 justify-between items-center">
          {/* 1.1 讓您的品牌被看見 */}
          <div className={`${styles.urge} flex flex-col items-center justify-center w-full h-2/5`}>
            <div className={styles.title}>
              <p>讓您的品牌被看見</p>
            </div>
            <div className="btns flex flex-row gap-8 pt-4">
              <BtnCTA
                onClick={() => {
                  onOpenChange(true)
                }}
                text={'上架課程'}
              />
              <BtnCTA
                text={'上架展覽'}
                onClick={() => {
                  onOpenChange(true)
                }}
              />
            </div>
          </div>

          {/* 1.2 平台四特點 */}
          <div className="flex flex-wrap w-full justify-around items-center h-3/5 overflow-auto">
            <Special />
          </div>
        </div>

        {/* 2. 合作品牌 */}
        <div className="section2 h-screen px-40 py-8 bg-[#3c3c3c] bg-opacity-60">
          <CardB1 />
        </div>


        {/* 3. 前後對照圖 */}
        <div className="h-screen w-full flex flex-col items-center">
          <div className={`${styles.sectionTitle} text-black text-center my-8`}>
            <p>人氣，就是品牌的影響力— 讓您的空間轉化為熱鬧商機。</p>
          </div>
          <div className="compareimg flex justify-center items-center max-w-[60%] w-full">
            <ReactCompareImage 
              leftImage="/Blair/event/FlowerShop-before.png" 
              rightImage="/Blair/event/FlowerShop-after2.png" 
              style={{ width: '100%' }}
            />
          </div>
        </div>


        {/* 4. 上架流程 */}
        <div className="section3 h-screen w-full flex flex-col px-16">
          <div className="text h-[20%] flex justify-center items-center">
            <p className="text-center t-16 text-gray-800">上架流程</p>
          </div>
          <div className="4steps flex flex-wrap justify-around  h-[70%] overflow-auto">
            <UploadProcess />
          </div>
        </div>

        {/* 5. 常見問題 */}
        <div className="section4 h-screen flex flex-col justify-center px-32 mt-5">
        <p className="text-center t-16 text-gray-800">常見問題</p>
          <div className="accordion w-full overflow-y-auto max-h-[calc(100vh-100px)] ">
            <AccordionQa />
          </div>
        </div>
      </ReactPageScroller>

      {/* 頁碼指示點 */}
      <div className="fixed  top-1/2 right-4 transform -translate-y-1/2">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 my-3 block rounded-full cursor-pointer transition-all ${
              currentPage === index ? 'bg-primary scale-100' : 'bg-primary-100'
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
      <JoinUsModal {...{ isOpen, onOpenChange }} />
    </div>
  )
}
