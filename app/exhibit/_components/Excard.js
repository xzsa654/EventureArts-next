"use client"

import Image from "next/image"
import Link from "next/link"

const Excard = ({ e_id, tag, image, date, title, description }) => {
  // Process tags to extract only English versions and limit length
  const tags = tag
    ? tag
        .split(",")
        .map((t) => {
          const parts = t.split("(")
          const englishTag = parts.length > 1 ? parts[1].replace(")", "").trim() : parts[0].trim()
          return englishTag.length > 10 ? englishTag.slice(0, 10) + "..." : englishTag
        })
        .filter((t) => t) // Remove any empty strings
    : []

  // Format date range to "yyyy-mm-dd - yyyy-mm-dd"
  const formatDateRange = (dateRange) => {
    const [start, end] = dateRange.split(" - ")
    const formatDate = (dateString) => {
      const d = new Date(dateString)
      return d instanceof Date && !isNaN(d) ? d.toISOString().split("T")[0] : ""
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  const formattedDate = date ? formatDateRange(date) : ""

  return (
    <Link href={`/exhibit/detail/${e_id}`} className="block">
      <div className="bg-white max-w-[400px] h-[500px] overflow-hidden relative p-8 pb-6 border-[1.5px] border-black transition-all duration-300 hover:scale-105 hover:bg-[#D4A84B] hover:shadow-md flex flex-col">
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {tags.map((tagItem, index) => (
            <span
              key={index}
              className="text-[10px] px-2 py-0.5 rounded-full border border-black text-black font-medium hover:border-white hover:text-white transition-colors"
            >
              {tagItem}
            </span>
          ))}
        </div>
        <div className="w-full aspect-[4/3] overflow-hidden mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold mb-2 text-black">{formattedDate}</div>
            <h2 className="text-sm leading-snug text-[#533527] mb-1.5 font-medium line-clamp-2">{title}</h2>
            <p className="text-xs leading-tight text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Excard

