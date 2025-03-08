// 這是抽卡頁面

'use client'

import React, { useState, useEffect } from 'react'
import { BsArrowRight } from "react-icons/bs";
import {Button} from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import './carddraw.css'
import { useAuth } from '@/hooks/use-auth';  //🔑登入驗證（需要登入的頁面都需要0）

export default function Carddraw(props) {
  const {getAuthHeader,auth}=useAuth()  //🔑登入驗證（需要登入的頁面都需要0；#1 帶擋頭；#2 帶會員狀態）
  const [cardData, setCardData] = useState(null);
  const [specialPrice] = useState(1000);  // 固定優惠價格（目前只有一個級距：1000～1999的課程優惠價格$1000）
  const [userId, setUserId] = useState(null); 

  //取得用戶的抽卡紀錄（GET API）
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await fetch(`http://localhost:3001/course/carddraw/init`,{
          headers:{
            ...getAuthHeader()   //🔑登入驗證
          }
        });
        const data = await response.json();
        console.log(data);
        
        if (data.user_id) {
          setUserId(data.user_id);  // 如成功獲取user_id, 則設置狀態
          setCardData(data);  // 設置卡片訊息 💳
        } else {
          console.error('❌ 無法獲取user_id');
        }
      } catch (error) {
        console.error('❌ 數據庫讀取錯誤-1', error);
      }
    };    
    if(auth.token){   //🔑登入驗證
          
      fetchUserData();
    }
  }, [auth.token]);


  // 執行抽卡邏輯（POST API）
  const handleCardDraw = async () => {
    //🔑登入驗證
    if (!auth.token) {   
      alert("請先登入再抽卡！");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/course/carddraw/draw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', ...getAuthHeader()   //🔑登入驗證
        },
        body: JSON.stringify({ user_id: userId }), // 傳送用戶ID
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // 更新卡片資訊
        setCardData(data);  // 更新抽中的卡片資訊
      } else {
        alert(data.error);  // 顯示錯誤
      }
    } catch (error) {
      console.error('❌資料庫讀取錯誤-2', error);
    }
  };


  // 測試用
  // return <pre>{JSON.stringify(cardData, null, 4)}</pre>;


  return (
    <>

<div className="main masked-image">

    {/* ----- 上方標題區塊 ----- */}
    <div className="flex flex-col justify-center items-center">
        <p className='t-title'>請憑直覺選擇一張喜愛的票券：</p>
        <br />
        <p className='t-subtitle'>Please select a ticket that resonates with you the most.</p>
    </div>

    {/* ----- 下方活動區塊 ----- */}
    <div className='playground w-[100%] h-[100%]'>
      <Swiper
      modules={[Mousewheel]}
      mousewheel={true} // 滾輪控制：on
      centeredSlides={true} // 讓當前 Slide 置中
      spaceBetween={150} //卡片間隔
      initialSlide={4} // 從第5張卡片開始（索引從 0 開始）
      slidesPerView={6.5} //每一幀顯示6張卡片，露出半張
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {Array(20).fill(0).map((_, index) => (
      <SwiperSlide key={index} className="swpslide swiper-slide">

        {/* 卡片 */}
          <div className="ticket flex flex-col gap-6">
            <img src='/Blair/ticket.png' alt={`Card ${index + 1}`}  />

            {/* 按鈕 */}
            <div className="btn flex gap-4 items-center h-10">
            <Button 
                      radius="none" 
                      className="bg-[#000000] text-white h-full" 
                      onPress={handleCardDraw}  // 點擊時觸發抽卡
                    >                
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
