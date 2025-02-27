'use client'

import React, { useState } from 'react';
import BtnCTA from '../course/_components/btnCTA';
// import CardB1 from '../course/_components/card-b1';
import { Accordion as HerouiAccordion, AccordionItem as HerouiAccordionItem } from "@heroui/accordion";
// import Compareimg from '../course/_components/compareimg';
import ReactFullpage from "@fullpage/react-fullpage";
import './event.css'; 


export default function Event2() {
  return (
    <ReactFullpage
      licenseKey="null"
      scrollingSpeed={1000} // 滾動速度
      navigation // 顯示側邊導航點
      responsiveWidth={768} // 行動裝置適配
      render={() => (

        <ReactFullpage.Wrapper>
          <div className="section">
            <div className="page1 mt-20 h-screen">
              <div className="banner flex flex-col justify-center items-center h-[33.33%]">
                <p>讓您的品牌被看見</p>
                <div className="buttons flex flex-row justify-center items-center">
                  <BtnCTA text={'上架課程'} />
                  <BtnCTA text={'上架展覽'} />
                </div>
              </div>
            </div>
          </div>
          <div className="section">合作品牌</div>
          <div className="section">前後對照圖</div>
          <div className="section">上架流程</div>
          <div className="section">
                    <div className="section4 h-screen flex flex-col justify-center px-16">
                      <div className="sectionTitle">
                        <p>常見問題</p>
                      </div>
                      <div className="accordion h-[80%] w-full">
                        <HerouiAccordion variant="light" defaultExpandedKeys={["1"]} >
                          <HerouiAccordionItem key="1" className="pb-4" aria-label="問題1" 
                          title={<span className="why">為什麼要將我的品牌加入EventureArts?</span>}>
                            回答
                          </HerouiAccordionItem>
                          <HerouiAccordionItem key="2" className="pb-4" aria-label="問題2" 
                          title={<span className="why">如何加入EventureArts？</span>}>
                            回答
                          </HerouiAccordionItem>
                          <HerouiAccordionItem key="3" className="pb-4" aria-label="問題3" 
                          title={<span className="why">如何加入EventureArts？</span>}>
                            回答
                          </HerouiAccordionItem>              
                          <HerouiAccordionItem key="4" className="pb-4" aria-label="問題4" 
                          title={<span className="why">如何在EventureArts上架課程或展覽？</span>}>
                            回答
                          </HerouiAccordionItem>
                          <HerouiAccordionItem key="5" className="pb-4" aria-label="問題5" 
                          title={<span className="why">如何選擇場地？</span>}>
                            回答
                          </HerouiAccordionItem>
                          <HerouiAccordionItem key="6" className="pb-4" aria-label="問題6" 
                          title={<span className="why">如何核銷用戶購買的課程或展覽票券？</span>}>
                            回答
                          </HerouiAccordionItem>
                        </HerouiAccordion>
                      </div>
                    </div>
            
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  );
}