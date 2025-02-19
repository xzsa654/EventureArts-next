"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import Link from "next/link"
import { FiInfo, FiArrowLeft, FiShare2 } from "react-icons/fi"
import { IoMdHeartEmpty } from "react-icons/io"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OnlineExhibitionDetail({ params }) {
  const { e_id } = params
  const [showInfo, setShowInfo] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)

  const { data, error } = useSWR(`${API_BASE_URL}/exhibit/api/${e_id}`, fetcher)
  const exhibitionData = data?.data

  useEffect(() => {
    if (!canvasRef.current || !exhibitionData) return

    const canvasContainer = canvasRef.current.parentElement
    const containerWidth = canvasContainer.clientWidth
    const containerHeight = canvasContainer.clientHeight

    sceneRef.current = new THREE.Scene()
    sceneRef.current.background = new THREE.Color(0x000000)

    cameraRef.current = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000)
    cameraRef.current.position.z = 5

    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    rendererRef.current.setSize(containerWidth, containerHeight)

    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement)
    controlsRef.current.enableDamping = true
    controlsRef.current.dampingFactor = 0.05

    const loader = new PCDLoader()
    if (exhibitionData.pointcloud_url) {
      loader.load(exhibitionData.pointcloud_url, (points) => {
        sceneRef.current.add(points)
        points.geometry.center()
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      controlsRef.current.update()
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    animate()

    const handleResize = () => {
      const newWidth = canvasContainer.clientWidth
      const newHeight = canvasContainer.clientHeight
      cameraRef.current.aspect = newWidth / newHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      rendererRef.current?.dispose()
      controlsRef.current?.dispose()
    }
  }, [exhibitionData])

  if (error) return <div className="text-white">Error loading exhibition data</div>
  if (!exhibitionData) return <div className="text-white">Loading...</div>

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Top Navigation */}
      <nav className="h-16 bg-black/90 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/exhibit/online" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
          <FiArrowLeft size={20} />
          <span>Back to Online.</span>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <IoMdHeartEmpty size={20} className="text-red-500" /> : <IoMdHeartEmpty size={20} />}
          </Button>
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
      <div className="flex-grow relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {!exhibitionData?.pointcloud_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">Loading point cloud data...</div>
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="h-20 bg-black/90 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-4">
        <div>
          <h2 className="text-lg font-semibold">{exhibitionData.e_name}</h2>
          <p className="text-sm text-white/70">{exhibitionData.creator_name}</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black transition-colors"
            onClick={() => {
              console.log("Contact artist clicked")
            }}
          >
            Contact Artist
          </Button>
          <Button
            className="bg-white text-black hover:bg-white/90 transition-colors"
            onClick={() => {
              console.log("Purchase inquiry clicked")
            }}
          >
            Inquire About Purchase
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <motion.div
          className="absolute right-0 top-16 bottom-20 w-80 bg-black/90 backdrop-blur-lg p-6 text-white overflow-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">About this Model</h2>
              <p className="text-white/70 text-sm leading-relaxed">{exhibitionData.e_desc}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Controls</h2>
              <ul className="text-sm space-y-2 text-white/70">
                <li>• Left click + drag to rotate</li>
                <li>• Right click + drag to pan</li>
                <li>• Scroll to zoom in/out</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-white/50">Author</dt>
                  <dd>{exhibitionData.creator_name}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Created</dt>
                  <dd>{new Date(exhibitionData.created_at).toLocaleDateString()}</dd>
                </div>
                {exhibitionData.dimensions && (
                  <div>
                    <dt className="text-white/50">Data Size</dt>
                    <dd>{exhibitionData.dimensions}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

