"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@heroui/react"
import Link from "next/link"
import { FiInfo, FiShare2, FiArrowLeft, FiShoppingCart } from "react-icons/fi"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OnlineExhibitionDetail({ params }) {
  const { e_id } = params
  const [showInfo, setShowInfo] = useState(false)

  const { data, error } = useSWR(`${API_BASE_URL}/exhibit/api/${e_id}`, fetcher)
  const exhibitionData = data?.data

  if (error) return <div>Error loading exhibition data</div>
  if (!exhibitionData) return <div>Loading...</div>

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link href="/exhibit" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
          <FiArrowLeft />
          <span>Back</span>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => setShowInfo(!showInfo)}>
            <FiInfo size={20} />
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            <FiShare2 size={20} />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="h-full w-full flex items-center justify-center p-12">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={exhibitionData.e_img || "/placeholder.svg"}
            alt={exhibitionData.e_name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </main>

      {/* Bottom Info Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-6 flex flex-col space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h1 className="text-white text-2xl font-medium">{exhibitionData.e_name}</h1>
              <p className="text-white/70 text-lg">{exhibitionData.creator_name}</p>
            </div>
            <div className="text-white/50 text-sm">
              {exhibitionData.tags
                ?.split(",")
                .slice(0, 3)
                .map((tag, index) => (
                  <span key={index} className="ml-2">
                    #{tag.trim()}
                  </span>
                ))}
            </div>
          </div>
          <p className="text-white/80 text-sm max-w-2xl">{exhibitionData.e_abstract}</p>
          <div className="flex justify-between items-center">
            <p className="text-white/70 text-sm">
              {exhibitionData.medium} - {new Date(exhibitionData.created_at).getFullYear()}
            </p>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black transition-colors"
              onClick={() => {
                // Implement buy functionality here
                console.log("Buy button clicked")
              }}
            >
              <FiShoppingCart className="mr-2" />
              Buy this artwork
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="absolute right-0 top-0 bottom-0 bg-black/90 backdrop-blur-lg w-80 p-6 text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
          >
            <div className="h-full overflow-y-auto space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">About the Artwork</h2>
                <p className="text-white/70 text-sm leading-relaxed">{exhibitionData.e_desc}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-white/50">Created</dt>
                    <dd>{new Date(exhibitionData.created_at).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Medium</dt>
                    <dd>{exhibitionData.medium || "Digital Artwork"}</dd>
                  </div>
                  {exhibitionData.e_price && (
                    <div>
                      <dt className="text-white/50">Price</dt>
                      <dd>${exhibitionData.e_price} NTD</dd>
                    </div>
                  )}
                  {exhibitionData.dimensions && (
                    <div>
                      <dt className="text-white/50">Dimensions</dt>
                      <dd>{exhibitionData.dimensions}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {exhibitionData.tags && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {exhibitionData.tags.split(",").map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exhibitionData.artist_statement && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Artist Statement</h2>
                  <p className="text-white/70 text-sm leading-relaxed">{exhibitionData.artist_statement}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

