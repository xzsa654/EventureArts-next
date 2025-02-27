"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import useSWR from "swr"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists`
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads`

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ArtistsPage() {
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)
  const artists = data?.success ? data.data : []

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 mt-[80px]">
        <div className="text-center mb-16">
          <p className="text-sm mb-2">(アーティスト)</p>
          <h1 className="text-4xl font-bold">Artist</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 animate-pulse" />
              <div className="h-4 bg-gray-100 animate-pulse w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 mt-[80px]">
        <div className="text-center mb-16">
          <p className="text-sm mb-2">(アーティスト)</p>
          <h1 className="text-4xl font-bold">Artist</h1>
        </div>
        <div className="text-red-500 text-center">Failed to load artists. Please try again later.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 mt-[80px]">
      <div className="text-center mb-16">
        <p className="text-sm mb-2">(アーティスト)</p>
        <h1 className="text-4xl font-bold">Artist</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artists.map((artist) => (
          <motion.div
            key={artist.bd_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group space-y-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
              <Image
                src={artist.bd_logo ? `${IMAGE_BASE_URL}/${artist.bd_logo}` : "/placeholder.svg"}
                alt={artist.bd_name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/20" />
              <div className="absolute bottom-0 left-0 w-full p-4 flex justify-end opacity-0 transform translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <motion.span className="text-white flex items-center gap-2" whileHover={{ x: 5 }}>
                  View More →
                </motion.span>
              </div>
            </div>
            <Link href={`/artist/${artist.bd_id}`} className="block text-lg hover:opacity-70 transition-opacity">
              {artist.bd_name}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

