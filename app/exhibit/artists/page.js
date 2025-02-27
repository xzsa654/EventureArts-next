"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import useSWR from "swr"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists`
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads`

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ArtistsPage() {
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)
  const [selectedArtist, setSelectedArtist] = useState(null)

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 mt-[80px]">
        <h1 className="text-4xl font-bold mb-8">Artists</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 mt-[80px]">
        <h1 className="text-4xl font-bold mb-8">Artists</h1>
        <div className="text-red-500">Failed to load artists. Please try again later.</div>
      </div>
    )
  }

  const artists = data?.success ? data.data : []

  return (
    <div className="min-h-screen p-6 mt-[80px]">
      <h1 className="text-4xl font-bold mb-8">Artists</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <motion.div
            key={artist.bd_id}
            className="group relative aspect-square cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedArtist(artist)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={artist.bd_logo ? `${IMAGE_BASE_URL}/${artist.bd_logo}` : "/placeholder.svg"}
                alt={artist.bd_name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h2 className="text-white text-xl font-bold">{artist.bd_name}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Artist Modal */}
      {selectedArtist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedArtist(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src={selectedArtist.bd_logo ? `${IMAGE_BASE_URL}/${selectedArtist.bd_logo}` : "/placeholder.svg"}
                alt={selectedArtist.bd_name}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">{selectedArtist.bd_name}</h2>
            {/* Add more artist details here */}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

