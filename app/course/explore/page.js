'use client'

import React, { useState, useEffect } from 'react'
import Card1 from '../_components/card1';
import { Checkbox } from '@heroui/react';

// import 自定義樣式
import '../_components/style.css'
import './explore.css';

export default function Explore(props) {
  return (
    <>
    <div className="main flex flex-col w-full px-16">

      {/* Top */}
      <div className="topFrame">
        <div className="exploreTop text-center p-4">
          <h1>Explore your Course</h1>
        </div>
      </div>


      {/* Bottom */}
      <div className="exploreBottom flex flex-row p-4">
        {/* Bottom- Left */}
        <div className="SearchArea basis-1/4 justify-items-start">
          {/* 分類區塊 */}
          <div className="flex flex-col gap-4">
            <div>
              分類
            </div>
            <div className="flex flex-col gap-4">
              <Checkbox defaultSelected color="danger">全選</Checkbox>
              <Checkbox defaultSelected color="danger">花藝植栽</Checkbox>
              <Checkbox defaultSelected color="danger">縫紉布藝</Checkbox>
              <Checkbox defaultSelected color="danger">食尚飲品</Checkbox>
              <Checkbox defaultSelected color="danger">身心靈</Checkbox>
              <Checkbox defaultSelected color="danger">音樂舞蹈</Checkbox>
              <Checkbox defaultSelected color="danger">講座分享</Checkbox>
              <Checkbox defaultSelected color="danger">戶外活動</Checkbox>
              <Checkbox defaultSelected color="danger">運動健身</Checkbox>
            </div>
      </div>
        </div>
    
        {/* Bottom- Right */}
        <div className="ResultArea basis-3/4 flex flex-wrap w-1/2 gap-y-8 justify-between px-8">
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </div>

      </div>

    </div>
    </>
  )
}
