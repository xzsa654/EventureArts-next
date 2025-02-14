'use client'

import React, { useState, useEffect } from 'react'
import BtnCTA from '../course/_components/btnCTA'
import CardB1 from '../course/_components/card-b1';
import { Accordion as HerouiAccordion, AccordionItem as HerouiAccordionItem } from "@heroui/accordion";
import { Accordion as HerouiReactAccordion, AccordionItem as HerouiReactAccordionItem, Avatar } from "@heroui/react";

// 引用React icon
import { CiGift } from "react-icons/ci";

// 引用樣式表
import './event.css'

export default function Event(props) {

  const defaultContent = (
    <p>這是預設內容，您可以在這裡提供問題解答或其他資訊。</p>
  );

  return (
    <>
    {/* 1. brandCTA 上方呼籲加入banner */}
      <div className="brandCTA flex flex-col gap-4 justify-center items-center">
        <div className="title">
          <p className='urge'>讓您的品牌被看見</p>
        </div>
        <div className="btns flex flex-row gap-4">
          <BtnCTA text={'上架課程'} />
          <BtnCTA text={'上架展覽'} />
        </div>
      </div>

    {/* 2. 平台4特點 */}
    <div className="P3Special flex flex-row justify-around">
      {/* 特點一 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧</p>
      </div>
      {/* 特點二 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧</p>
      </div>
      {/* 特點三 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧</p>
      </div>
      {/* 特點四 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧40個字吧</p>
      </div>
    </div>
    
    {/* 6. 品牌推薦 */}
      {/* 區塊標題*/}
      <div className="qa">
    <div className="sectionTitle"><p>品牌推薦</p></div>
      <HerouiReactAccordion selectionMode="multiple">
        <HerouiReactAccordionItem
          key="1"
          aria-label="Chung Miller"
          startContent={
            <Avatar
              isBordered
              color="primary"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          }
          subtitle="4 unread messages"
          title="Chung Miller"
        >
          {defaultContent}
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="2"
          aria-label="Janelle Lenard"
          startContent={
            <Avatar
              isBordered
              color="success"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          }
          subtitle="3 incompleted steps"
          title="Janelle Lenard"
        >
          {defaultContent}
        </HerouiReactAccordionItem>
        <HerouiReactAccordionItem
          key="3"
          aria-label="Zoey Lang"
          startContent={
            <Avatar
              isBordered
              color="warning"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          }
          subtitle={
            <p className="flex">
              2 issues to<span className="text-primary ml-1">fix now</span>
            </p>
          }
          title="Zoey Lang"
        >
          {defaultContent}
        </HerouiReactAccordionItem>
      </HerouiReactAccordion>
    </div>

    {/* 3. 合作品牌 */}
    <div className="brandList">
      {/* 區塊標題*/}
      <div className="sectionTitle"><p>合作品牌</p></div>
      
      {/* 品牌名片5x2內容寫死 */}
      <div className="bcardArea grid grid-cols-5 gap-10 justify-items-center">
        {[...Array(10)].map((_, i) => (
          <CardB1 key={i} />
        ))}
      </div>
    </div>

    {/* 4. 上架流程 */}
    <div className="courseProcess">
      {/* 區塊標題*/}
      <div className="sectionTitle"><p>上架流程</p></div>
      <img src="https://fakeimg.pl/1400x600/" alt="" />
    </div>

    {/* 5. 常見問題 */}
      {/* 區塊標題*/}
    <div className="qa">
    <div className="sectionTitle"><p>常見問題</p></div>
      <HerouiAccordion variant="light">
        <HerouiAccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </HerouiAccordionItem>
        <HerouiAccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </HerouiAccordionItem>
        <HerouiAccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </HerouiAccordionItem>
      </HerouiAccordion>
    </div>


    </>
  )
}