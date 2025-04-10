//這是/course/product頁面

'use client'
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";

// 引入專案組件
import BtnCTA from '../../_components/btnCTA'
// import GoogleMap from '../../_components/map-googlemap';
import Map from '../../_components/map-leaflet'

// 引入react / Next組件
import { Button } from '@heroui/react'

// 引入React icon
import { PiTicketDuotone } from 'react-icons/pi'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { GrLocation } from 'react-icons/gr'
import { GoHeart } from 'react-icons/go'
import { useParams } from 'next/navigation'
import { FiCheckCircle } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegSmileWink } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'

// 引入css
import styles from "./product.module.css";

// 引入路由
import { PRODUCT } from '@/lib/course-api'
import { useRouter } from 'next/navigation' // for buy ticket btn

export default function Product() {
  // ---for buy ticket btn start---
  const router = useRouter() // 使用 Next.js App Router 的 useRouter
  // ---for buy ticket btn end---

  // ------ 動態路由設置 START ------
  const [courseData, setCourseData] = useState({})
  const params = useParams()
  const { c_id } = params // 獲取動態路由參數 c_id
  // ------ 動態路由設置 END ------

  // ------ 串接資料庫 START ------
  // useEffect (() => {}, []);
  // 元件完成後，會執行一次。

  useEffect(() => {
    if (c_id) {
      fetch(`${PRODUCT}${c_id}`) // 後端 API URL
        .then((response) => response.json()) //箱子
        .then((data) => {
          //包裝紙：解析箱子（後台送來的物件們）
          console.log('API回應:', data)
          if (data.length) {
            setCourseData(data[0])
          }
        })
        .catch((error) => console.error('fetch課程資料失敗:', error))
    }
  }, [c_id])

  if (!courseData) return <p>Loading...</p> // 等待 API 回應

  console.log(courseData)

  // ------ 串接資料庫 END------

  // 📊 數據測試
  // return <pre>{JSON.stringify(courseData, null, 4)}</pre>;

  return (
    <>
    <motion.div
    initial={{ opacity: 0, y: 50 }} // 初始狀態：透明、向下偏移50px
    animate={{ opacity: 1, y: 0 }}  // 結束狀態：不透明、完全可見
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // 设置动画时间 & 延迟
    className=""
    >

    <div className={styles.overall}>
      {/* ------ Section1: 課程資訊 ------ */}
      <br />
      <br />
      <div className={styles.section1}>
        {/* PTitle 上方課程名稱 */}
        <div className={styles.PTitle}>
          <div className={styles.PTitleInner}>
            <p>{courseData?.c_name}</p>
          </div>
        </div>

        {/* PInfo 課程圖片+資訊 */}
        <div className="PInfo flex">
          <div className="PInfoImg w-[800px] h-[400px]">
            <img
              className="w-full h-full object-cover"
              src={courseData?.cover_image}
            />
          </div>

          <div className="PInfoContent flex flex-col justify-between">
            <div className="ProductDetail flex flex-col justify-between gap-3 px-8 h-[400px]">
              <div className="ABC flex flex-col gap-4">
                {/* A.日期 */}
                <div className={styles.items}>
                  <IoCalendarNumberOutline />
                  <p>
                    {' '}
                    {courseData?.c_startdate
                      ? courseData.c_startdate.split('T')[0]
                      : '無效日期'}{' '}
                    至{' '}
                    {courseData?.c_enddate
                      ? courseData.c_enddate.split('T')[0]
                      : '無效日期'}
                  </p>
                </div>
                {/* B.名稱 */}
                <div className={styles.items}>
                  <PiTicketDuotone />
                  <div className="">
                    <p>{courseData?.bd_name}</p>
                  </div>
                </div>
                {/* C.地址 */}
                <div className={styles.items}>
                  <GrLocation />
                  <div className="">
                    <p>{courseData?.address}</p>
                  </div>
                </div>
                {/* D.價格 */}
                <div>
                  <p className="text-2xl">$ {courseData?.c_price} NTD</p>
                </div>
              </div>

              <div className="buttons flex flex-row">
                <Button
                  radius="none"
                  className="bg-[#f7f5f1] text-black text-[15px] w-[200px] h-[50px] border-black border-2"
                >
                  LIKE
                  <GoHeart />
                </Button>

                {/* onPress 跳轉到訂單頁面 */}
                <Button
                  radius="none"
                  className="bg-[#000000] text-white text-[15px] w-[200px] h-[50px]"
                  onPress={() => router.push(`/order?c_id=${c_id}`)}
                >
                  BUY
                  <BsArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------ Section2: 課程3特點 ------ */}
      <div className={`${styles.section2} flex flex-row justify-around h-1/3`}>
        {/* 特點一 */}
        <div className={styles.Special}>
          <FiCheckCircle size={40} color="#F17C80" />
          <p className="text-2xl font-bold">{courseData?.c_v1}</p>
          <p>{courseData?.c_vdes1}</p>
        </div>
        {/* 特點二 */}
        <div className={styles.Special}>
          <AiOutlineHeart size={40} color="#F17C80" />
          <p className="text-2xl font-bold">{courseData?.c_v2}</p>
          <p>{courseData?.c_vdes2}</p>
        </div>
        {/* 特點三 */}
        <div className={styles.Special}>
          <FaRegSmileWink size={40} color="#F17C80" />
          <p className="text-2xl font-bold">{courseData?.c_v3}</p>
          <p>{courseData?.c_vdes3}</p>
        </div>
      </div>

      {/* ------ Section3: 課程介紹 ------ */}
      <div className={`${styles.section3} flex flex-col gap-4 h-1/2`}>
        <p className={styles.subtitle}>課程介紹｜Introduction</p>
        <p className={styles.content}>{courseData?.c_desc}</p>
      </div>

      {/* ------ Section4: 場地、聯絡方式 (leaflet地圖) ------ */}
      <div className={`${styles.section4} flex flex-row gap-4`}>
        <div className="Locate flex flex-col gap-4 w-1/2">
          <p className="subtitle">課程地點｜Location</p>
          <div className="map500x400"></div>
          {/* <GoogleMap address={courseData?.address}/> */}
          <Map
            longitude={courseData?.longitude}
            latitude={courseData?.latitude}
            locat_name={courseData?.locat_name}
            address={courseData?.address}
          />
        </div>

        <div className="Contact flex flex-col gap-4 w-1/2">
          <p className="subtitle">聯繫方式｜Contact</p>
          <div className="address h-full flex items-center">
            <div className="addressinner flex flex-col w-2/3 gap-8">
              <p>場地名稱：{courseData?.locat_name}</p>
              <p>場地地址：{courseData?.address}</p>
              <p>品牌電話：{courseData?.bd_tel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------ Section5: 品牌名片 ------ */}
      <div className={`${styles.section5} flex flex-col`}>
        <p className="subtitle">關於品牌｜About Us</p>
        {/* <div className="bg-black> */}

        <div className="flex flex-row gap-4 justify-center items-center">
          {/* 左邊Logo 300*300 */}
          <div className="BLogo w-1/2">
            <img
              className="w-[300px] h-[300px]"
              src="/Blair/brand-logo/logo4.png"
            />
          </div>

          {/* 右Info */}
          <div className="BInfo w-1/2">
            <div className="BInfoinner flex flex-col w-1/2 gap-8">
              <p>{courseData?.bd_name}</p>
              <p>{courseData?.bd_info}</p>
              {/* 跳轉品牌頁面 */}
              <Button
              radius="none"
              className="bg-[#000000] text-white text-[15px] w-[200px] h-[50px]"
              onPress={() => router.push(`/brandsinfo/${courseData?.bd_id}`)}
            > 
              ABOUT US
              </Button>          
            </div>
          </div>
        </div>
      </div>

    </div>

    </motion.div>
    </>
  )
}
