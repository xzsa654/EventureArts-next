'use client'

import React, { Suspense } from 'react'
import '../_components/style.css'
// import styles from './explore.module.css'

// 主要內容組件，包含使用 useSearchParams 的部分
function ExploreContent() {
  const { useState, useEffect } = require('react')
  const { useRouter, useSearchParams } = require('next/navigation')
  const { CheckboxGroup, Checkbox } = require('@heroui/react')
  const Card1 = require('../_components/card1').default

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCate = searchParams.get('cate') // 取得URL內的cate參數

  const [courses, setCourses] = useState([]) // 存放課程
  const [categories, setCategories] = useState([]) // 存放分類
  const [selectedCategories, setSelectedCategories] = useState([]) // 存放選中的分類
  const [categoryMap, setCategoryMap] = useState({}) // 方便查找分類名稱
  const [loading, setLoading] = useState(true) // 增加載入狀態控制

  // ✅ 1. 取得分類資料（動態載入）
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:3001/course/categories')
        const result = await response.json()
        if (result.success && result.data.length > 0) {
          // 轉換為 Checkbox 需要的格式
          const formattedCategories = result.data.map((category) => ({
            label: category.c_optionName, // 顯示分類名稱
            value: String(category.c_optionID), // c_optionID 確保為字串
          }))
          setCategories(formattedCategories) // 不加入「全選」

          // 建立一個 map，方便查找分類名稱
          const map = {}
          result.data.forEach((category) => {
            map[category.c_optionID] = category.c_optionName
          })
          setCategoryMap(map)
        }
      } catch (error) {
        console.error('❌ 無法獲取分類:', error)
      }
    }
    fetchCategories()
  }, [])

  // ✅ 2. 讓 selectedCategories 同步 searchParams 內的 cate
  useEffect(() => {
    if (selectedCate) {
      setSelectedCategories(selectedCate.split(',')) // 支援多選
    } else {
      setSelectedCategories([])
    }
  }, [selectedCate])

  // ✅ 3. 取得課程資料，根據 URL 內的 cate 參數
  useEffect(() => {
    async function fetchCourses() {
      setLoading(true) // 開始載入
      try {
        const queryParam = selectedCate ? `?cate=${selectedCate}` : ''
        const response = await fetch(
          `http://localhost:3001/course/explore${queryParam}`
        )
        const result = await response.json()
        if (result.success) {
          setCourses(result.data)
        }
      } catch (error) {
        console.error('❌ 獲取課程失敗:', error)
      } finally {
        setLoading(false) // 結束載入
      }
    }
    fetchCourses()
  }, [selectedCate]) // 當 URL 內的 cate 變更時，重新請求課程

  // ✅ 4. 處理分類變更，更新 URL（支援多選）
  const handleCategoryChange = (values) => {
    setSelectedCategories(values)
    if (values.length === 0) {
      router.push('/course/explore') // 如果全部取消，則顯示所有課程
    } else {
      router.push(`/course/explore?cate=${values.join(',')}`) // 更新 URL，允許多選
    }
  }

  // 改背景顏色
  useEffect(() => {
    // 進入頁面時修改背景顏色
    document.body.style.backgroundColor = '#f7f5f1'

    // 離開頁面時恢復原本顏色
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  return (
    <div className="mt-20 ">
      <div className="main  flex flex-col w-full px-16">
        {/* 頁面標題 */}
        <div
          className={` border-b-1  border-zinc w-full flex justify-center p-12`}
        >
          <div className="exploreTop">
            <p className="text-[40px] font-bold ">Explore your Course</p>
          </div>
        </div>

        {/* Bottom: 分類篩選及結果 */}
        <div className="exploreBottom flex flex-row px-4 w-full">
          {/* 左側分類篩選 */}
          <div className="SearchArea justify-items-start basis-[22%]">
            <div className="flex flex-col gap-4">
              <p className="py-8">分類選擇｜Categories</p>

              <CheckboxGroup
                value={selectedCategories}
                onChange={handleCategoryChange}
              >
                {categories.map((item) => (
                  <Checkbox
                    key={item.value}
                    value={String(item.value)}
                    color="default"
                    className="py-3"
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>

          {/* Bottom- Right：課程結果 */}
          <div className="Result basis-[78%] pb-16">
            <div className="resultNum">
              <div className="result text-16 text-primary-200 px-8 py-8">
                {courses.length} 個結果｜排序由新到舊
              </div>
            </div>

            <div className="ResultArea flex flex-wrap w-full gap-8 justify-start px-8">
              {loading ? (
                <p className="text-gray-500">載入課程中...</p>
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <Card1
                    // 圖片區域
                    img={course.cover_image}
                    c_id={course.c_id}
                    key={course.c_id}
                    region={course.district}
                    cate={categoryMap[course.c_option] || '未知分類'} // 這裡用 map 查找分類名稱
                    pname={course.c_name}
                    pdate={`${course.c_startdate.split('T')[0]} 至 ${
                      course.c_enddate.split('T')[0]
                    }`}
                    pprice={`NTD $${course.c_price}`}
                  />
                ))
              ) : (
                <p className="text-gray-500">目前沒有符合條件的課程</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 主要導出的組件，使用 Suspense 包裹
export default function Explore() {
  return (
    <Suspense
      fallback={
        <div className="main flex flex-col w-full px-16 min-h-screen items-center justify-center">
          <p className="text-xl">載入課程資訊中...</p>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  )
}
