'use client'
import Image from 'next/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'
import useSWR from 'swr'
import './artist-section.css'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
const API_ENDPOINT = `${API_BASE_URL}/exhibit/artists`
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/chu-uploads`

const fetcher = (url) => fetch(url).then((res) => res.json())

// Define hover effects
const hoverEffects = {
  invert: 'hover-invert',
  duotone: 'hover-duotone',
  grayscale: 'hover-grayscale',
  negative: 'hover-negative',
}

function ArtistCard({ artist, index }) {
  // Cycle through effects
  const effects = ['invert', 'invert', 'grayscale', 'negative']
  const effectStyle = effects[index % effects.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group shrink-0"
    >
      <Link href={`/brandsinfo/${artist.bd_id}`}>
        <div
          className={`relative w-[265px] h-[265px] overflow-hidden bg-white ${hoverEffects[effectStyle]}`}
        >
          <Image
            src={
              artist.bd_logo
                ? `${IMAGE_BASE_URL}/${artist.bd_logo}`
                : '/placeholder.svg'
            }
            alt={artist.bd_name}
            fill
            className="object-cover transition-all duration-500"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 w-full p-4 flex justify-end">
              <motion.span
                className="text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                View More →
              </motion.span>
            </div>
          </div>
        </div>
        <h3 className="text-base font-bold mt-3 transition-opacity hover:opacity-70 px-2">
          {artist.bd_name}
        </h3>
      </Link>
    </motion.div>
  )
}

export default function ArtistSection() {
  const { data, error, isLoading } = useSWR(API_ENDPOINT, fetcher)
  let artists = data?.success ? data.data : []

  if (artists.length) {
    const fixedArtists = [53, 54, 55, 52, 51]
      .map((id) => artists.find((artist) => artist.bd_id === id))
      .filter(Boolean)

    const randomPool = artists.filter(
      (artist) => artist.bd_id >= 56 && artist.bd_id <= 75
    )

    for (let i = randomPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[randomPool[i], randomPool[j]] = [randomPool[j], randomPool[i]]
    }

    artists = [...fixedArtists, ...randomPool].slice(0, 22)
  }

  // Handle loading state
  if (isLoading) {
    return (
      <section className="px-16 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shrink-0 space-y-4">
              <div className="w-[265px] h-[265px] bg-gray-100 animate-pulse" />
              <div className="h-4 bg-gray-100 animate-pulse w-24 mx-2" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="px-16 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-red-500">
          Failed to load artists. Please try again later.
        </div>
      </section>
    )
  }

  if (!artists.length) {
    return (
      <section className="px-16 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Artists</h2>
        </div>
        <div className="text-gray-500">No artists found.</div>
      </section>
    )
  }

  return (
    <section className="px-16 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Artists</h2>
        <Link href="/exhibit/artists" className="group">
          <button className="text-xl font-bold px-6 py-4 text-black transition-all rounded-lg cursor-pointer group-hover:underline flex items-center gap-2">
            <span className="transition-all group-hover:text-[1.6em] group-hover:font-bold">
              See More
            </span>
            <ArrowLongRightIcon className="w-5 h-5" />
          </button>
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {artists.map((artist, index) => (
          <ArtistCard key={artist.bd_id} artist={artist} index={index} />
        ))}
      </div>
    </section>
  )
}
