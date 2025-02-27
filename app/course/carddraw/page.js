'use client'

import React, { useState, useEffect } from 'react'
import { BsArrowRight } from "react-icons/bs";
import {Button} from "@heroui/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';

import './carddraw.css'
import BtnCTA from '../_components/btnCTA';

export default function Carddraw(props) {
  return (
    <>
<div className="main">

    {/* ----- 上方標題區塊 ----- */}
    <div className="title flex justify-center items-center">
        <p>請憑直覺選擇一張喜愛的票券：</p>
    </div>

    {/* ----- 下方活動區塊 ----- */}
    <div className='playground w-[100%] h-[100%]'>
      <Swiper
      modules={[Mousewheel]}
      mousewheel={true} // 滾輪控制：on
      centeredSlides={true} // 讓當前 Slide 置中
      spaceBetween={80} //卡片間隔
      slidesPerView={6.5} //每一幀顯示6張卡片，露出半張
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {Array(20).fill(0).map((_, index) => (
      <SwiperSlide key={index} className="swiper-slide">

        {/* 卡片 */}
          <div className="card flex flex-col gap-6">
            <img src='https://i.pinimg.com/736x/01/31/d5/0131d576a92f2f8b1aab4a41d89e8790.jpg' alt={`Card ${index + 1}`} />
            {/* 按鈕 */}
            <div className="btn flex gap-4 items-center h-10">
              <Button radius="none" className="bg-[#000000] text-white h-full">
                <span>就是你了</span>
                <BsArrowRight />
              </Button>
            </div>
          </div>

        </SwiperSlide>
        ))}

      </Swiper>

    </div>

</div>


    </>
  )
}
