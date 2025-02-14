"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const exhibitionImages = [
  { src: "/chu-images/img_9.jpg", alt: "Exhibition Image 1" },
  { src: "/chu-images/img_5.jpg", alt: "Exhibition Image 2" },
  { src: "/chu-images/img_17.jpg", alt: "Exhibition Image 3" },
  { src: "/chu-images/img_15.jpg", alt: "Exhibition Image 4" },
  { src: "/chu-images/img_9.jpg", alt: "Exhibition Image 5" },
  { src: "/chu-images/img_5.jpg", alt: "Exhibition Image 6" },
]

const AnimatedLine = () => (
  <svg className="absolute inset-0 w-full h-full stroke-animation" viewBox="0 0 2 100" preserveAspectRatio="none">
    <line
      x1="1"
      y1="0"
      x2="1"
      y2="100"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="0.5"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
)

export default function AnimationLike() {  // Renamed function
  const [enlargedImage, setEnlargedImage] = useState(null)
  const enlargedSectionRef = useRef(null)
  const [randomOffsets] = useState(() =>
    Array(3)
      .fill(0)
      .map(() => Math.random() * -50),
  )

  useEffect(() => {
    if (enlargedImage && enlargedSectionRef.current) {
      enlargedSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [enlargedImage])

  const handleImageClick = (image) => {
    setEnlargedImage(image)
  }

  return (
    <>
      <section className="relative w-screen h-[400px] overflow-hidden bg-black">
        
        <div className="relative w-full h-[400px] overflow-hidden grid grid-cols-3">
          {[0, 1, 2].map((columnIndex) => (
            <div key={columnIndex} className="relative">
              <AnimatedLine />
              <div
                className={`absolute w-full space-y-4 ${
                  columnIndex % 2 === 0 ? "animate-verticalScrollDown" : "animate-verticalScrollUp"
                }`}
                style={{
                  transform: `translateY(${randomOffsets[columnIndex]}%)`,
                  filter: "grayscale(100%)",
                }}
              >
                {exhibitionImages.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative group cursor-pointer px-4"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-sm font-medium truncate">{image.alt}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {enlargedImage && (
        <section ref={enlargedSectionRef} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white hover:text-white/80 transition-colors"
            onClick={() => setEnlargedImage(null)}
          >
            Close
          </button>
          <div className="max-w-4xl w-full p-8">
            <Image
              src={enlargedImage.src || "/placeholder.svg"}
              alt={enlargedImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{enlargedImage.alt}</h2>
              <p className="text-white/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
