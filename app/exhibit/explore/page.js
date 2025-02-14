"use client"

import { useState } from "react"
import Excard from "../_components/Excard"
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import { MdSort } from "react-icons/md"
import "./styles.css"

export default function ExploreExhibitions() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  // Example exhibition data
  const exhibitions = Array(6)
    .fill()
    .map((_, index) => ({
      e_id: `ex-${index + 1}`,
      tag: "NATURAL",
      image: "/chu-images/img_9.jpg",
      date: "2025 | Dec.12th -Dec.20th",
      title: "Root your designs in earthy visuals that reflect the spirit of the",
      description: "Root your designs in earthy visuals that reflect the spiri...",
    }))

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/chu-images/img-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <div className="min-h-screen">
          <div className="pt-[120px] px-4 py-8">
            <div className="max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl font-black text-center mb-12 text-white">Explore your exhibition</h1>

              {/* Main search input */}
              <div className="max-w-xl mx-auto mb-8">
                <Input
                  classNames={{
                    label: "text-white/90",
                    input: ["bg-transparent", "text-white", "placeholder:text-white/60", "text-[13px]", "py-1", "h-9"],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-transparent",
                      "hover:bg-transparent",
                      "group-data-[focus=true]:bg-transparent",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="可輸入作者／作品名等關鍵字"
                  variant="underlined"
                  startContent={
                    <CiSearch className="text-lg text-white/90 pointer-events-none flex-shrink-0 w-5 h-5" />
                  }
                />
              </div>

              {/* Advanced search area */}
              <div
                className={`max-w-xl mx-auto mb-8 overflow-hidden transition-all duration-300 ease-in-out ${
                  showAdvancedSearch ? "advanced-search-open" : "advanced-search-closed"
                }`}
              >
                <div className="p-4 border border-white/30 rounded-lg advanced-search">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Exhibition Type dropdown */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="w-full justify-start text-white border-white/30">
                          Exhibition Type
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Exhibition Type">
                        <DropdownItem key="all">All</DropdownItem>
                        <DropdownItem key="online">Online</DropdownItem>
                        <DropdownItem key="offline">Offline</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Date dropdown */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="w-full justify-start text-white border-white/30">
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
              </div>

              {/* Search buttons */}
              <div className="flex justify-center gap-3 mb-8">
                {/* Toggle advanced search button */}
                <button
                  className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                >
                  <span>{showAdvancedSearch ? "隱藏進階搜尋" : "進階搜尋"}</span>
                </button>
                {/* Main search button */}
                <button className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white">
                  <span>搜尋</span>
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              {/* Sort By dropdown */}
              <div className="mb-4 flex justify-end">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="bg-transparent text-white text-[14px] px-0 py-1 h-[34px] flex items-center min-w-0"
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

              {/* Exhibition grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {exhibitions.map((exhibition) => (
                  <Excard
                    key={exhibition.e_id}
                    e_id={exhibition.e_id}
                    tag={exhibition.tag}
                    image={exhibition.image}
                    date={exhibition.date}
                    title={exhibition.title}
                    description={exhibition.description}
                  />
                ))}
              </div>

              {/* Pagination placeholder */}
              {/* TODO: Implement pagination component */}
              <div className="flex justify-center">{/* Pagination will be implemented here */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

