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
        <Card1 className="w-1/4"  
          c_id={200}
          img={"Blair/banner-200.jpg"}
          region={'大安區'}
          cate={'藝術繪畫'}
          pname={"限量開班|Regal Radiance 皇室光芒: 手作水晶皇冠工坊"}
          pdate={"2025-02-14 至 2025-07-27"} 
          pprice={"$ 3950 NTD"}
        />
        <Card1 className="w-1/4"  
          c_id={199}
          img={"Blair/banner-199.jpg"}
          region={'信義區'}
          cate={'講座分享'}
          pname={"柔霧之境 : 60 x 60cm Tufting 簇絨手作地毯"}
          pdate={"2025-02-21 至 2025-06-06"} 
          pprice={"$ 1200 NTD"}
        />
        <Card1 className="w-1/4"  
          c_id={198}
          img={"Blair/banner-198.jpg"}
          region={'北投區'}
          cate={'縫紉布藝'}
          pname={"非洲靈韻木藝手作課|非洲 Asante 木藝文化入門"}
          pdate={"2025-02-14 至 2025-07-27"} 
          pprice={"$ 1200 NTD"}
        />
        <Card1 className="w-1/4"  
          c_id={197}
          img={"Blair/banner-197.jpg"}
          region={'士林區'}
          cate={'縫紉布藝'}
          pname={"創意樂活｜手作家居飾品設計與DIY體驗"}
          pdate={"2025-02-26 至 2025-12-30"} 
          pprice={"$ 880 NTD"}
        />
      </div>
    </div>
    </>
  )
}
