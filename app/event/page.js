// 這是event頁面

'use client'

import React, { useState } from 'react';
import BtnCTA from '../course/_components/btnCTA';
import CardB1 from '../course/_components/card-b1';
import { Accordion as HerouiAccordion, AccordionItem as HerouiAccordionItem } from "@heroui/accordion";
import ReactCompareImage from 'react-compare-image';
import ReactPageScroller from 'react-page-scroller';
import './event.css';


// 引用React icon
import { FaPeopleRobbery } from "react-icons/fa6";
import { RiStore2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GiPartyFlags } from "react-icons/gi";

// 引用樣式表
import './event.css';

export default function Event(props) {
  // 使用Full page Scroll
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  // Q&A 問與答內容
  const qa = [
    {
      question: '我的品牌為什麼要加入EventureArts?',
      answer: '加入EventureArts，您的品牌將獲得前所未有的曝光機會，並能觸及一群熱愛藝術與創意體驗的目標客群。我們的平台不僅提供 DIY 工作坊、音樂、藝術、烹飪等多元課程銷售，還包含展覽票務與線上展覽功能，讓您的作品和活動獲得更多關注。此外，透過我們的獨特抽卡機制，能提升消費者的購買樂趣與互動性，進一步促進銷售轉換。加入 EventureArts，您將能利用我們的技術與行銷資源，輕鬆拓展品牌影響力，與更多藝術愛好者建立深厚的連結。'
    },
    {
      question: '為什麼',
      answer: '222'
    },
    {
      question: '111',
      answer: '222'
    },
    {
      question: '111',
      answer: '222'
    },
    {
      question: '111',
      answer: '222'
    },
    {
      question: '111',
      answer: '222'
    },
    {
      question: '111',
      answer: '222'
    }
  ]

  return (
    <div className="whole h-screen w-screen">
      <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage}>

        {/* 1. 讓您的品牌被看見 Banner*/}
        <div className="section1 h-screen flex flex-col gap-4 justify-between items-center">

          {/* 1.1 讓您的品牌被看見 */}
          <div className='urge flex flex-col items-center justify-center w-full h-2/5'>
            <div className="title text-center">
              <p className='text-m'> - 讓您的品牌被看見 - </p>
              <p className='pt-4 text-2xl urge'>Amplify Your Brand. Elevate Your Presence.</p>
            </div>
            <div className="btns flex flex-row gap-8 pt-4">
              <BtnCTA text={'上架課程'} />
              <BtnCTA text={'上架展覽'} />
            </div>
          </div>

          {/* 1.2 平台四特點 */}
          <div className="flex flex-row w-full justify-evenly items-center h-3/5">
            <div className="Special h-[70%] flex flex-col items-center">
              <div className='py-12'><RiStore2Fill size={40} color="#000000" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title'>超過百家合作品牌</p>
                <p className='subtitle h-[50%]'>從個人創作者到跨國品牌與中小企業，共同打造多元創意生態！</p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center">
              <div className='py-12'><GiPartyFlags size={40} color="#000000" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title'>展覽+課程</p>
                <p className='subtitle h-[50%]'>展覽與課程一次搞定，創意體驗無縫串聯，盡情探索藝術世界！</p>
              </div>
            </div>

            <div className="Special h-[70%] flex flex-col items-center">
              <div className='py-12'><FaUsers size={40} color="#000000" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title'>新會員持續增長</p>
                <p className='subtitle h-[50%]'>精準分眾推播，強化互動體驗，全面提升網站活躍度！</p>
              </div>
            </div>
            
            <div className="Special h-[70%] flex flex-col items-center">
              <div className='py-12'><FaPeopleRobbery size={40} color="#000000" /></div>
              <div className="2title gap-2 flex flex-col text-center justify-between">
                <p className='title'>核心目標族群</p>
                <p className='subtitle h-[50%]'>鎖定高學習力、重視生活風格的活動愛好者，打造優質社群。</p>
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
          <div className="sectionTitle text-black">
            <p>人氣，就是品牌的影響力——讓您的空間轉化為熱鬧商機。</p>
          </div>
          <div className="compareimg">
            <ReactCompareImage 
              leftImage="/Blair/event/FlowerShop-before.png" 
              rightImage="/Blair/event/FlowerShop-after2.png" 
            />
          </div>
        </div>

        {/* 4. 上架流程 */}
        <div className="section3 h-screen w-full flex flex-col px-16">
          <div className="sectionTitle">
            <p>上架流程</p>
          </div>
          
          <div className="4steps flex flex-wrap justify-around items-center h-[80%]">
            <div><img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" /></div>
            <div><img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" /></div>
            <div><img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" /></div>
            <div><img src="https://fakeimg.pl/250x500/" alt="上架流程示意圖" /></div>
          </div>
        </div>


        {/* 5. 常見問題 */}
        <div className="section4 h-screen flex flex-col justify-center px-16">
          <div className="sectionTitle">
            <p>常見問題</p>
          </div>
          <div className="accordion h-[80%] w-full">
          <HerouiAccordion variant="light" defaultExpandedKeys={["0"]}>
            {qa.map((item, index) => (
              <HerouiAccordionItem 
                key={index} 
                className="pb-4" 
                aria-label={`問題${index + 1}`} 
                title={<span className="why">{item.question}</span>}
              >
                 <p style={{ fontSize: "1.1rem", color: "#999CAE", lineHeight: 2 }}>{item.answer}</p>
              </HerouiAccordionItem>
            ))}
          </HerouiAccordion>            
            
          </div>
        </div>

      </ReactPageScroller>

      {/* 頁碼指示點 */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 my-3 rounded-full cursor-pointer transition-all ${
              currentPage === index ? "bg-primary scale-100" : "bg-primary-100"
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
}