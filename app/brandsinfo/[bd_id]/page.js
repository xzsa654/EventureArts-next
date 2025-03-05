'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MarqueeExhibit from '../_components/Marquee/marquee-exhibit'
import MarqueeCourse from '../_components/Marquee/marquee-course'
import EventCard from '../_components/event-card'

export default function BrandsPage({ params }) {
  const [exhibitions, setExhibitions] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const bd_id = params?.bd_id // 確保 `bd_id` 不會是 undefined

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

  useEffect(() => {
    if (!bd_id) {
      console.error('錯誤: bd_id 未定義')
      setError('無法獲取品牌資訊')
      setLoading(false)
      return
    }
    const fetchData = async () => {
      try {
        console.log(`發送 API 請求: ${API_BASE_URL}/api/brandsinfo/${bd_id}`)
        const response = await fetch(`${API_BASE_URL}/api/brandsinfo/${bd_id}`)

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`)
        }

        const result = await response.json()
        console.log('API 回應:', result)

        if (result.success) {
          setExhibitions(result.exhibitions)
          setCourses(result.courses)
        } else {
          throw new Error(result.message || '無法載入資料')
        }
      } catch (error) {
        console.error('API 請求錯誤:', error)
        setError('無法載入商家資訊，請稍後再試！')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [bd_id])

  return (
    <>
      {/* 品牌資訊 */}
      <div>brands</div>
      {/* 展覽區塊 */}
      <div>
        exhibit container
        <div className="m-6">
          <MarqueeExhibit className="custom-marquee-one" />
        </div>
        <div className="bg-[#f7f5f1] mx-16 py-4 flex flex-wrap gap-x-8 gap-y-4 justify-center">
          {loading && <p>載入中...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && exhibitions.length === 0 && (
            <div className="text-gray-500 text-center py-10">
              此商家目前尚未上架展覽
            </div>
          )}
          {!loading &&
            !error &&
            exhibitions.map((event) => (
              <EventCard key={event.e_id} event={event} />
            ))}
        </div>
      </div>
      {/* 課程區塊 */}
      <div>
        <div className="m-6">
          <MarqueeCourse className="custom-marquee-two" />
        </div>
        <div className="bg-[#f7f5f1] mx-16 py-4 flex flex-wrap gap-x-8 gap-y-4 justify-center">
          {loading && <p>載入中...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && courses.length === 0 && (
            <div className="text-gray-500 text-center py-10">
              此商家目前尚未上架課程
            </div>
          )}
          {!loading &&
            !error &&
            courses.map((event) => (
              <EventCard key={event.c_id} event={event} />
            ))}
        </div>
      </div>
    </>
  )
}
