'use client'

import React, { useState, useEffect } from 'react'
import Card1 from './card1'
import ParaTitle from './para-title'


export default function NewProduct(props) {
  const [testName,setTestName] =useState([])
  useEffect(()=>{
    fetch('http://localhost:3001/course').then(r=>r.json()).then((result)=>{
      console.log(result);
      setTestName(result)
    })
  },[])
  console.log(testName);
  
  return (
    <>
    <div className="div">
    {/* 上方：標題 */}
      <div className="para">
        {testName[0]?.c_id}
          <ParaTitle title="新鮮出爐｜New Products" link="/course/explore" btn="See more" />
      </div>
      
    {/* 下方：卡片區塊 */}
      <div className="cardArea flex flex-wrap justify-evenly gap-4">
        <Card1 className="w-1/4"  />
        <Card1 className="w-1/4" />
        <Card1 className="w-1/4" />
        <Card1 className="w-1/4" />
      </div>
    </div>
    </>
  )
}
