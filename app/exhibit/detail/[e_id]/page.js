"use client"

import React from "react"
import { useParams } from "next/navigation"
import { MdLocationOn, MdDateRange } from "react-icons/md"
import { BsCashCoin } from "react-icons/bs"
import { RiBuildingLine } from "react-icons/ri"
import { IoMdHeartEmpty } from "react-icons/io"
import { IoShareOutline } from "react-icons/io5"
import Image from "next/image"

// mock function to simulate fetching data from a backend
const fetchExhibitionDetails = async (e_id) => {
  //  API call using the e_id
  return {
    e_id,
    e_name: "Now/Here: Picasso and His Time 畢卡索",
    e_abstract:
      "Aotearoa artist Hana Pera Aoake reflects on their visit to the Venice Biennale and the questions posed by its central exhibition, 草間彌生",
    e_desc:
      "這是會上下滑動的區域, 藉由直線, 相鄰直線上下方向相反現年96歲的草間彌生是當代藝術史上最具代表性及親覽性的創作者之一。她的作品涉及繪畫、雕塑、拼貼、版畫、行為展演等多領域, 並以其鮮豔的色彩和圓點圖案聞名。本展將展出1951年至2005年間的70件作品, 並緊焦於草間彌生藝術生涯的關鍵時期和創作探索。",
    e_startdate: "2024-08-24",
    e_enddate: "2024-10-10",
    e_price: 300,
    locat_name: "ABC Gallery",
    address: "台北市大安區復興南路一段390號3樓",
    district: "大安區",
    imageUrl: "/chu-images/img_9.jpg",
  }
}

export default function ExhibitionDetail() {
  const params = useParams()
  const [exhibitionData, setExhibitionData] = React.useState(null)

  React.useEffect(() => {
    fetchExhibitionDetails(params.e_id).then(setExhibitionData)
  }, [params.e_id])

  if (!exhibitionData) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <main className="pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="space-y-4 mb-8">
            <h2 className="text-5xl font-bold">{exhibitionData.e_name}</h2>

            {/* Tags */}
            <div className="flex gap-2 items-center">
              <span className="px-4 py-2 border border-black rounded-full">ABC Arts</span>
              <span className="px-4 py-2 border border-black rounded-full">ABC Arts</span>
              <span className="px-4 py-2 border border-black rounded-full">藝術裝置與展覽設計</span>

              {/* Action Buttons */}
              <div className="ml-auto flex gap-4">
                <button className="text-black hover:underline">
                  <IoMdHeartEmpty size={24} />
                </button>
                <button className="text-black hover:underline">
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
                  src={exhibitionData.imageUrl || "/placeholder.svg"}
                  alt="Exhibition space"
                  fill
                  className="rounded-lg"
                />
              </div>

              {/* Exhibition Details */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-base">
                  <MdDateRange size={24} className="text-black" />
                  <span>{`${exhibitionData.e_startdate} - ${exhibitionData.e_enddate}`}</span>
                </div>
                <div className="border-t border-black border-[1px]"></div>
                <div className="flex items-center gap-4 text-base">
                  <MdLocationOn size={24} className="text-black" />
                  <span>{`${exhibitionData.address}, ${exhibitionData.district}`}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <BsCashCoin size={24} className="text-black" />
                  <span>{`$${exhibitionData.e_price} NTD`}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <RiBuildingLine size={24} className="text-black" />
                  <span>{exhibitionData.locat_name}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{exhibitionData.e_abstract}</h3>
                <p className="">{exhibitionData.e_desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <a
                  href="#"
                  className="text-xl font-bold flex-1 py-3 px-4 flex items-center justify-center text-black hover:underline"
                >
                  <IoMdHeartEmpty size={20} className="mr-2" />
                  add like
                </a>
                <a
                  href="#"
                  className="text-xl font-bold flex-1 py-3 px-4 flex items-center justify-center text-black hover:underline"
                >
                  buy ticket
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

