'use client'

import React, { useState, useEffect } from 'react'
import styles from './homepage.module.css'
import Link from 'next/link'
export default function AppPage() {
  return (
    <>
      {/* 背景 start */}
      <div className={styles.container}>
        {/* 背景格線 */}
        <div className={styles.gridBackground}></div>

        {/* 第一個動畫區域 (正中央) */}
        <div
          className={`${styles.animationContainer1} ${styles.centerPosition}`}
        >
          <div className={styles.animatedText1}>Eventure</div>
        </div>

        {/* 第二個動畫區域 (左斜上方) */}
        <div className={styles.animationContainer2}>
          <div className={styles.animatedText2}>Arts</div>
        </div>

        {/* 第三個動畫區域 (右下方) */}
        <div className={styles.animationContainer3}>
          <div className={styles.animatedText3}>Arts</div>
        </div>
        {/* 第四個動畫區域 (右側) */}
        <div className={styles.animationContainer4}>
          <div className={styles.animatedText4}>Eventure</div>
        </div>
        {/* 背景 end */}

        {/* courseButton start */}
        <Link href="#" className={`${styles.courseButton} ${styles.btn}`}>
          <div className="h-[178px] flex-col justify-start items-start gap-2 inline-flex">
            <div data-svg-wrapper>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.5887 20L22.6615 21.1656L28.7305 28.7305L21.1656 22.6615L20 36.5887L18.7342 22.6986L0 40L17.3014 21.2658L3.41128 20L17.3348 18.8344L11.2695 11.2695L18.8344 17.3385L20 3.41128L21.2621 17.3088L40 0L22.6949 18.7342L36.5887 20Z"
                  fill="#231815"
                />
              </svg>
            </div>
            <div className=" text-xl font-sans font-semibold tracking-[2.48px]">
              (25,121)
            </div>
            <div className="text-center text-3xl font-bold font-serif tracking-[5.60px]">
              課程
            </div>
            <div className="  text-4xl font-sans font-semibold tracking-[2.48px]">
              Course
            </div>
          </div>
        </Link>
        {/* courseButton end */}

        {/* eventButton start */}
        <Link href="#" className={`${styles.eventButton} ${styles.btn}`}>
          <div className="h-[184.50px] flex-col justify-start items-start gap-2 inline-flex">
            <div data-svg-wrapper>
              <svg
                width="30"
                height="47"
                viewBox="0 0 30 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7598 46.4985L9.78192 35.3867C9.14311 31.7995 7.39864 28.2983 3.87899 27.3646C1.81511 26.8149 0 26.302 0 26.302C0 26.302 1.81511 25.786 3.87899 25.2393C7.40171 24.3026 9.14311 20.8045 9.78192 17.2172L11.7598 6.10547L13.7377 17.2172C14.3765 20.8045 15.8139 24.3057 19.3335 25.2393C21.3974 25.7891 23.2125 26.302 23.2125 26.302C23.2125 26.302 21.3974 26.818 19.3335 27.3646C15.8108 28.3014 14.3765 31.7995 13.7377 35.3867L11.7598 46.4985Z"
                  fill="black"
                />
                <path
                  d="M20.3071 15.0737L19.57 10.9275C19.3305 9.58844 18.6824 8.28316 17.3679 7.93303C16.5971 7.72726 15.9214 7.53684 15.9214 7.53684C15.9214 7.53684 16.5971 7.34335 17.3679 7.14065C18.6824 6.79053 19.3335 5.48525 19.57 4.14619L20.3071 0L21.0442 4.14619C21.2838 5.48525 21.8182 6.79053 23.1327 7.14065C23.9036 7.34643 24.5792 7.53684 24.5792 7.53684C24.5792 7.53684 23.9036 7.73033 23.1327 7.93303C21.8182 8.28316 21.2838 9.58844 21.0442 10.9275L20.3071 15.0737Z"
                  fill="black"
                />
                <path
                  d="M27.4964 23.7159L27.0634 21.2896C26.9252 20.5064 26.5443 19.7417 25.7734 19.539C25.322 19.4192 24.9258 19.3056 24.9258 19.3056C24.9258 19.3056 25.322 19.1919 25.7734 19.0722C26.5413 18.8695 26.9221 18.1047 27.0634 17.3216L27.4964 14.8953L27.9295 17.3216C28.0677 18.1047 28.3809 18.8695 29.1518 19.0722C29.6033 19.1919 29.9995 19.3056 29.9995 19.3056C29.9995 19.3056 29.6033 19.4192 29.1518 19.539C28.384 19.7417 28.0707 20.5064 27.9295 21.2896L27.4964 23.7159Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="  text-xl font-sans font-semibold tracking-[2.48px]">
              (20,143)
            </div>
            <div className="text-center text-3xl font-bold font-serif tracking-[5.60px]">
              辦活動
            </div>
            <div className="  text-4xl font-sans font-semibold tracking-[2.48px]">
              Event
            </div>
          </div>
        </Link>
        {/* eventButton end */}

        {/* exhibitButton start */}
        <Link href="#" className={`${styles.exhibitButton} ${styles.btn}`}>
          <div className="h-[184.71px] flex-col justify-start items-start gap-2 inline-flex">
            <div data-svg-wrapper>
              <svg
                width="30"
                height="47"
                viewBox="0 0 30 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 23.3571C15 23.3571 15 6.86975 15 0C15 6.86975 15 23.3571 30 23.3571C15 23.3571 15 40.7605 15 46.7143C15 40.7605 15 23.3571 0 23.3571Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="  text-xl font-sans font-semibold tracking-[2.48px]">
              (33,160)
            </div>
            <div className="text-center text-3xl font-bold font-serif tracking-[5.60px]">
              展覽
            </div>
            <div className="  text-4xl font-sans font-semibold tracking-[2.48px]">
              Exhibit
            </div>
          </div>
        </Link>
        {/* exhibitButton end */}

        {/* mapButton start */}
        <Link href="#" className={`${styles.mapButton} ${styles.btn}`}>
          <div className="h-[176.91px] flex-col justify-start items-start gap-2 inline-flex">
            <div data-svg-wrapper>
              <svg
                width="40"
                height="39"
                viewBox="0 0 40 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3104 0.0594452C20.7299 5.11889 21.1493 10.1816 21.605 15.71C25.9412 12.041 29.8943 8.69221 33.8507 5.34676C33.9597 5.44914 34.0687 5.55152 34.1777 5.6539C30.819 9.62351 27.4604 13.5931 23.8045 17.9161C29.4914 18.395 34.7457 18.8342 40 19.2768C40 19.4122 40 19.5476 40 19.683C34.782 20.1189 29.5674 20.5581 23.8111 21.0403C27.4736 25.3798 30.8256 29.3494 34.1777 33.319C34.072 33.4214 33.9663 33.5271 33.8606 33.6295C29.9174 30.2807 25.9709 26.9287 21.6149 23.2299C21.1493 28.755 20.7232 33.8243 20.2972 38.8904L19.8018 38.9135C19.3758 33.8573 18.9498 28.8012 18.4808 23.2199C14.105 26.932 10.1552 30.2873 6.20542 33.6394C6.09643 33.537 5.98745 33.4346 5.88177 33.3322C9.24042 29.3626 12.5991 25.393 16.2847 21.037C10.5317 20.5581 5.27081 20.1156 0.00990753 19.6731L0 19.2867C5.24108 18.8474 10.4855 18.4082 16.2946 17.9194C12.6948 13.6757 9.37583 9.76552 6.0535 5.85205C6.17239 5.73316 6.29458 5.61427 6.41347 5.49868C10.3038 8.79458 14.1942 12.0872 18.4841 15.7233C18.9531 10.1453 19.3824 5.07266 19.8085 0C19.9769 0.0198151 20.1453 0.0429326 20.3137 0.0627477L20.3104 0.0594452Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className=" text-xl font-sans font-semibold tracking-[2.48px]">
              (28,255)
            </div>
            <div className="text-center text-3xl font-bold font-serif tracking-[5.60px]">
              地圖探索
            </div>
            <div className=" text-4xl font-sans font-semibold tracking-[2.48px]">
              Map
            </div>
          </div>
        </Link>
        {/* mapButton end */}
        <div className="w-[1920px] h-[29px] px-16 py-1 justify-end items-center inline-flex overflow-hidden absolute bottom-0 left-0 right-0">
          <div className="text-white text-base font-normal font-['IBM Plex Mono'] tracking-wider">
            © 2025 EventureArts. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  )
}
