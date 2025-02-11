"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const exhibitionImages = [
  { src: "/chu-images/img_9.jpg", alt: "Exhibition Image 1" },
  { src: "/chu-images/img_5.jpg", alt: "Exhibition Image 2" },
  { src: "/chu-images/img_17.jpg", alt: "Exhibition Image 3" },
  { src: "/chu-images/image15.jpg", alt: "Exhibition Image 4" },
]

export default function ExhibitionSection() {
  const [enlargedImage, setEnlargedImage] = useState(null)
  const enlargedSectionRef = useRef(null)
  const [randomOffsets, setRandomOffsets] = useState([])

  useEffect(() => {
    setRandomOffsets(exhibitionImages.map(() => Math.random() * -100))
  }, [])

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
      <section className="relative w-screen h-[1080px] overflow-hidden">
        <Image
          src="/chu-images/img-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="relative z-10 w-full h-[80px] px-[5%] flex justify-between items-center border-b border-black bg-opacity-80">
          <h1 className="text-2xl font-bold">Current Exhibition</h1>
          <a href="#" className="text-xl hover:underline">
            See All Exhibition →
          </a>
        </div>
        <div className="relative z-10 w-full h-[1000px] overflow-hidden grid grid-cols-4 gap-2.5">
          {exhibitionImages.map((image, index) => (
            <div key={index} className="relative flex justify-center items-center w-full h-full overflow-hidden">
              <div className="absolute top-0 left-1/2 h-full w-px bg-black"></div>
              <div
                className={`absolute w-full ${
                  index % 2 === 0 ? "animate-verticalScrollDown" : "animate-verticalScrollUp"
                }`}
                style={{ transform: `translateY(${randomOffsets[index]}%)` }}
              >
                <Image
                  src={image.src || "/chu-images/img_9.jpg"}
                  alt={image.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {enlargedImage && (
        <section ref={enlargedSectionRef} className="relative flex h-screen bg-white bg-opacity-80">
          <Image
            src="/chu-images/img-bg.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="relative z-10 flex-1 p-8 flex justify-center items-center">
            <Image
              src={enlargedImage.src || "/placeholder.svg"}
              alt={enlargedImage.alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="relative z-10 flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Image Details</h2>
            <p className="mb-2">Title: {enlargedImage.alt}</p>
            <p className="mb-2">Artist: Unknown</p>
            <p className="mb-2">Year: 2023</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </section>
      )}
    </>
  )
}

