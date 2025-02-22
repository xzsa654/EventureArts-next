'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Image, Link, Checkbox, addToast, Button } from '@heroui/react'

export default function ExMangContent(props) {
  const [isSelected, setIsSelected] = React.useState([
    true,
    true,
    true,
    true,
    true,
  ])
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
  const checkboxHandle = (index) => {
    setIsSelected((prev) => {
      let newArr = [...prev]
      newArr[index] = !newArr[index]
      return newArr
    })
  }
  return (
    <>
      <div className="w-full h-[21px]   border-t-[6px] border-black"></div>
      <div className=" flex justify-center items-center  h-12 border-t-1 border-b-1 border-black">
        <h6 className=" font-cn  font-medium text-xl">所有展覽</h6>
      </div>
      {/* 表格 */}
      <table className="w-full h-5/6">
        <thead className="max-sm:hidden">
          <tr className="w-full ">
            <th className="text-start   text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              展覽ID
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              展覽名稱
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              展覽日期
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              展覽狀態
            </th>
            <th className="text-start  text-16 font-cn  border-b-3 border-black p-[10px] font-regular">
              展覽地點
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
                <td className=" py-4 border-b-1 border-black text-12  ">
                  {v.id}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 ">
                  {v.name}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 max-sm:hidden ">
                  {v.date}
                </td>
                <td className=" py-4 border-b-1  border-black text-12 max-sm:hidden ">
                  <Checkbox
                    isSelected={isSelected[i]}
                    onChange={() => {
                      addToast({
                        title: '狀態更新',
                        color: 'danger',
                        classNames: {
                          base: [
                            'bg-default-50 dark:bg-background shadow-sm',
                            'border-1',
                            "relative before:content-[''] before:absolute before:z-10",
                            'before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1',
                            'rounded-l-none border-l-0',
                            'min-w-[350px]',
                            'rounded-md',
                            'flex flex-col items-start',
                            'before:bg-primary border-primary-200 dark:border-primary-100',
                          ],
                          icon: 'w-6 h-6 fill-current',
                          closeButton: 'closeMe',
                        },
                        description: `是否要進行展覽${
                          isSelected ? '下架' : '上架'
                        }操作`,
                        endContent: (
                          <div className="ms-12 my-2 flex gap-x-2">
                            <Button
                              className="bg-red text-white"
                              size="sm"
                              onPress={() => {
                                checkboxHandle(i)
                                const close = document.querySelector('.closeMe')
                                close.click()
                              }}
                              variant="flat"
                            >
                              確定
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => {
                                const close = document.querySelector('.closeMe')
                                close.click()
                              }}
                            >
                              取消
                            </Button>
                          </div>
                        ),
                      })
                    }}
                  >
                    {isSelected[i] ? '上架中' : '以下架'}
                  </Checkbox>
                </td>
                <td className=" py-4 border-b-1 border-black text-12 max-sm:hidden ">
                  {v.address}
                </td>
                <td className=" py-4 border-b-1 border-black text-12 text-center  ">
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
