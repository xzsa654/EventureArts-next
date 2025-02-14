"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CiSearch } from "react-icons/ci"
import { MdSort } from "react-icons/md"
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import OnlineExhibitionCard from "../_components/OnlineExhibitionCard"
import AnimationLike from "../_components/AnimationLike"
import "../exhibit.css"


// Mock function to fetch online exhibitions
const fetchOnlineExhibitions = async () => {
  // In a real application, this would be an API call
  return [
    {
      id: "online-ex-1",
      title: "3D Virtual Art Gallery",
      description: "Explore a fully immersive 3D art gallery featuring works from contemporary artists.",
      thumbnail: "/placeholder.svg?height=300&width=400",
      type: "3D",
      artist: "Various Artists",
      date: "2025-01-01",
    },
    {
      id: "online-ex-2",
      title: "Interactive Sound Installation",
      description: "An audio-visual experience that responds to user interaction.",
      thumbnail: "/placeholder.svg?height=300&width=400",
      type: "Interactive",
      artist: "John Doe",
      date: "2025-02-15",
    },
    {
      id: "online-ex-3",
      title: "Digital Sculpture Showcase",
      description: "A collection of digital sculptures created using various 3D modeling techniques.",
      thumbnail: "/placeholder.svg?height=300&width=400",
      type: "3D",
      artist: "Jane Smith",
      date: "2025-03-30",
    },
  ]
}

export default function OnlineExhibitions() {
  const [exhibitions, setExhibitions] = useState([])
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  useEffect(() => {
    fetchOnlineExhibitions().then(setExhibitions)
  }, [])

  return (
    <div className="pt-[80px] min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-black bg-opacity-80">
      {/* input AnimationLike*/}
      <AnimationLike/>

        <div className="pt-[70px] px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-5xl font-black text-center mb-12 text-white">Online Exhibitions</h1>

            {/* Search Section */}
            <div className="max-w-xl mx-auto mb-8">
              <Input
                classNames={{
                  label: "text-white/90",
                  input: ["bg-transparent", "text-white", "placeholder:text-white/60", "text-sm", "py-2", "h-10"],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "bg-white/5",
                    "hover:bg-white/10",
                    "group-data-[focus=true]:bg-white/10",
                    "!cursor-text",
                    "rounded-full",
                    "border",
                    "border-white/10",
                  ],
                }}
                placeholder="Search online exhibitions..."
                startContent={<CiSearch className="text-lg text-white/60 pointer-events-none flex-shrink-0" />}
              />
            </div>

            {/* Advanced Search Toggle */}
            <div className="flex justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-sm px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                {showAdvancedSearch ? "Hide Advanced Search" : "Advanced Search"}
              </motion.button>
            </div>

            {/* Advanced Search Options */}
            <motion.div
              initial={false}
              animate={{ height: showAdvancedSearch ? "auto" : 0, opacity: showAdvancedSearch ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {showAdvancedSearch && (
                <div className="max-w-2xl mx-auto mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="w-full justify-start text-white border-white/20">
                          Exhibition Type
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Exhibition Type">
                        <DropdownItem key="all">All Types</DropdownItem>
                        <DropdownItem key="3d">3D</DropdownItem>
                        <DropdownItem key="interactive">Interactive</DropdownItem>
                        <DropdownItem key="vr">Virtual Reality</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="w-full justify-start text-white border-white/20">
                          Date
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Date">
                        <DropdownItem key="all">All Time</DropdownItem>
                        <DropdownItem key="thisMonth">This Month</DropdownItem>
                        <DropdownItem key="thisYear">This Year</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-white/5 text-white text-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                    endContent={<MdSort className="text-lg ml-1" />}
                  >
                    Sort By
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort By">
                  <DropdownItem key="newest">Newest to Oldest</DropdownItem>
                  <DropdownItem key="oldest">Oldest to Newest</DropdownItem>
                  <DropdownItem key="az">A-Z</DropdownItem>
                  <DropdownItem key="za">Z-A</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Exhibition Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {exhibitions.map((exhibition, index) => (
                <motion.div
                  key={exhibition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <OnlineExhibitionCard {...exhibition} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center">{/* Pagination component will be implemented here */}</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

