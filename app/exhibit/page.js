"use client"

import { useState, useEffect, useRef } from "react"
import ExhibitionSection from "./_components/ExhibitionSection"
import Image from "next/image"
import Excard from "./_components/Excard"
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import "./exhibit.css"
import Link from "next/link"
import CandidSection from "./_components/candid-section"
import useSWR from "swr"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ExhibitPage() {
  const [selectedExhibition, setSelectedExhibition] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const secondHeroRef = useRef(null)

  const handleExhibitionSelect = (exhibition) => {
    setIsAnimating(true)
    setSelectedExhibition(exhibition)
    if (secondHeroRef.current) {
      secondHeroRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  // 使用 useSWR 獲取展覽資料，從後端拉取數據
  const { data: exhibitions, error } = useSWR(`${API_BASE_URL}/exhibit/`, fetcher)

  if (error) return <div>Error loading exhibitions</div>
  if (!exhibitions) return <div>Loading...</div>

  return (
    <main className="min-h-screen mt-[80px]">
      {/* Exhibition Section */}
      <ExhibitionSection onExhibitionSelect={handleExhibitionSelect} exhibitions={exhibitions.data} />

      {/* First Hero Section */}
      <section id="first-hero-section" className="relative h-[120px] w-full flex items-center justify-between px-20">
        <h1 className="text-xl md:text-xl text-black">Want to Explore More?</h1>
        <Link href="/exhibit/explore" className="group">
          <button className="text-xl px-6 py-4 text-black transition-all rounded-lg cursor-pointer group-hover:underline">
            <span className="transition-all group-hover:text-[1.6em] group-hover:font-bold">See All Exhibition →</span>
          </button>
        </Link>
      </section>

      {/* Second Hero Section */}
      <section id="second-hero-section" ref={secondHeroRef} className="relative h-[560px] w-full overflow-hidden">
        <Image
          src="/chu-images/img-bg.jpg"
          alt="Art gallery interior"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 flex items-stretch h-full">
            {selectedExhibition ? (
              <div className={`slide-in ${!isAnimating ? "active" : ""} flex w-full py-[30px]`}>
                <div className="w-1/2 pr-8 flex items-center justify-center">
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={selectedExhibition.imageUrl || "/placeholder.svg"}
                      alt={selectedExhibition.e_name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/2 pl-8 text-white text-left flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{selectedExhibition.e_name}</h2>
                  <p className="text-xl mb-4">{selectedExhibition.e_desc}</p>
                  <p className="text-lg mb-8">{`${selectedExhibition.e_startdate} - ${selectedExhibition.e_enddate}`}</p>
                </div>
              </div>
            ) : (
              <div
                className={`fade-in-up ${!isAnimating ? "active" : ""} text-center text-white w-full flex flex-col justify-center`}
              >
                <h2 className="text-3xl md:text-6xl font-bold mb-4">EventureArts Online Exhibition</h2>
                <p className="text-xl mb-8">CREATED BY EVENTUREARTS</p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </section>

      <CandidSection />

      {/* See more Exhibition Section */}
      <section className="mb-20 p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Want's new?</h1>
          <a
            href="/exhibit/online"
            className="text-xl font-bold flex items-center gap-2 hover:opacity-70 cursor-pointer"
          >
            Explore More Online Exhibition →
          </a>
        </div>

        <div className="relative">
          <div className="flex gap-6 justify-center">
            {exhibitions?.data?.slice(0, 3).map((exhibition) => (
              <Excard
                key={exhibition.e_id}
                e_id={exhibition.e_id}
                tag={exhibition.e_optionNames}
                image={exhibition.imageUrl || "/chu-images/img_9.jpg"}
                date={`${exhibition.e_startdate} - ${exhibition.e_enddate}`}
                title={exhibition.e_name}
                description={exhibition.e_desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Make Your Own Exhibition Section */}
      <section className="border-t border-b border-black py-8 mb-20 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Make Your Own Exhibition</h2>
          <Link
            href="/user/b/ex-mang/add-off"
            className="text-xl font-bold px-6 py-2 bg-white border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            Create Now →
          </Link>
        </div>
      </section>

      {/* Artist Section */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
          <a href="#" className="text-xl font-bold flex items-center gap-2 hover:opacity-70 cursor-pointer">
            See MORE
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Vinyl record player" fill className="object-cover" priority/>
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Neon ART sign" fill className="object-cover"  priority/>
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Album covers collection" fill className="object-cover"  priority/>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button className="p-2 border border-black cursor-pointer">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button className="p-2 border border-black cursor-pointer">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

