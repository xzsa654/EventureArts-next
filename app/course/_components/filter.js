'use client'

import React, { useState, useEffect } from 'react'
import {CheckboxGroup, Checkbox} from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { DateRangePicker } from "@heroui/react";
import { Input } from "@heroui/react";
import CateSelect from '../_components/cate-select';
import { useRouter, useSearchParams } from 'next/navigation';



export default function Filter(props) {
    // 行政區域選項
    const regions = [
        { key: "台北市全部", label: "台北市全部" },
        { key: "中正區", label: "中正區" },
        { key: "大同區", label: "大同區" },
        { key: "中山區", label: "中山區" },
        { key: "松山區", label: "松山區" },
        { key: "大安區", label: "大安區" },
        { key: "萬華區", label: "萬華區" },
        { key: "信義區", label: "信義區" },
        { key: "士林區", label: "士林區" },
        { key: "北投區", label: "北投區" },
        { key: "內湖區", label: "內湖區" },
        { key: "南港區", label: "南港區" },
        { key: "文山區", label: "文山區" },
      ];

    const searchParams = useSearchParams();
    const router = useRouter();

    // 篩選器設置
    const FilterChange = (e) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set(e.target.name, e.target.value);
        router.push(`/course/explore?${newParams.toString()}`, { scroll: false });
    };
    
    
  return (
    <>
<div className="SearchArea basis-1/4 justify-items-start">
    {/* 1. 關鍵字 */}
    <div className="flex flex-col gap-4 w-full">
    <p className='condition'>關鍵字</p>
    <div className="flex flex-col gap-4 w-[90%]">
        <Input 
        className=""
        // label="關鍵字搜尋" 
        placeholder="搜尋課程名稱、品牌名稱"  
        type="text" 
        radius='none'
        variant='underlined'
        />
    </div>
    </div>        

    {/* 2. 時間 */}
    <div className="flex flex-col gap-4 w-full">
    <p className='condition'>時間</p>
    <div className="flex flex-col gap-4 w-[90%]">
    <DateRangePicker
        className=""
        // label="日期區間"
        variant="underlined"
        radius="none"
    />
    </div>
    </div>        

    {/* 3. 地點 */}
    <div className="flex flex-col gap-4 w-full">
    <p className='condition'>地點</p>
    <div className="SelectRegion w-[90%]">
    <Select
        isRequired
        className="text-lg"
        variant="underlined"
        radius="none"
        defaultSelectedKeys={["台北市全部"]}
    >
        {regions.map((region) => (
        <SelectItem key={region.key}>{region.label}</SelectItem>
    ))}</Select>
    </div>            
    </div>        

    {/* 4. 分類區塊 */}
    <div className="flex flex-col gap-4">
    <p className='condition'>分類</p>
    <div className="flex flex-col gap-4">
    <CateSelect />
    </div>
    </div>
</div>

    </>
  )
}
