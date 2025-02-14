'use client'

import React, { useState, useEffect } from 'react'

export default function CardB1(props) {
  return (
    <>
<a href="#">
  <div className="outside border-y-1 border-black w-[200px] h-[400px]">
    <img className="my-4" src="https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg" alt="" />
    <div className="binfo">
      <p className="text-xl font-bold">Spark Lab</p>
      <p className='my-4'>專注於星象研究的工作室，提供天文講座與觀測體驗，讓星空愛好者探索宇宙奧秘。</p>
    </div>
  </div>
  </a>
    </>
  )
}
