'use client'

import React, { useState, useEffect } from 'react'
import { BracketsIcon, StatusIcon } from '@/public/Yao/icons'

export default function RegisterSection({
  nowStatus = '',
  test = {
    first: 'complete',
    second: 'normal',
    third: 'normal',
  },
}) {
  const st = {
    normal: { color: '#FFFFFF', text: 'white' },
    now: { color: '#FFC45C', text: 'yellow' },
    complete: { color: '#91D9CE', text: 'green' },
  }
  console.log(test.second)

  const { text: f1t, color: f1c } = st[test.first || 'complete']
  const { text: f2t, color: f2c } = st[test.second || 'normal']
  const { text: f3t, color: f3c } = st[test.third || 'normal']

  return (
    <>
      <div className="flex items-center gap-1  w-full">
        {/* 左侧项目 */}
        <div className="flex items-center ">
          <div className={`flex flex-col  text-${f1t}  `}>
            <StatusIcon color={f1c} />
            <div className={`text-${f1t} ${nowStatus ? '' : 'h-[36px]'} `}>
              基本資料
              <div>{nowStatus}</div>
            </div>
          </div>
        </div>

        {/* 中间项目 */}
        <div className="flex items-center">
          <div className="flex flex-col ">
            <StatusIcon color={f2c} />
            <div className={`text-${f2t} h-[36px]`}>大頭貼</div>
          </div>
        </div>

        {/* 右側项目 */}
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <BracketsIcon color={f3c} />
            <div className={`text-${f3t} w-full h-[36px]`}>興趣列表</div>
          </div>
        </div>
      </div>
    </>
  )
}
