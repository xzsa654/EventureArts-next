'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@heroui/react'
import CircularGallery from './CircularGallery'

export function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const getImageUrl = (media_url) => {
    if (!media_url) return '/placeholder.svg'
    return media_url.startsWith('http')
      ? media_url
      : `http://localhost:3001/uploads/chu-uploads/${media_url}`
  }

  // 整理給 CircularGallery 的 items
  const items = images.map((image) => ({
    image: getImageUrl(image.media_url),
    text: image.media_desc || 'Exhibition image',
  }))
  console.log(items)
  return (
    <div className="container mx-auto px-4 py-8">
      {/* CircularGallery */}
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          onClickItem={(index) => setSelectedImage(images[index])}
        />
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            className="absolute top-4 right-4 text-black"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedImage(null)
            }}
          >
            Close
          </Button>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <Image
              src={getImageUrl(selectedImage.media_url)}
              alt={selectedImage.media_desc}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
