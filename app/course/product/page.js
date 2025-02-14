'use client'

import React, { useState, useEffect } from 'react'
import BtnCTA from '../_components/btnCTA'

// 引入React icon
import { PiTicketDuotone } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { RiPriceTag3Line } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { CiGift } from "react-icons/ci";

import './product.css'

export default function Product(props) {
  return (
    <>
{/* 1. PTitle 上方課程名稱 */}
    <div className="PTitle">
      <div className="PTitleInner text-center p-4">
        <p>Noémie Fleurs 迷花島嶼｜生活裡的花與器｜風格美感花藝選搭課｜floral design.</p>
      </div>
    </div>

{/* 2. PInfo 課程圖片+資訊 */}
    <div className="PInfo flex fle">
      <div className="PInfoLeft">
        <img src="https://fakeimg.pl/800x400/" />
      </div>
      <div className="PInfoRight">
        <div className="ProductDetail flex flex-col gap-3 p-4">
      {/* A.日期 */}
        <div className="items">
          <IoCalendarNumberOutline />
          <p>2024 | 08.24-10.10</p>
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
          <div className="items">
            <RiPriceTag3Line />
            <div className=""><p>$ 1,200 NTD</p>
            </div>
          </div>          
      {/* E.加入收藏 */}
      <div className="items">
            <GoHeart />
            <div className=""><p>加入收藏</p>
            </div>
          </div>          
      
      <br />
      <BtnCTA text={"去購買"} />
        </div>
      </div>
    </div>

{/* 3. P3Special 課程3特點 */}
    <div className="P3Special flex flex-row justify-around">
      {/* 特點一 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>花藝課程送禮首選！讓親友在美學體驗中感受滿滿心意，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日，送禮不只是一份驚喜，更是一場創意與美感的饗宴！</p>
      </div>
      {/* 特點二 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>花藝課程送禮首選！讓親友在美學體驗中感受滿滿心意，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日，送禮不只是一份驚喜，更是一場創意與美感的饗宴！</p>
      </div>
      {/* 特點三 */}
      <div className="Special">
        <CiGift size={40} color="#F17C80" />
        <p>送禮首選</p>
        <p>花藝課程送禮首選！讓親友在美學體驗中感受滿滿心意，親手打造專屬花藝作品，提升生活品味。適合生日、節日、紀念日，送禮不只是一份驚喜，更是一場創意與美感的饗宴！</p>
      </div>

    </div>

{/* 4. PIntro 課程介紹 */}
    <div className="PIntro flex flex-col gap-4">
      <p className="subtitle">Introduction</p>
      <p>愛花、愛生活的你，怎能錯過這場專屬於浪漫的下午時光？在專業花藝老師的引導下，學習如何搭配色彩、挑選花材，親手設計一份充滿春日氣息的花藝作品。不論是想裝飾家中一角，或是送給特別的他/她，都能在這裡找到滿滿靈感。
      讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂趣與優雅！讓我們在美麗的花朵中，放慢生活的步調，一起享受創作的樂</p>
    </div>


{/* 4&5. PLocate 課程介紹 & Contact */}
    <div className="PLocate flex flex-rol gap-4">
      <div className="Locate flex flex-col gap-4">
        <p className="subtitle">Location</p>
        <img src="https://fakeimg.pl/600x300" />
      </div>

      <div className="Contact flex flex-col gap-4">
      <p className="subtitle">Contact</p>
        <div>
          <p>地址：台灣台北市沅陵街1-1號</p>
          <p>電話：0975636458</p>
        </div>
      </div>

    </div>

{/* 6. PBrand 品牌名片 */}
    <div className="PBrand">
      <p className="subtitle">About Us</p>
      <br />

    {/* 左邊Logo */}
    <div className="flex flex-row gap-4">
      <div className="BLogo">
        <img src="https://fakeimg.pl/400x400" />
      </div>
      
    {/* 右Info */}
      <div className="BInfo">
        <p>Noémie Fleurs 迷花島嶼</p>
        <p>以花為語言，探索自然之美與心靈的連結。透過創意花藝設計，感受藝術與生活的優雅交融，打造屬於您的獨特花語故事。</p>
        <BtnCTA text={"去探索"} />
      </div>
    </div>

    </div>


    </>
  )
}
