'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { HiArrowRight } from 'react-icons/hi'
import { useAuth } from '@/hooks/use-auth'
import Image from 'next/image'
import { BRANDSDATA } from '@/lib/brands-api'
export default function BPlayerProfile(props) {
  const [brand, setBrand] = useState([])
  const { getAuthHeader, auth } = useAuth()
  // 獲取brand 的相關資料
  useEffect(() => {
    if (auth?.token) {
      fetch(BRANDSDATA, { headers: { ...getAuthHeader() } })
        .then((r) => r.json())
        .then((res) => {
          console.log(res)

          setBrand(res.body)
        })
    }
  }, [auth?.token])

  return (
    <>
      <div className="flex w-full h-[820px]">
        {/* 左邊 */}
        <div className=" w-4/5 flex flex-col border-r-1 border-black ">
          {/* 左上方 */}
          <div className="relative p-5 h-3/5 flex items-stretch gap-5 border-b border-black">
            <div className="flex flex-col justify-between">
              <div className="w-1/6  h-auto flex flex-col justify-between pt-28">
                {/* banner 貼齊上方 */}
                <h5 className="text-4xl font-bold -rotate-90 ">banner</h5>
              </div>
              <div className="flex flex-col">
                {/* <Button
                  radius="none"
                  variant="bordered"
                  className="px-4 text-12 border-green-600 text-primary hover:text-green-600 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mb-2"
                >
                  創意生成 Banner
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
                <Button
                  radius="none"
                  variant="bordered"
                  className="px-4 text-12 border-green-600 text-primary hover:text-green-600 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 mb-2 "
                >
                  上傳新的 Banner
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button> */}
              </div>
            </div>

            {/* 右側圖片填滿 */}
            <div className="w-5/6 overflow-hidden">
              <Image
                src={
                  brand?.bd_img
                    ? `http://localhost:3001/uploads/brand-logo/${brand?.bd_img}`
                    : ''
                }
                alt="Banner Image"
                className="w-full h-full object-cover "
                width={800}
                height={250}
              />
            </div>
          </div>
          {/* 左下方 */}
          <div className="h-2/5 gap-4 p-4 flex items-center justify-center border-b-1 border-black">
            {/* 縮小左側圖片區域，確保與 info 對齊 */}
            <div className="min-w-[250px] flex flex-col justify-center items-center">
              <div className="w-[250px] h-[250px] overflow-hidden relative">
                <Image
                  width={250}
                  height={250}
                  alt="logo"
                  src={`http://localhost:3001/uploads/brand-logo/${brand?.bd_logo}`}
                  className="object-cover w-full h-full"
                ></Image>
              </div>

              {/* <div className="flex justify-around w-[400]">
                <Button
                  radius="none"
                  variant="bordered"
                  className="px-4 text-12 border-green-600 text-primary hover:text-green-600 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
                >
                  創意生成 Logo
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
                <Button
                  radius="none"
                  variant="bordered"
                  className="px-4 text-12 border-green-600 text-primary hover:text-green-600 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
                >
                  上傳新 Logo
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
              </div> */}
            </div>

            {/* 右側文字區域，確保與圖片同高 */}
            <div className="flex-1 h-[250px] flex flex-col justify-between  p-4">
              {/* 讓 info 貼齊上方，與 dl 分開 */}
              <h3 className="text-6xl text-start font-bold pb-4">info</h3>

              {/* 品牌資訊區塊，確保與 info 間距夠大 */}
              <div className="flex flex-col gap-2">
                <dl className="text-base flex font-cn justify-between">
                  <dt>品牌名稱：</dt>
                  <dd>{brand?.bd_name}</dd>
                </dl>

                <dl className="text-base flex font-cn justify-between">
                  <dt>電話：</dt>
                  <dd>{brand?.bd_tel}</dd>
                </dl>
                <dl className="text-base flex font-cn justify-between">
                  <dt>地址：</dt>
                  <dd>{brand?.bd_address}</dd>
                </dl>
                <dl className="text-base flex font-cn justify-between">
                  <dt>品牌聯絡信箱：</dt>
                  <dd>{brand?.bd_email}</dd>
                </dl>
                <dl className="text-base flex font-cn justify-between">
                  <dt>品牌官方網站：</dt>
                  <dd>{brand?.bd_website}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* 右邊 */}
        <div className=" w-1/5 flex flex-col">
          {/* 右上方*/}
          <div className="h-2/3 p-4 flex flex-col border-b-1 border-black">
            <div className="flex items-center justify-center gap-2 h-5/6">
              <div className="w-1/5">
                <h6 className="font-cn font-semibold text-3xl">品牌簡介</h6>
              </div>
              <div className=" w-4/5 font-cn text-12">{brand?.bd_info}</div>
            </div>

            {/* 讓 Insight 貼齊底部 */}
            <div className="h-1/6 flex justify-center items-end">
              <h6 className="text-3xl text-center font-bold">Insight</h6>
            </div>
          </div>

          {/* 右下方 */}
          <div className="h-1/3 p-4 flex flex-col items-center justify-around">
            <svg
              width="160"
              height="67"
              viewBox="0 0 160 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M81.9824 3.51626C82.7588 3.22974 113.564 -0.436154 128.237 0.636433C135.519 1.17273 148.733 2.54652 154.987 7.46132C160.573 11.1713 161.738 17.0411 157.223 22.0441C153.88 25.7541 149.897 29.1188 145.656 31.69C133.068 39.3304 103.341 47.5291 102.464 47.5952C102.371 47.294 130.243 37.1117 140.688 29.082C143.219 27.1426 145.541 24.6815 147.317 22.0147C150.163 17.7464 149.229 13.5956 145.124 10.5175C139.667 6.42547 133.212 5.11044 126.713 4.12601C112.414 1.9588 82.0543 3.86154 81.9824 3.50891V3.51626Z"
                fill="black"
              />
              <path
                d="M12.9817 32.1812C8.22255 37.882 8.91989 43.8254 15.5626 46.8227C21.5583 49.5262 57.863 53.6623 63.1542 53.7578C62.2412 54.0223 12.4348 58.4816 4.16741 48.9312C0.385513 45.1552 -2.0003 38.9767 2.28438 34.1574C5.36849 30.6898 8.99178 27.4868 12.9098 25.0624C28.7833 15.2108 65.7998 6.27745 66.4899 6.33623C66.6265 6.35092 23.2836 19.8391 12.9817 32.1812Z"
                fill="black"
              />
              <path
                d="M95.9412 32.3359L97.4653 35.6933C98.4789 37.9266 100.672 39.3592 103.08 39.3665L106.696 39.3812L103.411 40.9387C101.225 41.9745 99.8233 44.2152 99.8161 46.6763L99.8017 50.3716L98.2776 47.0142C97.264 44.7809 95.0713 43.3483 92.663 43.341L89.0469 43.3263L92.3323 41.7688C94.5178 40.733 95.9196 38.4923 95.9268 36.0312L95.9412 32.3359Z"
                fill="black"
              />
              <path
                d="M79.4648 36.4424L82.4482 44.4941C83.3037 46.8009 85.3813 48.3878 87.7825 48.5788L96.1865 49.24L88.3073 52.2888C86.0499 53.163 84.4971 55.2861 84.3102 57.7398L83.6632 66.3279L80.6797 58.2761C79.8242 55.9693 77.7466 54.3825 75.3454 54.1915L66.9414 53.5303L74.8206 50.4815C77.078 49.6073 78.6308 47.4842 78.8177 45.0304L79.4648 36.4424Z"
                fill="black"
              />
            </svg>
            <Button
              radius="none"
              className="px-12 text-base bg-green-600 text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
            >
              編輯
              <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
