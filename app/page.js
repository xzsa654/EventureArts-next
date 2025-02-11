'use client'

import React, { useState, useEffect } from 'react'
import styles from './homepage.module.css'

export default function AppPage() {
  return (
    <>
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
      </div>
    </>
  )
}
