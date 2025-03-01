'use client'
import useSWR from 'swr'
import { MdLocationOn, MdDateRange } from 'react-icons/md'
import { BsCashCoin } from 'react-icons/bs'
import { RiBuildingLine } from 'react-icons/ri'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoShareOutline } from 'react-icons/io5'
import { RiStore2Line } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation' // for buy ticket btn
import Link from 'next/link'
import { Button } from '@heroui/button'
import Loading from "../../loading"


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ExhibitionDetail({ params }) {
  const { e_id } = params

  // ---for buy ticket btn start---
  const router = useRouter() // ✅ 使用 Next.js App Router 的 useRouter
  // ---for buy ticket btn end---

  // Use SWR to fetch exhibition data
  const { data, error } = useSWR(`${API_BASE_URL}/exhibit/api/${e_id}`, fetcher)
  const exhibitionData = data?.data

  console.log(exhibitionData)
  // exhibitionData?.data[0];
  console.log(error)
  if (error) return <div>Error loading exhibition data</div>
  if (!exhibitionData) return <Loading />

  return (
    <div className="min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <main className="pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-gray-900">
              {exhibitionData.e_name}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-center">
              {exhibitionData.e_optionNames?.split(',').map((option, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-900 rounded-full"
                >
                  {option.trim()}
                </span>
              ))}

              {/* Action Buttons */}
              <div className="ml-auto flex gap-4">
                <button className="text-gray-900 hover:underline">
                  <IoMdHeartEmpty size={24} />
                </button>
                <button className="text-gray-900 hover:underline">
                  <IoShareOutline size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image Section */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={
                    exhibitionData.cover_image?.startsWith('http')
                      ? exhibitionData.cover_image
                      : exhibitionData.cover_image
                      ? `http://localhost:3001/uploads/chu-uploads/${exhibitionData.cover_image}`
                      : '/chu-images/img_9.jpg'
                  }
                  alt={exhibitionData.e_name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Exhibition Details */}
              <div className="space-y-4 pt-4 border-t border-gray-300">
                <div className="flex items-center gap-4 text-base">
                  <MdDateRange size={24} className="text-gray-900" />
                  <span>{`${exhibitionData.e_startdate} - ${exhibitionData.e_enddate}`}</span>
                </div>
                <div className="border-t border-black border-[1.5px]"></div>
                <div className="flex items-center gap-4 text-base">
                  <MdLocationOn size={24} className="text-gray-900" />
                  <span>{`${exhibitionData.city}${exhibitionData.district}${exhibitionData.address}`}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <BsCashCoin size={24} className="text-gray-900" />
                  <span>{`$${exhibitionData.e_price} NTD`}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <RiBuildingLine size={24} className="text-gray-900" />
                  <span>{exhibitionData.locat_name}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <RiStore2Line size={24} className="text-gray-900" />
                  <span>{exhibitionData.bd_name}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {exhibitionData.e_abstract}
                </h3>
                <p className="text-gray-700">{exhibitionData.e_desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <a
                  href="#"
                  className="flex-1 py-3 px-4 flex items-center justify-center text-gray-900 hover:underline border border-gray-900 rounded-md"
                >
                  <IoMdHeartEmpty size={20} className="mr-2" />
                  add like
                </a>
                <Button
                  // href={`/order?e_id=${e_id}`} // 這行是配用"Link"
                  className="flex-1 py-3 px-4 flex items-center justify-center text-gray-900 hover:underline border border-gray-900 rounded-md"
                  onClick={() => router.push(`/order?e_id=${e_id}`)} // 改成用 button buy ticket to order page
                >
                  buy ticket
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
