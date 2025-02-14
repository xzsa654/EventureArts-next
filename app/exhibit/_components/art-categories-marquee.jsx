"use client"

import { useState } from "react"

// Move this function outside of the component to ensure consistent randomization
function getRandomStars(categories) {
  return categories.map((category) => ({
    ...category,
    star: Math.random() < 0.3, // 30% chance of having a star
  }))
}

// This will be called on the server and remain consistent across renders
const categoriesWithStars = getRandomStars([
  { main: "Visual Arts", sub: "Art" },
  { main: "Contemporary Art", sub: "Modern" },
  { main: "Art and Technology", sub: "Digital" },
  { main: "Historical Art", sub: "Classic" },
  { main: "Social and Political Art", sub: "Society" },
  { main: "Art and Culture", sub: "Culture" },
  { main: "Art Installation", sub: "Design" },
  { main: "Interactive Art", sub: "Media" },
])

export default function ArtCategoriesMarquee() {
  const [isHovered, setIsHovered] = useState(false)

  const CategoryItem = ({ category }) => (
    <div className="flex items-center justify-center">
      <span className="text-xl font-bold tracking-wider">{category.main}</span>
      {category.sub && (
        <div className="relative ml-1">
          <span className="relative px-2 py-1 text-sm">
            {category.sub}
            <svg className="absolute inset-0 w-full h-full -z-10" style={{ transform: "translate(-1px, -1px)" }}>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="12"
                ry="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </span>
        </div>
      )}
      {category.star && <span className="ml-1 text-xl">★</span>}
    </div>
  )

  const CategoryRow = ({ categories, prefix = "", reverse = false }) => (
    <div
      className={`flex whitespace-nowrap ${reverse ? "flex-row-reverse" : ""}`}
      style={{
        animation: isHovered ? "none" : `marquee${reverse ? "Reverse" : ""} 30s linear infinite`,
      }}
    >
      <div className="flex">
        {[...Array(3)].map((_, i) => (
          <div key={`${prefix}-set-${i}`} className="flex">
            {categories.map((category, index) => (
              <CategoryItem key={`${prefix}-${i}-${index}`} category={category} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className="relative max-w-full overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CategoryRow categories={categoriesWithStars} prefix="top" />
      <CategoryRow categories={categoriesWithStars} prefix="middle" reverse={true} />
      <CategoryRow categories={categoriesWithStars} prefix="bottom" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  )
}

