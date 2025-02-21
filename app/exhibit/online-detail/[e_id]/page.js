"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import Link from "next/link"
import { FiInfo, FiArrowLeft, FiShare2 } from "react-icons/fi"
import { IoMdHeartEmpty } from "react-icons/io"
import Image from "next/image"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OnlineExhibitionDetail({ params }) {
  const { e_id } = params
  const [showInfo, setShowInfo] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [loadingError, setLoadingError] = useState(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)

  const { data, error } = useSWR(`${API_BASE_URL}/exhibit/api/${e_id}`, fetcher)
  const exhibitionData = data?.data

  useEffect(() => {
    if (!canvasRef.current || !exhibitionData) return

    const media = exhibitionData.media_files?.[0]
    if (!media) return

    console.log("Loading media:", media.media_url, "Type:", media.media_type)

    // For 2D content, we'll render differently
    if (media.media_type.startsWith("2d-")) {
      if (canvasRef.current) {
        canvasRef.current.style.display = "none"
      }
      return
    }

    const canvasContainer = canvasRef.current.parentElement
    const containerWidth = canvasContainer.clientWidth
    const containerHeight = canvasContainer.clientHeight

    // Show the 3D canvas
    if (canvasRef.current) {
      canvasRef.current.style.display = "block"
    }

    // Initialize scene
    sceneRef.current = new THREE.Scene()
    sceneRef.current.background = new THREE.Color(0x111111)

    // Add better lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    sceneRef.current.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight1.position.set(5, 5, 5)
    sceneRef.current.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(-5, -5, -5)
    sceneRef.current.add(directionalLight2)

    // Initialize camera
    cameraRef.current = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.01, 1000)

    // Initialize renderer
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    rendererRef.current.setSize(containerWidth, containerHeight)
    rendererRef.current.setPixelRatio(window.devicePixelRatio)

    // Initialize controls
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement)
    controlsRef.current.enableDamping = true
    controlsRef.current.dampingFactor = 0.05

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444)
    sceneRef.current.add(gridHelper)

    // Initialize Draco loader for compressed models
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    // Load 3D model based on type from e_media
    const loadModel = async () => {
      try {
        let object3D = null

        switch (media.media_type) {
          case "3d-obj":
            const objLoader = new OBJLoader()
            object3D = await new Promise((resolve, reject) => {
              objLoader.load(media.media_url, resolve, undefined, reject)
            })
            break

          case "3d-gltf":
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)
            const gltf = await new Promise((resolve, reject) => {
              gltfLoader.load(media.media_url, resolve, undefined, reject)
            })
            object3D = gltf.scene
            break

          case "3d-fbx":
            const fbxLoader = new FBXLoader()
            object3D = await new Promise((resolve, reject) => {
              fbxLoader.load(media.media_url, resolve, undefined, reject)
            })
            break

          case "3d-ply":
            const plyLoader = new PLYLoader()
            const geometry = await new Promise((resolve, reject) => {
              plyLoader.load(media.media_url, resolve, undefined, reject)
            })
            const material = new THREE.MeshStandardMaterial({
              color: 0xcccccc,
              roughness: 0.8,
              metalness: 0.2,
            })
            object3D = new THREE.Mesh(geometry, material)
            break

          case "3d-pcd":
            const pcdLoader = new PCDLoader()
            object3D = await new Promise((resolve, reject) => {
              pcdLoader.load(media.media_url, resolve, undefined, reject)
            })
            break

          default:
            throw new Error(`Unsupported media type: ${media.media_type}`)
        }

        if (!object3D) throw new Error("Failed to load 3D object")

        // Add material if the model doesn't have one
        object3D.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (!child.material) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xcccccc,
                roughness: 0.8,
                metalness: 0.2,
              })
            }
          }
        })

        // Reset position and normalize coordinates
        object3D.position.set(0, 0, 0)
        object3D.updateMatrixWorld(true)

        const box = new THREE.Box3().setFromObject(object3D)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Normalize scale
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetSize = 5
        const scale = targetSize / maxDim
        object3D.scale.multiplyScalar(scale)

        // Move to grid origin
        object3D.position.copy(center).multiplyScalar(-1)
        object3D.position.y = 0

        sceneRef.current.add(object3D)

        // Frame the model in view
        const boundingBox = new THREE.Box3().setFromObject(object3D)
        const boundingSphere = new THREE.Sphere()
        boundingBox.getBoundingSphere(boundingSphere)

        // Calculate optimal camera position
        const fov = cameraRef.current.fov * (Math.PI / 180)
        const horizontalFov = Math.atan(Math.tan(fov / 2) * cameraRef.current.aspect) * 2
        const distance = boundingSphere.radius / Math.sin(Math.min(fov, horizontalFov) / 2)

        // Position camera to view model
        const offset = new THREE.Vector3(1, 0.5, 1).normalize().multiplyScalar(distance)
        cameraRef.current.position.copy(boundingSphere.center).add(offset)
        cameraRef.current.lookAt(boundingSphere.center)

        // Update controls to look at model
        controlsRef.current.target.copy(boundingSphere.center)
        controlsRef.current.update()

        // Apply animation config if provided
        if (media.animation_config) {
          try {
            const config = JSON.parse(media.animation_config)
            // Apply animation settings here
            console.log("Animation config:", config)
          } catch (err) {
            console.error("Error parsing animation config:", err)
          }
        }

        console.log("Model loaded successfully:", {
          type: media.media_type,
          position: object3D.position,
          scale: object3D.scale,
          boundingSphere: boundingSphere,
        })
      } catch (error) {
        console.error("Error loading model:", error)
        setLoadingError(`Failed to load model: ${error.message}`)
      }
    }

    loadModel()

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      requestAnimationFrame(animate)
      controlsRef.current?.update()
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

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
      dracoLoader.dispose()
    }
  }, [exhibitionData])

  // Render 2D content
  if (exhibitionData?.media_files?.[0]?.media_type.startsWith("2d-")) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Image
          src={exhibitionData.media_files[0].media_url || "/placeholder.svg"}
          alt={exhibitionData.e_name}
          width={800}
          height={800}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    )
  }

  // Render video content
  if (exhibitionData?.media_files?.[0]?.media_type === "video") {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <video controls className="max-w-full max-h-full" src={exhibitionData.media_files[0].media_url} />
      </div>
    )
  }

  if (error) return <div className="text-white">Error loading exhibition data</div>
  if (!exhibitionData) return <div className="text-white">Loading...</div>
  if (loadingError) return <div className="text-white">{loadingError}</div>

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Top Navigation */}
      <nav className="h-16 bg-black/90 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4">
        <Link
          href="/exhibit/online"
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
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
        {!exhibitionData?.media_files?.length && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">No media available</div>
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
          >
            Contact Artist
          </Button>
          <Button className="bg-white text-black hover:bg-white/90 transition-colors">Inquire About Purchase</Button>
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
          </div>
        </motion.div>
      )}
    </div>
  )
}

