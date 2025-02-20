"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const OnlineExhibitionCard = ({ id, title, description, thumbnail, type, artist, date }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
    <Link href={`/exhibit/online-detail/${id}`}>
      <div className="bg-white bg-opacity-5 overflow-hidden relative p-4 rounded-lg border border-white border-opacity-10 transition-all duration-300 hover:bg-opacity-10 hover:shadow-lg">
        <div className="aspect-[16/9] relative mb-4 overflow-hidden rounded-md">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-6 left-6 bg-white bg-opacity-90 text-black text-xs font-medium px-2 py-1 rounded-full">
          {type}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#D4A84B] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2 group-hover:text-white transition-colors duration-300">
          {description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
          <span>{artist}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  </motion.div>
)

export default OnlineExhibitionCard

