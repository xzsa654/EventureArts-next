'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Excard from '../_components/Excard'
import { Input } from '@heroui/react'



export default function ExploreExhibitions() {
  const [currentPage, setCurrentPage] = useState(1)

  // Example exhibition data
  const exhibitions = Array(6).fill({
    tag: 'NATURAL',
    image: '/chu-images/img_9.jpg',
    date: '2025 | Dec.12th -Dec.20th',
    title: 'Root your designs in earthy visuals that reflect the spirit of the',
    description:
      'Root your designs in earthy visuals that reflect the spiri...',
  })

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-4 py-8 mt-[80px]">
      {/* Title */}
      <h1 className="text-4xl font-black text-center mb-8">
        Explore your exhibition
      </h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">

          {/* hero UI search */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                classNames={{
                  label: 'text-black/50 dark:text-white/90',
                  input: [
                    'bg-transparent',
                    'text-black/90 dark:text-white/90',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                }}
                placeholder="可輸入作者／作品名等關鍵字"
                type="text"
                variant="underlined"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
          進階搜尋
        </button>
        <button className="px-4 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
          搜尋
        </button>
      </div>

      {/* Exhibition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
        {exhibitions.map((exhibition, index) => (
          <Excard
            key={index}
            tag={exhibition.tag}
            image={exhibition.image}
            date={exhibition.date}
            title={exhibition.title}
            description={exhibition.description}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full ${
              currentPage === page
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-2">...</span>
        <button className="w-8 h-8 rounded-full hover:bg-gray-100">100</button>
      </div>
    </div>
  )
}
