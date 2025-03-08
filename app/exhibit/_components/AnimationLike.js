'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const exhibitionImages = [
  { src: '/chu-images/cat_preview.jpg', alt: 'Cat Preview' },
  { src: '/chu-images/cat_preview2.jpg', alt: 'Cat Preview 2' },
  { src: '/chu-images/dog_67.jpg', alt: 'Dog 67' },
  { src: '/chu-images/doll_68.jpg', alt: 'Doll 68' },
  { src: '/chu-images/unsplash1.jpg', alt: 'Unsplash 1' },
  { src: '/chu-images/unsplash4.jpg', alt: 'Unsplash 4' },
  { src: '/chu-images/unsplash5.jpg', alt: 'Unsplash 5' },
  { src: '/chu-images/unsplash15.jpg', alt: 'Unsplash 15' },
  { src: '/chu-images/unsplash16.jpg', alt: 'Unsplash 16' },
]

const AnimatedLine = () => (
  <svg
    className="absolute inset-0 w-full h-full stroke-animation"
    viewBox="0 0 2 100"
    preserveAspectRatio="none"
  >
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

export default function AnimationLike() {
  const [enlargedImage, setEnlargedImage] = useState(null)
  const enlargedSectionRef = useRef(null)
  const [randomOffsets] = useState(() =>
    Array(3)
      .fill(0)
      .map(() => Math.random() * -50)
  )

  // 分配圖片到三排
  const shuffledImages = [...exhibitionImages].sort(() => Math.random() - 0.5)
  const columnImages = [[], [], []]
  shuffledImages.forEach((img, index) => {
    columnImages[index % 3].push(img)
  })

  useEffect(() => {
    if (enlargedImage && enlargedSectionRef.current) {
      enlargedSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [enlargedImage])

  const handleImageClick = (image) => {
    setEnlargedImage(image)
  }

  return (
    <>
      {/* 整個元件高度在這 [350]*/}
      <section className="relative w-screen h-[350px] overflow-hidden bg-black">
        <div className="relative w-full h-full overflow-hidden grid grid-cols-3">
          {columnImages.map((images, columnIndex) => (
            <div key={columnIndex} className="relative">
              <AnimatedLine />
              <div
                className={`absolute w-full space-y-4 ${
                  columnIndex % 2 === 0
                    ? 'animate-verticalScrollDown'
                    : 'animate-verticalScrollUp'
                }`}
                style={{
                  transform: `translateY(${randomOffsets[columnIndex]}%)`,
                  filter: 'grayscale(100%)',
                }}
              >
                {images.map((image, imageIndex) => (
                  <button
                    key={imageIndex}
                    onClick={() => handleImageClick(image)}
                    className="relative group cursor-pointer px-4 w-full text-left bg-transparent border-none p-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src || '/placeholder.svg'}
                        alt={image.alt}
                        width={400}
                        height={300}
                        priority={imageIndex === 0 && columnIndex === 0}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {enlargedImage && (
        <section
          ref={enlargedSectionRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-white/80 transition-colors"
            onClick={() => setEnlargedImage(null)}
          >
            Close
          </button>
          <div className="max-w-4xl w-full p-8">
            <Image
              src={enlargedImage.src || '/placeholder.svg'}
              alt={enlargedImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{enlargedImage.alt}</h2>
              <p className="text-white/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
