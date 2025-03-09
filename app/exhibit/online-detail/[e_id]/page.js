"use client"

import { useState, useEffect, useRef } from "react"
import useSWR from "swr"
import { Button } from "@heroui/react"
import Link from "next/link"
import { FiInfo, FiArrowLeft, FiShare2 } from "react-icons/fi"
import { IoMdHeartEmpty } from "react-icons/io"
import * as THREE from "three"
import { ImageGallery } from "../../_components/image-gallery"
import { motion } from "framer-motion"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

//改善fetcher~避免因為請求失敗時回傳 null，導致useSWR 當掉
const fetcher = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("API 請求錯誤:", error)
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

  // Helper function to properly dispose of materials
  const disposeMaterial = (material) => {
    if (!material) return

    // Dispose any textures used by the material
    Object.keys(material).forEach((prop) => {
      if (!material[prop]) return
      if (material[prop].isTexture) {
        material[prop].dispose()
      }
    })

    // Dispose the material itself
    material.dispose()
  }

  useEffect(() => {
    if (!canvasRef.current || !exhibitionData) return

    const media = exhibitionData.media_files?.[0]
    if (!media) return

    console.log("Loading media:", media.media_url, "Type:", media.media_type)

    // For 2D content, we'll render differently
    if (media.media_type === "image" || media.media_type.startsWith("2d-")) {
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

    // Use dynamic imports for Three.js modules
    const initControls = async () => {
      try {
        // Dynamically import OrbitControls
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls")

        // Initialize controls
        controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement)
        controlsRef.current.enableDamping = true
        controlsRef.current.dampingFactor = 0.05

        // Add grid helper
        const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444)
        sceneRef.current.add(gridHelper)

        // Add axes helper for better orientation
        const axesHelper = new THREE.AxesHelper(5)
        sceneRef.current.add(axesHelper)

        // yello center sphere
        // const originSphere = new THREE.Mesh(
        //   new THREE.SphereGeometry(0.1, 16, 16),
        //   new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        // )
        // originSphere.position.set(0, 0, 0)
        // sceneRef.current.add(originSphere)

        // Load 3D model based on type
        switch (media.media_type) {
          case "3d-obj":
            loadOBJModel(media.media_url)
            break
          case "3d-ply":
            loadPLYModel(media.media_url)
            break
          case "3d-model":
            if (media.media_url.toLowerCase().endsWith(".ply")) {
              loadPLYModel(media.media_url)
            } else {
              loadGLTFModel(media.media_url)
            }
            break
          case "3d-pointcloud":
            loadPointCloudModel(media.media_url)
            break
          default:
            console.warn("Unsupported media type:", media.media_type)
        }

        // Start animation loop
        animate()
      } catch (error) {
        console.error("Error initializing Three.js modules:", error)
        setLoadingError("Failed to load 3D viewer components")
      }
    }

    initControls()

    // Load OBJ Model function
    const loadOBJModel = async (url) => {
      try {
        // Show loading indicator
        const loadingDiv = document.createElement("div")
        loadingDiv.className = "absolute inset-0 flex items-center justify-center bg-black/70 z-10"
        loadingDiv.innerHTML = '<div class="text-white text-xl">Loading 3D Model...</div>'
        canvasRef.current.parentElement.appendChild(loadingDiv)

        const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader")
        const objLoader = new OBJLoader()

        objLoader.load(
          url,
          (obj) => {
            // Remove loading indicator
            if (loadingDiv.parentNode) {
              loadingDiv.parentNode.removeChild(loadingDiv)
            }

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
            console.log("Initial bounds:", initialBox.min, initialBox.max)

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
            const horizontalFov = Math.atan(Math.tan(fov / 2) * cameraRef.current.aspect) * 2
            const distance = boundingSphere.radius / Math.sin(Math.min(fov, horizontalFov) / 2)

            // Position camera to view model
            const offset = new THREE.Vector3(1, 0.5, 1).normalize().multiplyScalar(distance)
            cameraRef.current.position.copy(boundingSphere.center).add(offset)
            cameraRef.current.lookAt(boundingSphere.center)

            // Update controls to look at model
            controlsRef.current.target.copy(boundingSphere.center)
            controlsRef.current.update()

            console.log("Model loaded:", {
              position: obj.position,
              scale: obj.scale,
              boundingSphere: boundingSphere,
              cameraPosition: cameraRef.current.position,
            })
          },
          (xhr) => {
            const percent = Math.round((xhr.loaded / xhr.total) * 100)
            console.log(`Loading Progress: ${percent}%`)

            // Update loading indicator if it exists
            if (loadingDiv.parentNode) {
              loadingDiv.innerHTML = `<div class="text-white text-xl">Loading 3D Model: ${percent}%</div>`
            }
          },
          (error) => console.error("Error loading OBJ model:", error),
        )
      } catch (error) {
        console.error("Error loading OBJ module:", error)
        setLoadingError("Failed to load OBJ model loader")
      }
    }

    // Load PLY Model function
    const loadPLYModel = async (url) => {
      try {
        const { PLYLoader } = await import("three/examples/jsm/loaders/PLYLoader")
        const plyLoader = new PLYLoader()

        // Show loading indicator
        const loadingDiv = document.createElement("div")
        loadingDiv.className = "absolute inset-0 flex items-center justify-center bg-black/70 z-10"
        loadingDiv.innerHTML = '<div class="text-white text-xl">Loading 3D Model...</div>'
        canvasRef.current.parentElement.appendChild(loadingDiv)

        plyLoader.load(
          url,
          (geometry) => {
            // Remove loading indicator
            if (loadingDiv.parentNode) {
              loadingDiv.parentNode.removeChild(loadingDiv)
            }

            // 1. Add a check to confirm point count before any processing
            console.log("Original PLY point count before processing:", geometry.attributes.position.count)

            // Optimize geometry by reducing points for large models
            const originalPointCount = geometry.attributes.position.count
            let targetPointCount = originalPointCount

            // 2. Temporarily disable downsampling to test with full dataset
            // Comment out or modify the downsampling code
            // If point count is very large, reduce it
            if (originalPointCount > 200000) {
              // Instead of reducing to 1M points, use a higher number or the full dataset
              targetPointCount = originalPointCount // Load the full dataset for testing
              console.log(`Using full point cloud with ${originalPointCount} points`)

              // Keep the downsampling code but don't execute it for now
              /*
              // Create a decimated version of the geometry
              const stride = Math.ceil(originalPointCount / targetPointCount)
              const positions = geometry.attributes.position.array
              const colors = geometry.attributes.color?.array

              const newPositions = new Float32Array(targetPointCount * 3)
              let newColors = null
              if (colors) {
                newColors = new Float32Array(targetPointCount * 3)
              }

              let j = 0
              for (let i = 0; i < originalPointCount; i += stride) {
                if (j >= targetPointCount) break

                // Copy positions
                newPositions[j * 3] = positions[i * 3]
                newPositions[j * 3 + 1] = positions[i * 3 + 1]
                newPositions[j * 3 + 2] = positions[i * 3 + 2]

                // Copy colors if they exist
                if (colors) {
                  newColors[j * 3] = colors[i * 3]
                  newColors[j * 3 + 1] = colors[i * 3 + 1]
                  newColors[j * 3 + 2] = colors[i * 3 + 2]
                }

                j++
              }

              // Create new geometry with reduced points
              const newGeometry = new THREE.BufferGeometry()
              newGeometry.setAttribute("position", new THREE.BufferAttribute(newPositions, 3))

              if (newColors) {
                newGeometry.setAttribute("color", new THREE.BufferAttribute(newColors, 3))
              }

              // Replace original geometry
              geometry.dispose() // Dispose the original to free memory
              geometry = newGeometry
              */
            }

            // 確認 PLY 是否包含顏色屬性
            const hasColor = geometry.hasAttribute("color")

            // 3. Ensure point cloud colors are visible with these material settings
            const material = new THREE.PointsMaterial({
              size: 0.0005, // Much smaller point size for better detail
              vertexColors: true, // Always enable vertex colors
              color: new THREE.Color(0xffffff), // White base color
              transparent: true, // Enable transparency
              opacity: 1.0, // Full opacity
              alphaTest: 0.1, // Avoid blending between points
              sizeAttenuation: true, // Enable size attenuation
            })

            const pointCloud = new THREE.Points(geometry, material)

            // 計算模型中心並移動到原點
            geometry.computeBoundingBox()
            const box = geometry.boundingBox
            const center = new THREE.Vector3()
            box.getCenter(center)

            // 4. Use geometry.translate instead of pointCloud.position.set
            geometry.translate(-center.x, -center.y, -center.z)
            // Comment out the position setting
            // pointCloud.position.set(-center.x, -center.y, -center.z);

            // 設定模型縮放
            const size = new THREE.Vector3()
            box.getSize(size)
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 5 / maxDim
            pointCloud.scale.multiplyScalar(scale)

            // Add diagnostic logging
            console.log("Point cloud diagnostic info:", {
              geometryBounds: {
                min: box.min,
                max: box.max,
                size: size,
              },
              pointCloudScale: pointCloud.scale,
              pointCloudPosition: pointCloud.position,
              materialSettings: {
                size: material.size,
                vertexColors: material.vertexColors,
                sizeAttenuation: material.sizeAttenuation,
              },
            })

            // Try a different approach - don't translate the geometry, position the pointCloud instead
            // geometry.translate(-center.x, -center.y, -center.z); // Comment this out
            // pointCloud.position.set(-center.x, -center.y, -center.z) // Position the pointCloud instead

            // DO NOT rotate the point cloud
            // pointCloud.rotation.x = -Math.PI / 2; // This line should remain commented out

            // Make points larger to ensure visibility
            // material.size = 0.02 // Increase point size for better visibility

            //rotate
            pointCloud.rotation.x = -Math.PI / 2; // 繞 X 軸旋轉 -90°

            // 加入場景
            sceneRef.current.add(pointCloud)

            // 5. Add a bounding box helper to visualize the point cloud bounds
            const boxHelper = new THREE.BoxHelper(pointCloud, 0xffff00)
            sceneRef.current.add(boxHelper)

            // 設定相機位置
            const boundingSphere = new THREE.Sphere()
            box.getBoundingSphere(boundingSphere)
            cameraRef.current.position.set(5, 5, 5)
            cameraRef.current.lookAt(0, 0, 0)

            // 更新控制器
            controlsRef.current.target.set(0, 0, 0)
            controlsRef.current.update()

            // 6. Log the final point count after all processing
            console.log("Final PLY point count after processing:", geometry.attributes.position.count)

            console.log("PLY 點雲已載入", {
              hasColor,
              pointCount: geometry.attributes.position.count,
              position: pointCloud.position,
              scale: pointCloud.scale,
              cameraPosition: cameraRef.current.position,
            })
          },
          (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100)
            console.log(`Loading Progress: ${percent}%`)

            // Update loading indicator if it exists
            if (loadingDiv.parentNode) {
              loadingDiv.innerHTML = `<div class="text-white text-xl">Loading 3D Model: ${percent}%</div>`
            }
          },
          (error) => {
            console.error("載入 PLY 模型錯誤:", error)
            setLoadingError("無法載入 PLY 模型")

            // Remove loading indicator
            if (loadingDiv.parentNode) {
              loadingDiv.parentNode.removeChild(loadingDiv)
            }
          },
        )
      } catch (error) {
        console.error("載入 PLY 模組錯誤:", error)
        setLoadingError("無法載入 PLY 模組")
      }
    }

    // Load GLTF Model function
    const loadGLTFModel = async (url) => {
      try {
        // Show loading indicator
        const loadingDiv = document.createElement("div")
        loadingDiv.className = "absolute inset-0 flex items-center justify-center bg-black/70 z-10"
        loadingDiv.innerHTML = '<div class="text-white text-xl">Loading 3D Model...</div>'
        canvasRef.current.parentElement.appendChild(loadingDiv)

        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader")
        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
          url,
          (gltf) => {
            // Remove loading indicator
            if (loadingDiv.parentNode) {
              loadingDiv.parentNode.removeChild(loadingDiv)
            }

            const model = gltf.scene

            // Debug initial state
            console.log("Initial model position:", model.position)
            console.log("Initial model scale:", model.scale)

            // Center the model
            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            console.log("Model bounds:", {
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

            console.log("Model loaded with:", {
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
            const percent = Math.round((progress.loaded / progress.total) * 100)
            console.log(`Loading progress: ${percent}%`)

            // Update loading indicator if it exists
            if (loadingDiv.parentNode) {
              loadingDiv.innerHTML = `<div class="text-white text-xl">Loading 3D Model: ${percent}%</div>`
            }
          },
          (error) => {
            console.error("Error loading GLTF model:", error)
            setLoadingError("Failed to load 3D model")

            // Remove loading indicator
            if (loadingDiv.parentNode) {
              loadingDiv.parentNode.removeChild(loadingDiv)
            }
          },
        )
      } catch (error) {
        console.error("Error loading GLTF module:", error)
        setLoadingError("Failed to load GLTF model loader")
      }
    }

    // Load Point Cloud Model function
    const loadPointCloudModel = async (url) => {
      try {
        const { PCDLoader } = await import("three/examples/jsm/loaders/PCDLoader")
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
            console.log("Point Cloud Loaded Successfully!")
          },
          undefined,
          (error) => console.error("Error loading Point Cloud:", error),
        )
      } catch (error) {
        console.error("Error loading PCD module:", error)
        setLoadingError("Failed to load point cloud loader")
      }
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return

      window.animationFrameId = requestAnimationFrame(animate)

      // Add this diagnostic check every 60 frames
      if (window.frameCount === undefined) window.frameCount = 0
      window.frameCount++

      if (window.frameCount % 60 === 0) {
        // Check if there are any Points objects in the scene
        let hasPointCloud = false
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Points) {
            hasPointCloud = true
            console.log("Point cloud is in scene:", {
              visible: object.visible,
              position: object.position,
              scale: object.scale,
              materialSize: object.material.size,
            })
          }
        })

        if (!hasPointCloud) {
          console.log("No point cloud found in scene!")
        }
      }

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
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      console.log("Cleaning up 3D resources...")

      // Cancel animation frame to stop rendering loop
      if (window.animationFrameId) {
        console.log("Cancelling animation frame:", window.animationFrameId)
        cancelAnimationFrame(window.animationFrameId)
        window.animationFrameId = null
      }

      // Dispose of all Three.js resources
      if (sceneRef.current) {
        console.log("Disposing scene objects...")
        let objectsDisposed = 0

        // Recursively dispose of all objects in the scene
        sceneRef.current.traverse((object) => {
          // Dispose geometries
          if (object.geometry) {
            object.geometry.dispose()
            objectsDisposed++
          }

          // Dispose materials
          if (object.material) {
            // If material is an array, dispose each one
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => disposeMaterial(material))
            } else {
              disposeMaterial(object.material)
            }
            objectsDisposed++
          }
        })

        console.log(`Disposed ${objectsDisposed} objects`)

        // Clear the scene
        const childCount = sceneRef.current.children.length
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0])
        }
        console.log(`Removed ${childCount} children from scene`)
      }

      // Dispose of controls
      if (controlsRef.current) {
        controlsRef.current.dispose()
        controlsRef.current = null
      }

      // Dispose of renderer and release WebGL context
      if (rendererRef.current) {
        rendererRef.current.dispose()

        // Force release of WebGL context
        const gl = rendererRef.current.getContext()
        if (gl && gl.getExtension("WEBGL_lose_context")) {
          gl.getExtension("WEBGL_lose_context").loseContext()
        }

        rendererRef.current = null
      }

      // Clear references
      sceneRef.current = null
      cameraRef.current = null
    }
  }, [exhibitionData])

  // Rest of your component remains the same...
  // Render 2D content
  if (exhibitionData?.media_files?.some((file) => file.media_type === "image" || file.media_type.startsWith("2d-"))) {
    const images = exhibitionData.media_files
      .filter((file) => file.media_type === "image" || file.media_type.startsWith("2d-"))
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
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <h1 className="text-3xl font-bold text-center mt-8 text-white z-10 relative">{exhibitionData.e_name}</h1>
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
            <Button className="bg-white text-black hover:bg-white/90 transition-colors">Inquire About Purchase</Button>
          </div>
        </div>

        {/* Info Panel - Keep this as the single source of exhibition info */}
        {showInfo && (
          <motion.div
            className="fixed right-0 top-16 bottom-0 w-80 bg-black/90 backdrop-blur-lg p-6 text-white overflow-auto z-40"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">About this Exhibition</h2>
                <p className="text-white/70 text-sm leading-relaxed">{exhibitionData.e_desc}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Artist</h3>
                <p className="text-white/70 text-sm">{exhibitionData.bd_name}</p>
              </div>
              {images.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                  <p className="text-white/70 text-sm">This exhibition contains {images.length} images.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
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

  // **新的fetcher有新的錯誤處理方式**
  if (!data) return <div className="text-white">⌛ Loading...</div> // 等待 API 回應
  if (!exhibitionData) return <div className="text-white">⚠️ Failed to load exhibition data...</div>
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

