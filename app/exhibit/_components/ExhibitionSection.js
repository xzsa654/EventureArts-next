"use client"
import Image from "next/image"
import "../exhibit.css"

const defaultImages = [
  "/chu-images/img_9.jpg",
  "/chu-images/img_5.jpg",
  "/chu-images/img_15.jpg",
  "/chu-images/img_18.jpg",
]

export default function ExhibitionSection({ onExhibitionSelect, exhibitions = [] }) {
  // Group items by column (assuming we want to maintain 3 columns)
  const columns = [[], [], []]
  exhibitions.forEach((exhibition, index) => {
    columns[index % 3].push(exhibition)
  })

  const getDefaultImage = (index) => {
    return defaultImages[index % defaultImages.length]
  }

  const renderColumn = (items, animationDelay = "0s", columnIndex) => (
    <div className="carousel-column" style={{ animationDelay }}>
      {/* Original items */}
      {items.map((exhibition, index) => (
        <div key={exhibition.e_id} className="font-en mb-16 space-y-4">
          <span className="block text-7xl font-light">{exhibition.e_id}</span>
          <div
            className="relative aspect-[3/4] cursor-pointer group overflow-hidden w-[300px]"
            onClick={() => onExhibitionSelect(exhibition)}
          >
            <Image
              src={exhibition.e_images?.[0] || getDefaultImage(columnIndex * items.length + index)}
              alt={exhibition.e_name}
              fill
              sizes="(max-width: 768px) 150vw, (max-width: 1200px) 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg">{exhibition.e_name}</h3>
            
          </div>
        </div>
      ))}
      {/* Duplicated items for seamless loop */}
      {items.map((exhibition, index) => (
        <div key={`${exhibition.e_id}-duplicate`} className="mb-8 space-y-1">
          <span className="block text-7xl font-light">{exhibition.e_id}</span>
          <div
            className="relative aspect-[3/4] cursor-pointer group overflow-hidden w-[300px]"
            onClick={() => onExhibitionSelect(exhibition)}
          >
            <Image
              src={exhibition.e_images?.[0] || getDefaultImage(columnIndex * items.length + index)}
              alt={exhibition.e_name}
              fill
              sizes="(max-width: 768px) 150vw, (max-width: 1200px) 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg">{exhibition.e_name}</h3>
            
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative h-[700px]">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image src="/chu-images/img-bg.jpg" alt="Background" fill className="object-cover" priority />
      </div>

      {/* this is Left text + carousel area  */}
      <section className="relative min-h-screen">
        <div className="flex justify-between px-5 w-full">
          {/* Left side title - rotated 90 degrees */}
          <div className="w-1/4 flex items-center h-screen">
            <h1 className="left-text text-2xl font-serif transform -rotate-90 origin-left whitespace-nowrap ml-8">
              Current Exhibition
            </h1>
          </div>

          {/* Right side vertical carousels */}
          <div
            className="w-[70%] grid grid-cols-3 gap-1 overflow-hidden relative pr-0 ml-auto justify-items-end"
            style={{ height: "700px" }}
          >
            {/* Vertical lines */}
            <div className="vertical-line left-1/3"></div>
            <div className="vertical-line left-2/3"></div>

            {/* Each column has different animation delay for varied movement */}
            <div className="overflow-hidden">{renderColumn(columns[0], "0s", 0)}</div>
            <div className="overflow-hidden">{renderColumn(columns[1], "-3s", 1)}</div>
            <div className="overflow-hidden">{renderColumn(columns[2], "-6s", 2)}</div>
          </div>
        </div>
      </section>
    </section>
  )
}

