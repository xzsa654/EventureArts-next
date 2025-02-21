//這是/course/product頁面

'use client'

import React, { useState, useEffect } from 'react'

// 引入專案組件
import BtnCTA from '../../_components/btnCTA'

// 引入react組件
import {Button} from "@heroui/react";

// 引入React icon
import { PiTicketDuotone } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { GoHeart } from "react-icons/go";
import { useParams } from 'next/navigation';
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// 引入專案css
import './product.css';

// 引入路由
import { PRODUCT } from '@/lib/course-api';


export default function Product(props) {
  const [courseData, setCourseData] = useState("Loading...");

  const params =useParams()
  console.log(params);
  const {c_id}=params
   useEffect(() => {
      fetch(PRODUCT+c_id
      ) // 後端 API URL
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCourseData(data)
   })
          // setCourseTitle(data.c_name )})
        .catch((error) => console.error("Error fetching course title:", error));
    }, []);

  return (
    <>

{/* ------ Section1: 課程資訊 ------ */}
<div className="section1">
  {/* PTitle 上方課程名稱 */}
      <div className="PTitle">
        <div className="PTitleInner text-center">
          <p>{courseData?.c_name}</p>
        </div>
      </div>

  {/* PInfo 課程圖片+資訊 */}
      <div className="PInfo flex">
        <div className="PInfoImg w-[800px] h-[400px]">
          <img className="w-full h-full object-cover" src="https://images.agriharvest.tw/wp-content/uploads/2022/01/0-24-1024x708.jpg" />
        </div>
        
        <div className="PInfoContent flex flex-col justify-between">
          <div className="ProductDetail flex flex-col justify-between gap-3 px-8 h-[400px]">
            <div className="ABC flex flex-col gap-4">
            {/* A.日期 */}
              <div className="items">
                <IoCalendarNumberOutline />
                <p>{courseData?.c_startdate} 到 {courseData?.c_enddate}</p>
              </div>
            {/* B.名稱 */}
                <div className="items">
                  <PiTicketDuotone />
                  <div className=""><p>Noémie Fleurs 迷花島嶼 </p>
                  </div>
                </div>
            {/* C.地址 */}
                <div className="items">
                  <GrLocation />
                  <div className=""><p>台北市大安區復興南路一段390號3樓</p>
                  </div>
                </div>          
            {/* D.價格 */}
                <div><p className="text-2xl">${courseData?.c_price} NTD</p>               
                </div>          
            </div>
        
        <div className="buttons flex flex-row">
          <Button radius="none" className="bg-[#f7f5f1] text-black text-[15px] w-[200px] h-[50px] border-black border-2">LIKE<GoHeart />
          </Button>

          <Button radius="none" className="bg-[#000000] text-white text-[15px] w-[200px] h-[50px]">BUY<BsArrowRight />
          </Button>
        </div>

          </div>
        </div>
      </div>
</div>


{/* ------ Section2: 課程3特點 ------ */}
    <div className="section2 flex flex-row justify-around h-1/3">
      {/* 特點一 */}
      <div className="Special">
        <FiCheckCircle size={40} color="#F17C80" />
        <p className='text-2xl font-bold'>送禮首選</p>
        <p>花藝課程送禮首選！心意，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日，送禮不只是一份驚喜，更是一場創意與美感的饗宴！</p>
      </div>
      {/* 特點二 */}
      <div className="Special">
        <AiOutlineHeart size={40} color="#F17C80" />
        <p className='text-2xl font-bold'>送禮首選</p>
        <p>花友在美學體驗中感受滿滿心意，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日，送禮不只是一份驚喜，更是一場創意與美感的饗宴！</p>
      </div>
      {/* 特點三 */}
      <div className="Special">
        <FaRegSmileWink size={40} color="#F17C80" />
        <p className='text-2xl font-bold'>送禮首選</p>
        <p>花藝課程送禮首選！讓親友在美學體，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日更是一場創意與美感的饗宴！</p>
      </div>

    </div>

{/* ------ Section3: 課程介紹 ------ */}
    <div className="section3 flex flex-col gap-4 h-1/2">
      <p className="subtitle">課程介紹｜Introduction</p>
      <p className='content'>愛花、愛生活的你，怎能錯過這場專屬於浪漫的下午時光？在專業花藝老師的引導下，學習如何搭配色彩、挑選花材，親手設計一份充滿春日氣息的花藝作品。不論是想裝飾家中一角，或是送給特別的他/她，都能在這裡找到滿滿靈感。
      讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂</p>
    </div>


{/* ------ Section4: 場地、聯絡方式 ------ */}
    <div className="section4 flex flex-row gap-4">
      <div className="Locate flex flex-col gap-4 w-1/2">
        <p className="subtitle">課程地點｜Location</p>
        <img src="https://fakeimg.pl/500x200" />
      </div>

      <div className="Contact flex flex-col gap-4 w-1/2">
      <p className="subtitle">聯繫方式｜Contact</p>
        <div className="address h-full flex items-center">
          <div className='addressinner flex flex-col w-1/2 gap-8'>
            <p>地址：台灣台北市沅陵街1-1號</p>
            <p>電話：0975636458</p>
          </div>
        </div>
      </div>

    </div>


{/* ------ Section5: 品牌名片 ------ */}
    <div className="section5 flex flex-col">
      <p className="subtitle">關於品牌｜About Us</p>

      <div className="flex flex-row gap-4 justify-center items-center">
      {/* 左邊Logo */}
        <div className="BLogo w-1/2">
          <img src="https://fakeimg.pl/300x300" />
        </div>
        
      {/* 右Info */}
        <div className="BInfo w-1/2">
        <div className="BInfoinner flex flex-col w-1/2 gap-8">
          <p>Noémie Fleurs 迷花島嶼</p>
          <p>以花為語言，探索自然之美與心靈的連結。透過創意花藝設計，感受藝術與生活的優雅交融，打造屬於您的獨特花語故事。</p>
          <BtnCTA text={"去探索"} />
        </div>
        </div>
    </div>

    </div>


    </>
  )
}
