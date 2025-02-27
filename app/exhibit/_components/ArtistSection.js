"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import Link from "next/link"
import useSWR from "swr"

// Base URLs for API and images
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists`
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads`

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

// Animation variants for cards
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

// Define different card sizes with varying widths and heights
const cardSizes = [
  { width: "w-[180px]", height: "h-[220px]" }, // Normal
  { width: "w-[240px]", height: "h-[180px]" }, // Wide
  { width: "w-[200px]", height: "h-[260px]" }, // Tall
  { width: "w-[220px]", height: "h-[200px]" }, // Medium
  { width: "w-[160px]", height: "h-[240px]" }, // Narrow tall
]

function ArtistCard({ artist, index, size }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`relative cursor-pointer perspective ${size.width} ${size.height}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      style={{
        margin: `${Math.random() * 10}px`, // Random margin for staggered effect
      }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={artist.bd_logo ? `${IMAGE_BASE_URL}/${artist.bd_logo}` : "/placeholder.svg"}
              alt={artist.bd_name}
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white text-lg font-bold leading-tight">{artist.bd_name}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 flex flex-col h-full">
            <h3 className="text-lg font-bold mb-2">{artist.bd_name}</h3>
            <Link
              href={`/artist/${artist.bd_id}`}
              className="mt-auto inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              View Profile
              <ArrowLongRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ArtistSection() {
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)
  const artists = data?.success ? data.data : []

  // Limit the number of displayed artists and assign random sizes
  const displayLimit = 8 // Show max 8 artists
  const displayedArtists = artists.slice(0, displayLimit).map((artist, index) => ({
    ...artist,
    size: cardSizes[Math.floor(Math.random() * cardSizes.length)], // Random size
  }))

  // Handle loading state
  if (isLoading) {
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="masonry-grid h-[750px] bg-gray-50 rounded-lg animate-pulse">
          <div className="flex items-center justify-center h-full text-gray-400">Loading artists...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-red-500">Failed to load artists. Please try again later.</div>
      </section>
    )
  }

  if (!artists.length) {
    return (
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-gray-500">No artists found.</div>
      </section>
    )
  }

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Artists</h2>
        <Link
          href="/exhibit/artists"
          className="text-xl font-bold flex items-center gap-2 hover:opacity-70 cursor-pointer"
        >
          See MORE
          <ArrowLongRightIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="masonry-grid max-h-[750px] overflow-hidden">
        {displayedArtists.map((artist, index) => (
          <ArtistCard key={artist.bd_id} artist={artist} index={index} size={artist.size} />
        ))}
      </div>
    </section>
  )
}

