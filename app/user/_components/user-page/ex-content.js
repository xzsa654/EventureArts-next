'use client'

import React, { useState, useEffect } from 'react'
import { Image, Link } from '@heroui/react'

export default function CourseMangContent(props) {
  const tableData = [
    {
      id: 24,
      name: '生活裡的花與器｜風格美感花藝選搭課',
      date: '20250112-20250522',
      address: '台灣台北市沅陵街1-1號',
      price: '$ 1,200 NTD',
    },
    {
      id: 24,
      name: '生活裡的花與器｜風格美感花藝選搭課',
      date: '20250112-20250522',
      address: '台灣台北市沅陵街1-1號',
      price: '$ 1,200 NTD',
    },
    {
      id: 24,
      name: '生活裡的花與器｜風格美感花藝選搭課',
      date: '20250112-20250522',
      address: '台灣台北市沅陵街1-1號',
      price: '$ 1,200 NTD',
    },
    {
      id: 24,
      name: '生活裡的花與器｜風格美感花藝選搭課',
      date: '20250112-20250522',
      address: '台灣台北市沅陵街1-1號',
      price: '$ 1,200 NTD',
    },
    {
      id: 24,
      name: '生活裡的花與器｜風格美感花藝選搭課',
      date: '20250112-20250522',
      address: '台灣台北市沅陵街1-1號',
      price: '$ 1,200 NTD',
    },
  ]
  return (
    <>
      <div className="w-full h-[21px]   border-t-[6px] border-black"></div>
      <div className=" flex justify-center items-center  h-12 border-t-1 border-b-1 border-black">
        <h6 className=" font-cn  font-medium text-xl">所有展覽</h6>
      </div>
      {/* 表格 */}
      <table className="w-full h-5/6">
        <thead>
          <tr className="w-full ">
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              課程ID
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              課程名稱
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              課程日期
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              課程地點
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              價格
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              編輯
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              刪除
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((v, i) => {
            return (
              <tr key={i}>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.id}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.name}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.date}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.price}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.address}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 text-center ">
                  <Link href="#">
                    <Image src="/Yao/user/edit.svg" alt="edit" />
                  </Link>
                </td>
                <td className=" py-4 border-b-1 border-black text-12 text-center ">
                  <Link href="#">
                    <Image src="/Yao/user/trash-can.svg" alt="trash" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
