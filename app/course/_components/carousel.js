'use client'

import React, { useRef, useState } from 'react'

// import Swiper 樣式
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

// import 自定義樣式
import './style.css'

// import required modules
import { Pagination, Autoplay } from 'swiper/modules'

export default function Carousel(props) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        modules={[Pagination, Autoplay]} // 加入 Autoplay 模組
        autoplay={{
          delay: 3000, // 設定自動輪播的時間間隔，單位是毫秒
          disableOnInteraction: false, // 即便用戶與輪播互動，也會繼續自動播放
        }}
        className="mySwiper"
      >
        <SwiperSlide className="w-1/3 h-auto course">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner1-crown.png" alt="" /></a>
          </SwiperSlide>

        <SwiperSlide className="w-1/3 h-auto course">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner5-bake.png" alt="" /></a>
          </SwiperSlide>   

        <SwiperSlide className="w-1/3 h-auto course">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner2-coffee.png" alt="" /></a>
          </SwiperSlide>    

        <SwiperSlide className="w-1/3 h-auto course">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner3-florist.png" alt="" /></a>
          </SwiperSlide>

        <SwiperSlide className="w-1/3 h-auto course">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner4-journal.png" alt="" /></a>
          </SwiperSlide>
          
          <SwiperSlide className="w-1/3 h-auto">
          <a href="/course/product/2">
          <img className="w-[800px] h-[250px]" src="/Blair/carousel-banner/banner6-tarot.png" alt="" /></a>
          </SwiperSlide>    
          
      </Swiper>
    </>
  )
}
