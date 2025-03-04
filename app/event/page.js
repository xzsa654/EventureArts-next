// 這是event頁面

'use client'

import React, { useEffect, useState } from 'react'
import BtnCTA from '../course/_components/btnCTA'
import CardB1 from '../course/_components/card-b1'
import {
  Accordion as HerouiAccordion,
  AccordionItem as HerouiAccordionItem,
} from '@heroui/accordion'
import Compareimg from '../course/_components/compareimg'
import ReactPageScroller from 'react-page-scroller'
import './event.css'
import { useDisclosure } from '@heroui/react'

// 引用React icon
import { FaPeopleRobbery } from 'react-icons/fa6'
import { RiStore2Fill } from 'react-icons/ri'
import { FaUsers } from 'react-icons/fa'
import { GiPartyFlags } from 'react-icons/gi'
import JoinUsModal from '../user/_components/b_player/join-us-modal'
// 引用樣式表
import './event.css'

export default function Event(props) {
  // 使用Full page Scroll
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (number) => {
    setCurrentPage(number)
  }
  const { isOpen, onOpenChange } = useDisclosure()

  // Q&A 預設內容
  const defaultContent = (
    <p>這是預設內容，您可以在這裡提供問題解答或其他資訊。</p>
  )

  return (
    <div className="whole h-screen w-screen">
      <ReactPageScroller
        pageOnChange={handlePageChange}
        customPageNumber={currentPage}
      >
        {/* 1. 讓您的品牌被看見 Banner*/}
        <div className="section1 h-screen flex flex-col gap-4 justify-between items-center">
          {/* 1.1 讓您的品牌被看見 */}
          <div className="urge flex flex-col items-center justify-center w-full h-2/5">
            <div className="title">
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
          <div className="flex flex-row w-full justify-evenly items-center h-3/5">
            <div className="Special h-[70%] flex flex-col items-center">
              <div className="py-12">
                <RiStore2Fill size={40} color="#000000" />
              </div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className="title">超過100家合作品牌</p>
                <p className="subtitle h-[50%]">
                  包含多家跨國品牌、中小企業主與個人創作者等。
                </p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center">
              <div className="py-12">
                <GiPartyFlags size={40} color="#000000" />
              </div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className="title">展覽+課程</p>
                <p className="subtitle h-[50%]">雙重活動，一次搞定！</p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center">
              <div className="py-12">
                <FaUsers size={40} color="#000000" />
              </div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className="title">會員數超過2萬</p>
                <p className="subtitle h-[50%]">
                  新會員持續增長，精準分眾推播，提升網站活躍度。
                </p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center">
              <div className="py-12">
                <FaPeopleRobbery size={40} color="#000000" />
              </div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className="title">主力消費客層</p>
                <p className="subtitle h-[50%]">
                  聚集高收入、高學習力、重視生活風格的活動愛好者。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 合作品牌 */}
        <div className="section2 h-screen px-40 bg-[#3c3c3c] bg-opacity-60">
          <div className="sectionTitle text-white">
            <p>合作品牌</p>
          </div>
          <CardB1 />
        </div>

        {/* 3. 前後對照圖 */}
        <div className="h-screen">
          <Compareimg />
        </div>

        {/* 4. 上架流程 */}
        <div className="section3 h-screen w-full flex flex-col px-16">
          <div className="sectionTitle">
            <p>上架流程</p>
          </div>

          <div className="4steps flex flex-wrap justify-around items-center h-[80%]">
            <div>
              <img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" />
            </div>
            <div>
              <img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" />
            </div>
            <div>
              <img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" />
            </div>
            <div>
              <img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" />
            </div>
          </div>
        </div>

        {/* 5. 常見問題 */}
        <div className="section4 h-screen flex flex-col justify-center px-16">
          <div className="sectionTitle">
            <p>常見問題</p>
          </div>
          <div className="accordion h-[80%] w-full">
            <HerouiAccordion variant="light" defaultExpandedKeys={['1']}>
              <HerouiAccordionItem
                key="1"
                className="pb-4"
                aria-label="問題1"
                title={
                  <span className="why">
                    為什麼要將我的品牌加入EventureArts?
                  </span>
                }
              >
                {defaultContent}
              </HerouiAccordionItem>
              <HerouiAccordionItem
                key="2"
                className="pb-4"
                aria-label="問題2"
                title={<span className="why">如何加入EventureArts？</span>}
              >
                {defaultContent}
              </HerouiAccordionItem>
              <HerouiAccordionItem
                key="3"
                className="pb-4"
                aria-label="問題3"
                title={<span className="why">如何加入EventureArts？</span>}
              >
                {defaultContent}
              </HerouiAccordionItem>
              <HerouiAccordionItem
                key="4"
                className="pb-4"
                aria-label="問題4"
                title={
                  <span className="why">
                    如何在EventureArts上架課程或展覽？
                  </span>
                }
              >
                {defaultContent}
              </HerouiAccordionItem>
              <HerouiAccordionItem
                key="5"
                className="pb-4"
                aria-label="問題5"
                title={<span className="why">如何選擇場地？</span>}
              >
                {defaultContent}
              </HerouiAccordionItem>
              <HerouiAccordionItem
                key="6"
                className="pb-4"
                aria-label="問題6"
                title={
                  <span className="why">
                    如何核銷用戶購買的課程或展覽票券？
                  </span>
                }
              >
                {defaultContent}
              </HerouiAccordionItem>
            </HerouiAccordion>
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
