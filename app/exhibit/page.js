"use client"

import { useState, useEffect, useRef } from "react"
import ExhibitionSection from "./_components/ExhibitionSection"
import Image from "next/image"
import Excard from "./_components/Excard"
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import "./exhibit.css"
import Link from "next/link"
import CandidSection from "./_components/candid-section"

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

  return (
    <main className="min-h-screen mt-[80px]">
      {/* Exhibition Section */}
      <ExhibitionSection onExhibitionSelect={handleExhibitionSelect} />

      {/* First Hero Section */}
      <section id="first-hero-section" className="relative h-[120px] w-full flex items-center justify-between px-20">
        <h1 className="text-xl md:text-xl text-black">Want to Explore More?</h1>
        <Link href="/exhibit/explore">
          <button className="text-xl px-6 py-4 text-black hover:bg-opacity-90 transition-all rounded-lg">
            See All Exhibition →
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
                      src={selectedExhibition.image || "/placeholder.svg"}
                      alt={selectedExhibition.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-1/2 pl-8 text-white text-left flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{selectedExhibition.title}</h2>
                  <p className="text-xl mb-4">{selectedExhibition.subtitle}</p>
                  <p className="text-lg mb-8">{selectedExhibition.date}</p>
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
      <section className="mb-20 p-9">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Want to Explore More Online Exhibition?</h1>
          <a href="/exhibit/online" className="text-xl font-bold flex items-center gap-2 hover:opacity-70">
            Explore More Online Exhibition →
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>
 
        <div className="relative">
          <div className="flex gap-6 justify-center">
            <Excard
              tag="NATURAL"
              image="/chu-images/img_9.jpg"
              date="2025 | Dec.12th -Dec.20th"
              title="Root your designs in earthy visuals that reflect the spirit of"
              description="這是會上下滑動的區域，藉由直線，相鄰..."
            />
            <Excard
              tag="NATURAL"
              image="/chu-images/img_9.jpg"
              date="2025 | Dec.12th -Dec.20th"
              title="Root your designs in earthy visuals that reflect the spirit of"
              description="這是會上下滑動的區域，藉由直線，相鄰..."
            />
            <Excard
              tag="NATURAL"
              image="/chu-images/img_9.jpg"
              date="2025 | Dec.12th -Dec.20th"
              title="Root your designs in earthy visuals that reflect the spirit of"
              description="這是會上下滑動的區域，藉由直線，相鄰..."
            />
          </div>

          <button className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Make Your Own Exhibition Section */}
      <section className="border-t border-b border-black py-8 mb-20 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Make Your Own Exhibition</h2>
          <button className="text-xl font-bold px-6 py-2 bg-white border border-black hover:bg-black hover:text-white transition-colors">
            Create Now →
          </button>
        </div>
      </section>

      {/* Artist Section */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
          <a href="#" className="text-xl font-bold flex items-center gap-2 hover:opacity-70">
            See MORE
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Vinyl record player" fill className="object-cover" />
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Neon ART sign" fill className="object-cover" />
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Album covers collection" fill className="object-cover" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button className="p-2 border border-black">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button className="p-2 border border-black">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

