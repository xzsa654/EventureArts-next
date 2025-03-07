"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ExhibitionSection from "./_components/ExhibitionSection"
import Image from "next/image"
import "./exhibit.css"
import Link from "next/link"
import OnlineBanner from "./_components/OnlineBanner"
import useSWR from "swr"
import Loading from "./loading"
import ArtistSection from "./_components/ArtistSection"
import OnlineSwiper from "./_components/OnlineSwiper"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ExhibitPage() {
  const [selectedExhibition, setSelectedExhibition] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const secondHeroRef = useRef(null)

  // Create query string for fetching exhibitions
  const createQueryString = useCallback((params) => {
    const queryParams = { ...params }
    return Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")
  }, [])

  // Fetch offline exhibitions with filters
  const { data: offlineData, error: offlineError } = useSWR(
    `${API_BASE_URL}/exhibit?${createQueryString({
      exhibition_form: "offline",
      sort: "asc",
      page: 1,
      perPage: 10,
    })}`,
    fetcher,
  )

  // Fetch online exhibitions with filters
  const { data: onlineData, error: onlineError } = useSWR(
    `${API_BASE_URL}/exhibit?${createQueryString({
      exhibition_form: "online",
      sort: "desc",
      page: 1,
      perPage: 8, // Limit to 8 online exhibitions
    })}`,
    fetcher,
  )

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

  // Handle loading and error states with better UI
  if (offlineError || onlineError) {
    return (
      <div className="min-h-[calc(100vh-80px)] mt-[80px] flex items-center justify-center bg-white">
        <div className="text-xl font-medium text-red-600">Error loading exhibitions. Please try again later.</div>
      </div>
    )
  }

  if (!offlineData || !onlineData) {
    return <Loading />
  }

  // Get the actual arrays from the response
  const offlineExhibitions = offlineData.data || []
  const onlineExhibitions = onlineData.data || []

  return (
    <main className="min-h-screen mt-[80px] relative">
      {/* Exhibition Section */}
      <ExhibitionSection onExhibitionSelect={handleExhibitionSelect} exhibitions={offlineExhibitions} />

      {/* First Hero Section */}
      <section id="first-hero-section" className="relative h-[120px] w-full flex items-center justify-between px-20">
        <h1 className="text-xl md:text-xl text-black">Want to Explore More?</h1>
        <Link href="/exhibit/explore" className="group">
          <button className="text-xl px-6 py-4 text-black transition-all rounded-lg cursor-pointer group-hover:underline">
            <span className="transition-all group-hover:text-[1.6em] group-hover:font-bold">See All Exhibition →</span>
          </button>
        </Link>
      </section>

      {/* Second Hero Section with AnimatePresence */}
      <AnimatePresence>
        {selectedExhibition && (
          <motion.section
            id="second-hero-section"
            ref={secondHeroRef}
            className="relative h-[560px] w-full overflow-hidden bg-black"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/chu-images/img-bg.jpg"
              alt="Art gallery interior"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <motion.div
                  className="flex flex-col md:flex-row gap-8 md:gap-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Left Column - Date and Image */}
                  <motion.div
                    className="w-full md:w-1/3 space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-white/80">
                      <p className="text-sm uppercase tracking-wider mb-1">Published</p>
                      <p className="font-serif text-lg">{selectedExhibition.e_startdate}</p>
                    </div>
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={
                          selectedExhibition.cover_image?.startsWith("http")
                            ? selectedExhibition.cover_image
                            : selectedExhibition.cover_image
                              ? `http://localhost:3001/uploads/chu-uploads/${selectedExhibition.cover_image}`
                              : "/chu-images/img_5.jpg"
                        }
                        alt={selectedExhibition.e_name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Right Column - Content */}
                  <motion.div
                    className="w-full md:w-2/3 text-white"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="font-serif text-3xl md:text-5xl mb-6">{selectedExhibition.e_name}</h2>
                    <p className="text-lg mb-8 line-clamp-3">{selectedExhibition.e_desc}</p>
                    <Link
                      href={`/exhibit/detail/${selectedExhibition.e_id}`}
                      className="inline-block px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded-md"
                    >
                      See More
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="relative">
        <OnlineBanner />
      </section>

      {/* Explore more online Exhibition Section */}
      {/* <section className="py-8 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-white">Want's new?</h1>
            <Link href="/exhibit/online" className="group">
              <button className="text-xl px-6 py-4 text-white transition-all rounded-lg cursor-pointer group-hover:underline">
                <span className="transition-all group-hover:text-[1.6em] group-hover:font-bold">
                  Explore More Online Exhibition →
                </span>
              </button>
            </Link>
          </div> */}

          {/* Online Exhibition Swiper(OnlineExhibitionCard is in this section) */}
          <OnlineSwiper onlineExhibitions={onlineExhibitions}/>
          {/* <div className="relative">
            <div className="flex gap-6 justify-center">
              {Array.isArray(onlineExhibitions) &&
                onlineExhibitions.map((exhibition) => (
                  <OnlineExhibitionCard
                    key={exhibition.e_id}
                    e_id={exhibition.e_id}
                    tag={exhibition.e_optionNames}
                    cover_image={exhibition.cover_image || `/placeholder.svg`}
                    date={`${exhibition.e_startdate} - ${exhibition.e_enddate}`}
                    title={exhibition.e_name}
                    description={exhibition.e_desc}
                    artist={exhibition.bd_name}
                  />
                ))}
            </div>
          </div> */}
        {/* </div>
      </section> */}

      {/* Make Your Own Exhibition Section */}
      <section className="border-t border-b-2 border-black/30 py-8 mb-1 p-6">
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
      <ArtistSection />
    </main>
  )
}

