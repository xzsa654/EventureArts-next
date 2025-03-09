'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckboxGroup, Checkbox } from '@heroui/react'
import Card1 from '../_components/card1'

// import 自定義樣式
import '../_components/style.css'
import styles from './explore.module.css'

// Loading 組件
function LoadingCategories() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-10 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  )
}

function LoadingCourses() {
  return (
    <div className="flex flex-wrap w-full gap-8 justify-start px-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="w-64 h-80 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  )
}

// 分類組件
const Categories = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="py-8">分類選擇｜Categories</p>
      <CheckboxGroup value={selectedCategories} onChange={onCategoryChange}>
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
  )
}

// 課程結果組件
const CourseResults = ({ courses, categoryMap }) => {
  return (
    <>
      <div className="resultNum">
        <div className="result text-16 text-primary-200 px-8 py-8">
          {courses.length} 個結果｜排序由新到舊
        </div>
      </div>
      <div className="ResultArea flex flex-wrap w-full gap-8 justify-start px-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card1
              img={course.cover_image}
              c_id={course.c_id}
              key={course.c_id}
              region={course.district}
              cate={categoryMap[course.c_option] || '未知分類'}
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
    </>
  )
}

// 主要資料取得器 - 使用React 18的資料取得模式
function useCoursesData(selectedCate) {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true)
      try {
        const queryParam = selectedCate ? `?cate=${selectedCate}` : ''
        const response = await fetch(
          `http://localhost:3001/course/explore${queryParam}`
        )
        const result = await response.json()
        if (result.success) {
          setCourses(result.data)
        } else {
          setError(new Error('獲取課程失敗'))
        }
      } catch (error) {
        console.error('❌ 獲取課程失敗:', error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [selectedCate])

  return { courses, isLoading, error }
}

function useCategoriesData() {
  const [categories, setCategories] = useState([])
  const [categoryMap, setCategoryMap] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3001/course/categories')
        const result = await response.json()
        if (result.success && result.data.length > 0) {
          const formattedCategories = result.data.map((category) => ({
            label: category.c_optionName,
            value: String(category.c_optionID),
          }))
          setCategories(formattedCategories)

          const map = {}
          result.data.forEach((category) => {
            map[category.c_optionID] = category.c_optionName
          })
          setCategoryMap(map)
        } else {
          setError(new Error('獲取分類失敗'))
        }
      } catch (error) {
        console.error('❌ 無法獲取分類:', error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return { categories, categoryMap, isLoading, error }
}

export default function Explore() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCate = searchParams.get('cate')
  const [selectedCategories, setSelectedCategories] = useState([])

  // 資料取得 hooks
  const {
    categories,
    categoryMap,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategoriesData()
  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCoursesData(selectedCate)

  // 同步 URL 參數到選中的分類
  useEffect(() => {
    if (selectedCate) {
      setSelectedCategories(selectedCate.split(','))
    } else {
      setSelectedCategories([])
    }
  }, [selectedCate])

  // 處理分類變更
  const handleCategoryChange = (values) => {
    setSelectedCategories(values)
    if (values.length === 0) {
      router.push('/course/explore')
    } else {
      router.push(`/course/explore?cate=${values.join(',')}`)
    }
  }

  // 錯誤處理
  if (categoriesError || coursesError) {
    return (
      <div className="main flex flex-col items-center justify-center w-full px-16 h-[100%] bg-[#f7f5f1]">
        <div className="text-red-500 text-xl">
          資料載入錯誤，請重新整理頁面或稍後再試
        </div>
      </div>
    )
  }

  return (
    <div className="main flex flex-col w-full px-16 m-0 p-0 h-[100%] bg-[#f7f5f1]">
      {/* 頁面標題 */}
      <div className={styles.topframe}>
        <div className={styles.exploreTop}>
          <p className="mt-20">Explore your Course</p>
        </div>
      </div>

      {/* Bottom: 分類篩選及結果 */}
      <div className="exploreBottom flex flex-row px-4 w-full">
        {/* 左側分類篩選 */}
        <div className="SearchArea justify-items-start basis-[22%]">
          <Suspense fallback={<LoadingCategories />}>
            {categoriesLoading ? (
              <LoadingCategories />
            ) : (
              <Categories
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            )}
          </Suspense>
        </div>

        {/* Bottom- Right：課程結果 */}
        <div className="Result basis-[78%] pb-16">
          <Suspense fallback={<LoadingCourses />}>
            {coursesLoading ? (
              <LoadingCourses />
            ) : (
              <CourseResults courses={courses} categoryMap={categoryMap} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
