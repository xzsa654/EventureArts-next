'use client'

import React, { useState, useEffect } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';

export default function Carddraw(props) {
  return (
    <>
      <div className='mt-20'>
      <Swiper
      modules={[Mousewheel]}
      mousewheel={true} // 啟用滾輪控制
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png" alt="" /></SwiperSlide>

    </Swiper>    
      </div>
    </>
  )
}
