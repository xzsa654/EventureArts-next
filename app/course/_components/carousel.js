'use client'

import React, { useRef, useState } from 'react';

// import Swiper 樣式
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import 自定義樣式
import '../style.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function Carousel(props) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={-2}
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
        <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner1.jpg" alt="" /></a>
          </SwiperSlide>
          <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner2.jpg" alt="" /></a>
          </SwiperSlide>      
          <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner3.jpg" alt="" /></a>
          </SwiperSlide>
          <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner4.jpg" alt="" /></a>
          </SwiperSlide>    
          <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner5.jpg" alt="" /></a>
          </SwiperSlide>
          <SwiperSlide>
          <a href="https://www.metadesign.com.tw/live-as-a-light.html">
          <img src="/Blair/carousel-banner/banner6.jpg" alt="" /></a>
          </SwiperSlide>    
      </Swiper>
    </>
  );
}
