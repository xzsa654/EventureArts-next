'use client'

import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from "@heroui/react";
import { DateRangePicker } from "@heroui/react";
import { Input } from "@heroui/react";
import BtnCTA from './btnCTA';

// import 自定義樣式
import './style.css';

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

export default function Searchbox() {
  return (
    <>
    <div className="Searchbar w-full flex flex-row justify-between my-4">
        <div className="leftbar flex flex-row">
            {/* SelectRegion 選擇地區 */}
            <div className="SelectRegion w-[330px] px-4">
            <Select
                isRequired
                className=""
                label="行政區域"
                variant="underlined"
                radius="none"
                defaultSelectedKeys={["台北市全部"]}
            >
                {regions.map((region) => (
                <SelectItem key={region.key}>{region.label}</SelectItem>
            ))}</Select>
            </div>

            {/* Keywords 關鍵字搜索 */}
            <div className="Keywords w-[330px] px-4">
            <Input 
            className=""
            label="關鍵字搜尋" 
            placeholder="搜尋課程名稱、品牌名稱"  
            type="text" 
            radius='none'
            variant='underlined'
            />
            </div>
        </div>

        <div className="rightbar flex">
            <BtnCTA text={'去探索'} />
        </div>
    </div>    
    </>
  );
}