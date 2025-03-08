'use client'

import { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { FiInfo, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import { IoMdHeartEmpty } from 'react-icons/io'
import * as THREE from 'three'
import { ImageGallery } from '../../_components/image-gallery'
import { motion } from 'framer-motion'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

//改善fetcher~避免因為請求失敗時回傳 null，導致useSWR 當掉
const fetcher = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error('API 請求錯誤:', error)
    return null // 避免 useSWR 當掉
  }
}

export default function Page({ params }) {
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

    console.log('Loading media:', media.media_url, 'Type:', media.media_type)

    // For 2D content, we'll render differently
    if (media.media_type === 'image' || media.media_type.startsWith('2d-')) {
      if (canvasRef.current) {
        canvasRef.current.style.display = 'none'
      }
      return
    }

    const canvasContainer = canvasRef.current.parentElement
    const containerWidth = canvasContainer.clientWidth
    const containerHeight = canvasContainer.clientHeight

    // Show the 3D canvas
    if (canvasRef.current) {
      canvasRef.current.style.display = 'block'
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
    cameraRef.current = new THREE.PerspectiveCamera(
      50,
      containerWidth / containerHeight,
      0.01,
      1000
    )

    // Initialize renderer
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    rendererRef.current.setSize(containerWidth, containerHeight)
    rendererRef.current.setPixelRatio(window.devicePixelRatio)

    // Use dynamic imports for Three.js modules
    const initControls = async () => {
      try {
        // Dynamically import OrbitControls
        const { OrbitControls } = await import(
          'three/examples/jsm/controls/OrbitControls'
        )

        // Initialize controls
        controlsRef.current = new OrbitControls(
          cameraRef.current,
          rendererRef.current.domElement
        )
        controlsRef.current.enableDamping = true
        controlsRef.current.dampingFactor = 0.05

        // Add grid helper
        const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444)
        sceneRef.current.add(gridHelper)

        // Load 3D model based on type
        switch (media.media_type) {
          case '3d-obj':
            loadOBJModel(media.media_url)
            break
          case '3d-ply':
            loadPLYModel(media.media_url)
            break
          case '3d-model':
            if (media.media_url.toLowerCase().endsWith('.ply')) {
              loadPLYModel(media.media_url)
            } else {
              loadGLTFModel(media.media_url)
            }
            break
          case '3d-pointcloud':
            loadPointCloudModel(media.media_url)
            break
          default:
            console.warn('Unsupported media type:', media.media_type)
        }

        // Start animation loop
        animate()
      } catch (error) {
        console.error('Error initializing Three.js modules:', error)
        setLoadingError('Failed to load 3D viewer components')
      }
    }

    initControls()

    // Load OBJ Model function
    const loadOBJModel = async (url) => {
      try {
        const { OBJLoader } = await import(
          'three/examples/jsm/loaders/OBJLoader'
        )
        const objLoader = new OBJLoader()

        objLoader.load(
          url,
          (obj) => {
            // Add material if the model doesn't have one
            obj.traverse((child) => {
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

            // Get the initial bounding box to check position
            const initialBox = new THREE.Box3().setFromObject(obj)
            console.log('Initial bounds:', initialBox.min, initialBox.max)

            // Reset position and normalize coordinates
            obj.position.set(0, 0, 0)
            obj.updateMatrixWorld(true)

            const box = new THREE.Box3().setFromObject(obj)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            // Normalize scale
            const maxDim = Math.max(size.x, size.y, size.z)
            const targetSize = 5
            const scale = targetSize / maxDim
            obj.scale.multiplyScalar(scale)

            // Move to grid origin
            obj.position.copy(center).multiplyScalar(-1)
            obj.position.y = 0

            sceneRef.current.add(obj)

            // Frame the model in view
            const boundingBox = new THREE.Box3().setFromObject(obj)
            const boundingSphere = new THREE.Sphere()
            boundingBox.getBoundingSphere(boundingSphere)

            // Calculate optimal camera position
            const fov = cameraRef.current.fov * (Math.PI / 180)
            const horizontalFov =
              Math.atan(Math.tan(fov / 2) * cameraRef.current.aspect) * 2
            const distance =
              boundingSphere.radius / Math.sin(Math.min(fov, horizontalFov) / 2)

            // Position camera to view model
            const offset = new THREE.Vector3(1, 0.5, 1)
              .normalize()
              .multiplyScalar(distance)
            cameraRef.current.position.copy(boundingSphere.center).add(offset)
            cameraRef.current.lookAt(boundingSphere.center)

            // Update controls to look at model
            controlsRef.current.target.copy(boundingSphere.center)
            controlsRef.current.update()

            console.log('Model loaded:', {
              position: obj.position,
              scale: obj.scale,
              boundingSphere: boundingSphere,
              cameraPosition: cameraRef.current.position,
            })
          },
          (xhr) => {
            console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`)
          },
          (error) => console.error('Error loading OBJ model:', error)
        )
      } catch (error) {
        console.error('Error loading OBJ module:', error)
        setLoadingError('Failed to load OBJ model loader')
      }
    }

    // Load PLY Model function
    const loadPLYModel = async (url) => {
      try {
        const { PLYLoader } = await import(
          'three/examples/jsm/loaders/PLYLoader'
        )
        const plyLoader = new PLYLoader()

        plyLoader.load(
          url,
          (geometry) => {
            // 確認 PLY 是否包含顏色屬性
            const hasColor = geometry.hasAttribute('color')

            // 若 PLY 有顏色數據，使用 PointsMaterial 並啟用 vertexColors
            const materialOptions = {
              size: 0.006, // 點的大小
            }
            
            if (hasColor) {
              materialOptions.vertexColors = true // PLY 有顏色數據時啟用
            } else {
              materialOptions.color = new THREE.Color(0xffffff) // 沒有顏色時，預設為白色
            }
            
            const material = new THREE.PointsMaterial(materialOptions)
            

            const pointCloud = new THREE.Points(geometry, material)

            // 計算模型中心並移動到原點
            geometry.computeBoundingBox()
            const box = geometry.boundingBox
            const center = new THREE.Vector3()
            box.getCenter(center)
            geometry.translate(-center.x, -center.y, -center.z)

            // 設定模型縮放
            const size = new THREE.Vector3()
            box.getSize(size)
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 5 / maxDim
            pointCloud.scale.multiplyScalar(scale)

            // **修正點雲方向，確保 Z 軸變成 Y 軸，與 GridHelper 對齊**
            pointCloud.rotation.x = -Math.PI / 2

            // 加入場景
            sceneRef.current.add(pointCloud)

            // 設定相機位置
            const boundingSphere = new THREE.Sphere()
            box.getBoundingSphere(boundingSphere)
            cameraRef.current.position.set(5, 5, 5)
            cameraRef.current.lookAt(0, 0, 0)

            // 更新控制器
            controlsRef.current.target.set(0, 0, 0)
            controlsRef.current.update()

            console.log('PLY 點雲已載入', {
              hasColor,
              position: pointCloud.position,
              scale: pointCloud.scale,
              cameraPosition: cameraRef.current.position,
            })
          },
          (progress) => {
            console.log(
              `Loading Progress: ${(progress.loaded / progress.total) * 100}%`
            )
          },
          (error) => {
            console.error('載入 PLY 模型錯誤:', error)
            setLoadingError('無法載入 PLY 模型')
          }
        )
      } catch (error) {
        console.error('載入 PLY 模組錯誤:', error)
        setLoadingError('無法載入 PLY 模組')
      }
    }

    // Load GLTF Model function
    const loadGLTFModel = async (url) => {
      try {
        const { GLTFLoader } = await import(
          'three/examples/jsm/loaders/GLTFLoader'
        )
        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
          url,
          (gltf) => {
            const model = gltf.scene

            // Debug initial state
            console.log('Initial model position:', model.position)
            console.log('Initial model scale:', model.scale)

            // Center the model
            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            console.log('Model bounds:', {
              center: center,
              size: size,
              min: box.min,
              max: box.max,
            })

            // Reset position to center
            model.position.set(0, 0, 0)

            // Scale the model appropriately
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 5 / maxDim
            model.scale.multiplyScalar(scale)

            // Add model to scene
            sceneRef.current.add(model)

            // Position camera to view model
            const boundingSphere = new THREE.Sphere()
            box.getBoundingSphere(boundingSphere)

            // Set camera position
            cameraRef.current.position.set(5, 5, 5)
            cameraRef.current.lookAt(0, 0, 0)

            // Update controls
            controlsRef.current.target.set(0, 0, 0)
            controlsRef.current.update()

            console.log('Model loaded with:', {
              finalPosition: model.position,
              finalScale: model.scale,
              cameraPosition: cameraRef.current.position,
              controlsTarget: controlsRef.current.target,
            })

            // Add axes helper for debugging
            const axesHelper = new THREE.AxesHelper(5)
            sceneRef.current.add(axesHelper)
          },
          (progress) => {
            console.log(
              `Loading progress: ${(progress.loaded / progress.total) * 100}%`
            )
          },
          (error) => {
            console.error('Error loading GLTF model:', error)
            setLoadingError('Failed to load 3D model')
          }
        )
      } catch (error) {
        console.error('Error loading GLTF module:', error)
        setLoadingError('Failed to load GLTF model loader')
      }
    }

    // Load Point Cloud Model function
    const loadPointCloudModel = async (url) => {
      try {
        const { PCDLoader } = await import(
          'three/examples/jsm/loaders/PCDLoader'
        )
        const pcdLoader = new PCDLoader()

        pcdLoader.load(
          url,
          (points) => {
            const box = new THREE.Box3().setFromObject(points)
            const center = box.getCenter(new THREE.Vector3())
            points.position.sub(center)

            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 5 / maxDim
            points.scale.multiplyScalar(scale)

            sceneRef.current.add(points)
            console.log('Point Cloud Loaded Successfully!')
          },
          undefined,
          (error) => console.error('Error loading Point Cloud:', error)
        )
      } catch (error) {
        console.error('Error loading PCD module:', error)
        setLoadingError('Failed to load point cloud loader')
      }
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current)
        return

      requestAnimationFrame(animate)
      controlsRef.current?.update()
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      const newWidth = canvasContainer.clientWidth
      const newHeight = canvasContainer.clientHeight
      cameraRef.current.aspect = newWidth / newHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      rendererRef.current?.dispose()
      controlsRef.current?.dispose()
    }
  }, [exhibitionData])

  // Rest of your component remains the same...
  // Render 2D content
  if (
    exhibitionData?.media_files?.some(
      (file) => file.media_type === 'image' || file.media_type.startsWith('2d-')
    )
  ) {
    const images = exhibitionData.media_files
      .filter(
        (file) =>
          file.media_type === 'image' || file.media_type.startsWith('2d-')
      )
      .map((file) => ({
        media_url: file.media_url,
        alt: exhibitionData.e_name,
        media_desc: file.media_desc, //description of the image by database
      }))

    // Render image content
    return (
      <div className="h-screen flex flex-col bg-black text-white">
        {/* Navigation */}
        <nav className="h-16 bg-black/90 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4">
          <Link
            href="/exhibit/online"
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={20} />
            <span>Back to Online.</span>
          </Link>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? (
                <IoMdHeartEmpty size={20} className="text-red-500" />
              ) : (
                <IoMdHeartEmpty size={20} />
              )}
            </Button>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white"
              onClick={() => setShowInfo(!showInfo)}
            >
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
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <h1 className="text-3xl font-bold text-center mt-8 text-white z-10 relative">
              {exhibitionData.e_name}
            </h1>
            <ImageGallery images={images} />
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="h-20 bg-black/90 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-4">
          <div>
            <p className="text-sm text-white/70">{exhibitionData.bd_name}</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              Contact Artist
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 transition-colors">
              Inquire About Purchase
            </Button>
          </div>
        </div>

        {/* Info Panel - Keep this as the single source of exhibition info */}
        {showInfo && (
          <motion.div
            className="fixed right-0 top-16 bottom-0 w-80 bg-black/90 backdrop-blur-lg p-6 text-white overflow-auto z-40"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  About this Exhibition
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  {exhibitionData.e_desc}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Artist</h3>
                <p className="text-white/70 text-sm">
                  {exhibitionData.bd_name}
                </p>
              </div>
              {images.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                  <p className="text-white/70 text-sm">
                    This exhibition contains {images.length} images.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  // Render video content
  if (exhibitionData?.media_files?.[0]?.media_type === 'video') {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <video
          controls
          className="max-w-full max-h-full"
          src={exhibitionData.media_files[0].media_url}
        />
      </div>
    )
  }

  // **新的fetcher有新的錯誤處理方式**
  if (!data) return <div className="text-white">⌛ Loading...</div> // 等待 API 回應
  if (!exhibitionData)
    return (
      <div className="text-white">⚠️ Failed to load exhibition data...</div>
    )
  if (loadingError) return <div className="text-white">❌ {loadingError}</div>

  // Render 3D content
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
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? (
              <IoMdHeartEmpty size={20} className="text-red-500" />
            ) : (
              <IoMdHeartEmpty size={20} />
            )}
          </Button>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white"
            onClick={() => setShowInfo(!showInfo)}
          >
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
          <Button className="bg-white text-black hover:bg-white/90 transition-colors">
            Inquire About Purchase
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <motion.div
          className="absolute right-0 top-16 bottom-20 w-80 bg-black/90 backdrop-blur-lg p-6 text-white overflow-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30 }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">About this Model</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                {exhibitionData.e_desc}
              </p>
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
