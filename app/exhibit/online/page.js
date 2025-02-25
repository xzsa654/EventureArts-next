"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import { MdSort } from "react-icons/md"
import useSWR from "swr"
import OnlineExhibitionCard from "../_components/OnlineExhibitionCard"
import AnimationLike from "../_components/AnimationLike"
import "../exhibit.css"
import Loading from "../loading"
import PaginationAdapter from "../PaginationAdapter"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

// Static options from your e_options table
const EXHIBITION_OPTIONS = [
  { e_optionID: 1, e_optionName: "視覺藝術 (Visual Arts)" },
  { e_optionID: 2, e_optionName: "當代藝術 (Contemporary Art)" },
  { e_optionID: 3, e_optionName: "藝術與科技 (Art and Technology)" },
  { e_optionID: 4, e_optionName: "歷史藝術 (Historical Art)" },
  { e_optionID: 5, e_optionName: "社會與政治藝術 (Social and Political Art)" },
  { e_optionID: 6, e_optionName: "藝術與文化 (Art and Culture)" },
  { e_optionID: 7, e_optionName: "藝術裝置與展覽設計 (Art Installation and Exhibition Design)" },
  { e_optionID: 8, e_optionName: "交互式藝術 (Interactive Art)" },
]

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OnlineExhibitions() {
  // State for search and filters
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    exhibitionStatus: "",
    e_optionID: "",
    sort: "asc",
    page: 1,
    perPage: 9,
    exhibition_form: "online", // Always show online exhibitions
  })
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  // Create query string from search params
  const createQueryString = useCallback((params) => {
    const queryParams = { ...params }

    // Only include non-empty values
    if (!queryParams.keyword) delete queryParams.keyword
    if (!queryParams.exhibitionStatus) delete queryParams.exhibitionStatus
    if (!queryParams.e_optionID && queryParams.e_optionID !== 0) delete queryParams.e_optionID
    if (queryParams.sort === "asc") delete queryParams.sort
    // Always include exhibition_form=online
    queryParams.exhibition_form = "online"

    console.log("Query params:", queryParams)

    return Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")
  }, [])

  // Fetch exhibitions data with useSWR
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URL}/exhibit?${createQueryString(searchParams)}`, fetcher)

  // Handle search
  const handleSearch = () => {
    setSearchParams((prev) => ({ ...prev, page: 1 }))
  }

  // Handle status change
  const handleStatusChange = (status) => {
    setSearchParams((prev) => ({
      ...prev,
      exhibitionStatus: status,
      page: 1,
    }))
  }

  // Handle exhibition type change
  const handleTypeChange = (optionId) => {
    const numericId = optionId === "" ? "" : Number(optionId)
    setSearchParams((prev) => ({
      ...prev,
      e_optionID: numericId,
      page: 1,
    }))
  }

  // Handle sort change
  const handleSortChange = (sort) => {
    setSearchParams((prev) => ({
      ...prev,
      sort,
      page: 1,
    }))
  }

  // Handle page change
  const handlePageChange = (page) => {
    console.log("handlePageChange called with page:", page)
    setSearchParams((prev) => {
      console.log("Previous search params:", prev)
      const newParams = { ...prev, page }
      console.log("New search params:", newParams)
      return newParams
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reset filters
  const handleResetFilters = () => {
    setSearchParams({
      keyword: "",
      exhibitionStatus: "",
      e_optionID: "",
      sort: "asc",
      page: 1,
      perPage: 9,
      exhibition_form: "online", // Maintain the online filter when resetting
    })
  }

  // Check if any filters are active
  const hasActiveFilters =
    searchParams.keyword !== "" ||
    searchParams.exhibitionStatus !== "" ||
    searchParams.e_optionID !== "" ||
    searchParams.sort !== "asc"

  if (error) return <div className="text-white text-center pt-[200px]">Error loading exhibitions</div>
  if (isLoading) return <Loading />

  return (
    <div className="pt-[80px] min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-black bg-opacity-80">
        {/* Custom animation component */}
        <AnimationLike />

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
                value={searchParams.keyword}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, keyword: e.target.value }))}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
                startContent={<CiSearch className="text-lg text-white/90 pointer-events-none flex-shrink-0 w-5 h-5" />}
              />
            </div>

            {/* Advanced search area */}
            <div
              className={`max-w-xl mx-auto mb-8 overflow-hidden transition-all duration-300 ease-in-out ${
                showAdvancedSearch ? "advanced-search-open" : "advanced-search-closed"
              }`}
              style={{
                transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <div className="p-4 border border-white/30 rounded-lg advanced-search">
                <div className="grid grid-cols-2 gap-4">
                  {/* Exhibition Status Filter */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="w-full justify-start text-white border-white/30">
                        {!searchParams.exhibitionStatus
                          ? "All Exhibitions"
                          : searchParams.exhibitionStatus === "current"
                            ? "Current Exhibition"
                            : searchParams.exhibitionStatus === "future"
                              ? "Future Exhibition"
                              : searchParams.exhibitionStatus === "down"
                                ? "Down Exhibition"
                                : "Past Exhibition"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Exhibition Status" onAction={handleStatusChange}>
                      <DropdownItem key="">All Exhibitions</DropdownItem>
                      <DropdownItem key="current">Current Exhibition</DropdownItem>
                      <DropdownItem key="future">Future Exhibition</DropdownItem>
                      <DropdownItem key="past">Past Exhibition</DropdownItem>
                      <DropdownItem key="down">Down Exhibition</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  {/* Exhibition Type Filter */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="w-full justify-start text-white border-white/30">
                        {!searchParams.e_optionID
                          ? "All Types"
                          : EXHIBITION_OPTIONS.find((opt) => opt.e_optionID === searchParams.e_optionID)
                              ?.e_optionName || "Select Type"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Exhibition Type"
                      onAction={handleTypeChange}
                      className="max-h-[300px] overflow-y-auto"
                    >
                      <DropdownItem key="">All Types</DropdownItem>
                      {EXHIBITION_OPTIONS.map((option) => (
                        <DropdownItem key={option.e_optionID.toString()}>{option.e_optionName}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>

            {/* Search buttons */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <span>{showAdvancedSearch ? "隱藏進階搜尋" : "進階搜尋"}</span>
              </button>
              <button
                className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white"
                onClick={handleSearch}
              >
                <span>搜尋</span>
              </button>
              {hasActiveFilters && (
                <button
                  className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white"
                  onClick={handleResetFilters}
                >
                  <span>重置篩選</span>
                </button>
              )}
            </div>

            {/* Sort By dropdown */}
            <div className="flex justify-end mb-6">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-transparent text-white text-[14px] px-0 py-1 h-[34px] flex items-center min-w-0"
                    endContent={<MdSort className="text-lg ml-1" />}
                  >
                    Sort By
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort By" onAction={handleSortChange}>
                  <DropdownItem key="desc">Newest to Oldest</DropdownItem>
                  <DropdownItem key="asc">Oldest to Newest</DropdownItem>
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
              {response?.data?.map((exhibition) => (
                <motion.div
                  key={exhibition.e_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <OnlineExhibitionCard
                    key={exhibition.e_id}
                    e_id={exhibition.e_id}
                    tag={exhibition.e_optionNames}
                    cover_image={exhibition.cover_image}
                    date={`${exhibition.e_startdate} - ${exhibition.e_enddate}`}
                    title={exhibition.e_name}
                    description={exhibition.e_desc}
                    artist={exhibition.bd_name}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No results message */}
            {(!response?.data || response.data.length === 0) && (
              <div className="text-white text-center py-8">
                No exhibitions found. Try adjusting your search criteria.
              </div>
            )}

            {/* Pagination */}
            {response?.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <PaginationAdapter
                  totalPages={response.totalPages}
                  onPageChange={handlePageChange}
                  currentPage={searchParams.page}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

