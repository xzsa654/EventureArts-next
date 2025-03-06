'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Accordion as HerouiReactAccordion,
  AccordionItem as HerouiReactAccordionItem,
  Avatar,
} from '@heroui/react'

export default function AccordionQa(props) {

  // Q&A 問與答內容
  const qa = [
    {
      question: 'EventureArts是個怎樣的平台？',
      answer: 'EventureArts是一個創新的藝文平台，專注於結合展覽和課程兩大核心功能，為小型品牌和藝術家提供一個便捷且低門檻的銷售與曝光管道。與傳統平台相比，EventureArts減少了高昂手續費與複雜審核流程，為獨立藝術家、手作坊及小型品牌設計，讓他們在不依賴主流行銷的情況下，能夠有效接觸到目標受眾。此平台不僅是一個購票與報名系統，還以其簡單易用、綜合性強的特色，成為這些小型創作者展示才華與創意的最佳舞台。'
    },
    {
      question: '加入EventureArts，對我的品牌有什麼好處',
      answer: '加入EventureArts，您的品牌將獲得前所未有的曝光機會，並能觸及一群熱愛藝術與創意體驗的目標客群。我們的平台不僅提供 DIY 工作坊、音樂、藝術、烹飪等多元課程銷售，還包含展覽票務與線上展覽功能，讓您的作品和活動獲得更多關注。此外，透過我們的獨特抽卡機制，能提升消費者的購買樂趣與互動性，進一步促進銷售轉換。加入 EventureArts，您將能利用我們的技術與行銷資源，輕鬆拓展品牌影響力，與更多藝術愛好者建立深厚的連結。'
    },
    {
      question: '如何利用課程及展覽宣傳資源提升品牌曝光？',
      answer: '為了協助品牌方提升曝光率，我們將逐步新增各種相關功能，提供更全面的宣傳工具與行銷方案。這些功能將幫助品牌方更精準地觸及目標受眾，提升活動的可見度與參與度，並且加強品牌的市場競爭力。我們致力於打造一個全方位支援品牌成長與發展的藝文平台。'
    },
    {
      question: '如何透過專屬品牌頁面提升曝光與市場連結？',
      answer: '我們為每個品牌提供專屬的頁面，這不僅是一個展示品牌資訊的場所，更是一個綜合性的信息平台，集結了品牌的故事、理念以及所上架的所有課程和展覽。在這個專屬頁面上，品牌方可以展示其獨特的藝術作品與手作精品，讓潛在客戶能夠一目了然地了解品牌的特色與價值。同時，這個頁面不僅有助於提升品牌的專業形象，還能有效地增強與目標受眾之間的連結，進一步提升曝光率及轉化率，是品牌行銷和市場拓展的強大工具。'
    },
    {
      question: '如何利用課程及展覽宣傳資源提升品牌曝光？',
      answer: 'EventureArts不僅提供線上課程與展覽的曝光平台，還能透過整合性的行銷功能將流量引導至實體店面。當品牌在平台上發布課程和展覽活動時，吸引了大量的目標客群，這些用戶會進一步被誘導到品牌的實體店面或其他線下活動。平台的宣傳資源和專屬頁面幫助品牌建立穩定的線上曝光，進而引發消費者的興趣與互動，最終促進店面流量的增加，從而有效提升實體店的營業額。'
    },
    {
      question: 'B端用戶資格與義務',
      answer: '1. B端用戶需提供有效聯絡資訊，提交後即可成為商家，惟本平台保留後續審查權利，若發現違規可隨時取消資格。2. 活動資訊真實性：B端用戶應確保活動資訊（時間、地點、內容等）準確無誤，若有異動，應提前通知C端用戶及本平台。3. 合規經營：若活動涉及食品、特殊手作材料等，B端用戶應確保符合當地相關法規（如食品安全規範）。4. 智慧財產權保護（重點）：B端用戶應確保其上傳之所有內容（包括但不限於圖片、影片、文案、音樂、設計元素等）皆無侵犯他人智慧財產權，且擁有合法授權使用之權利。若因侵權導致法律責任，B端用戶應自行承擔，並賠償本平台因相關法律訴訟或索賠所受之損失。'
    }

  ]


  return (
    <>
      <HerouiReactAccordion variant="light" defaultExpandedKeys={["0"]}>
        {qa.map((item, index) => (
          <HerouiReactAccordionItem 
            key={index} 
            className="pb-4" 
            startContent={
            <Image
              src="/Lichia/obliqueStar.svg"
              alt="ticket1"
              className="w-[40px] h-[40px] "
              width={40}
              height={40}
              priority
            />
          }
            aria-label={`問題${index + 1}`} 
            title={<span className="why">{item.question}</span>}
          >
              <p>{item.answer}</p>
          </HerouiReactAccordionItem>
        ))}
      </HerouiReactAccordion>            
      
    </>
  )
}
