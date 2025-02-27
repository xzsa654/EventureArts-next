"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import useSWR from "swr"

// Base URLs for API and images
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists` // Full API endpoint
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads` // Full image base URL

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ArtistSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const carouselRef = useRef(null)

  // Fetch artists from the backend using the full API endpoint
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)

  // Extract artists from the response using the correct data structure
  const artists = data?.success ? data.data : []

  const visibleArtists = 3 // Number of visible artists at once
  const maxIndex = Math.max(0, artists.length - visibleArtists)

  const nextSlide = useCallback(() => {
    setDirection(1)
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }, [currentIndex, maxIndex])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else {
      setCurrentIndex(maxIndex) // Loop to end
    }
  }, [currentIndex, maxIndex])

  // Auto rotate carousel
  useEffect(() => {
    if (artists.length <= visibleArtists) return // Don't auto-rotate if all artists are visible

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide, artists.length])

  // Handle loading state
  if (isLoading) {
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </section>
    )
  }

  // Handle error state
  if (error) {
    console.error("Error loading artists:", error)
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-red-500">Failed to load artists. Please try again later.</div>
      </section>
    )
  }

  // If no artists found
  if (!artists.length) {
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-gray-500">No artists found.</div>
      </section>
    )
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Artists</h2>
        <Link href="/artists" className="text-xl font-bold flex items-center gap-2 hover:opacity-70 cursor-pointer">
          See MORE
          <ArrowLongRightIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="relative overflow-hidden" ref={carouselRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="grid grid-cols-3 gap-6"
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
            transition={{ duration: 0.5 }}
          >
            {artists.slice(currentIndex, currentIndex + visibleArtists).map((artist) => {
              // Construct the full image URL with the base URL
              const imageUrl = artist.bd_logo
                ? `${IMAGE_BASE_URL}/${artist.bd_logo}`
                : "/placeholder.svg?height=300&width=400"

              return (
                <motion.div
                  key={artist.bd_id}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/artist/${artist.bd_id}`}>
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={artist.bd_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                        unoptimized={true} // Skip Next.js image optimization for external URLs
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white text-xl font-bold">{artist.bd_name}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {artists.length > visibleArtists && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="p-2 border border-black cursor-pointer hover:bg-black hover:text-white transition-colors"
              onClick={prevSlide}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2 border border-black cursor-pointer hover:bg-black hover:text-white transition-colors"
              onClick={nextSlide}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

