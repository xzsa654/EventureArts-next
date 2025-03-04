"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import useSWR from "swr"
import "./artist.css"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists`
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads`

const hoverEffects = {
  invert: "hover-invert",
  duotone: "hover-duotone",
  grayscale: "hover-grayscale",
  negative: "hover-negative",
}

const fetcher = (url) => fetch(url).then((res) => res.json())

function ArtistCard({ artist, effectStyle = "invert" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Link href={`/artist/${artist.bd_id}`}>
        <div className={`relative w-[265px] h-[265px] overflow-hidden bg-white ${hoverEffects[effectStyle]}`}>
          <Image
            src={artist.bd_logo ? `${IMAGE_BASE_URL}/${artist.bd_logo}` : "/placeholder.svg"}
            alt={artist.bd_name}
            fill
            className="object-cover transition-all duration-500"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 w-full p-4 flex justify-end">
              <motion.span className="text-white flex items-center gap-2" whileHover={{ x: 5 }}>
                View More →
              </motion.span>
            </div>
          </div>
        </div>
        <h3 className="text-lg mt-3 transition-opacity hover:opacity-70 px-2">{artist.bd_name}</h3>
      </Link>
    </motion.div>
  )
}

export default function ArtistsPage() {
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)
  const artists = data?.success ? data.data : []
  const effects = ["invert", "grayscale", "negative", "invert"]

  if (isLoading) {
    return (
      <div className="min-h-screen px-16 py-8 mt-[80px]">
        <div className="text-center mb-16">
          <p className="text-sm mb-2">(アーティスト)</p>
          <h1 className="text-4xl font-bold">Artist</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-4">
              <div className="w-[265px] h-[265px] bg-gray-100 animate-pulse" />
              <div className="h-4 bg-gray-100 animate-pulse w-24 mx-2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen px-16 py-8 mt-[80px]">
        <div className="text-center mb-16">
          <p className="text-sm mb-2">(アーティスト)</p>
          <h1 className="text-4xl font-bold">Artist</h1>
        </div>
        <div className="text-red-500 text-center">Failed to load artists. Please try again later.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-16 py-8 mt-[80px]">
      <div className="text-center mb-16">
        <p className="text-sm mb-2">(アーティスト)</p>
        <h1 className="text-4xl font-bold">Artist</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
        {artists.map((artist, index) => (
          <ArtistCard key={artist.bd_id} artist={artist} effectStyle={effects[index % effects.length]} />
        ))}
      </div>
    </div>
  )
}

