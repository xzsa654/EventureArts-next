'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react'
import { CiSearch } from 'react-icons/ci'
import { MdSort } from 'react-icons/md'
import useSWR from 'swr'
import OnlineExhibitionCard from '../_components/OnlineExhibitionCard'
import AnimationLike from '../_components/AnimationLike'
import '../exhibit.css'
import Loading from "../loading"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function OnlineExhibitions({ e_id }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [exType, setExType] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [sortOption, setSortOption] = useState('')

  // 注意：若後端是用 `req.query.form` 來判斷，就改成 `?form=online`
  // 若後端是用 `req.query.exhibition_form` 來判斷，就用 `?exhibition_form=online`
  // 這裡假設用 `?form=online`
  const url = `${API_BASE_URL}/exhibit?form=online&page=${currentPage}&search=${searchText}&type=${exType}&date=${dateRange}&sort=${sortOption}`

  // 使用 SWR 獲取展覽資料
  const { data: exhibitions, error } = useSWR(url, fetcher)
  
  console.log("Fetched Exhibition Data:", exhibitions?.data);

  if (error)
    return <div className="text-white">Error loading online exhibitions</div>
  if (!exhibitions) return <Loading />

  return (
    <div className="pt-[80px] min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-black bg-opacity-80">
        {/* 你的自訂動畫元件 */}
        <AnimationLike />

        <div className="pt-[70px] px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-5xl font-black text-center mb-12 text-white">
              Online Exhibitions
            </h1>

            {/* Search Section */}
            <div className="max-w-xl mx-auto mb-8">
              <Input
                classNames={{
                  label: 'text-white/90',
                  input: [
                    'bg-transparent',
                    'text-white',
                    'placeholder:text-white/60',
                    'text-[13px]',
                    'py-1',
                    'h-9',
                  ],
                  innerWrapper: 'bg-transparent',
                  inputWrapper: [
                    'bg-transparent',
                    'hover:bg-transparent',
                    'group-data-[focus=true]:bg-transparent',
                    '!cursor-text',
                  ],
                }}
                placeholder="可輸入作者／作品名等關鍵字"
                variant="underlined"
                startContent={
                  <CiSearch className="text-lg text-white/90 pointer-events-none flex-shrink-0 w-5 h-5" />
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Advanced Search Options */}
            <div
              className={`max-w-xl mx-auto mb-8 overflow-hidden transition-all duration-300 ease-in-out ${
                showAdvancedSearch
                  ? 'advanced-search-open'
                  : 'advanced-search-closed'
              }`}
            >
              <div className="p-4 border border-white/30 rounded-lg advanced-search">
                <div className="grid grid-cols-2 gap-4">
                  {/* Exhibition Type 下拉選單 */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start text-white border-white/30"
                      >
                        Exhibition Type
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Exhibition Type"
                      onAction={(key) => setExType(key)}
                    >
                      <DropdownItem key="all">All Types</DropdownItem>
                      <DropdownItem key="3D">3D</DropdownItem>
                      <DropdownItem key="interactive">Interactive</DropdownItem>
                      <DropdownItem key="vr">Virtual Reality</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  {/* Date 下拉選單 */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start text-white border-white/30"
                      >
                        Date
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Date"
                      onAction={(key) => setDateRange(key)}
                    >
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
              <button
                className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <span>{showAdvancedSearch ? '隱藏進階搜尋' : '進階搜尋'}</span>
              </button>
              <button className="hero-btn text-[14px] px-4 py-1 rounded-full border border-white text-white">
                <span>搜尋</span>
              </button>
            </div>

            {/* Sort Dropdown */}
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
                <DropdownMenu
                  aria-label="Sort By"
                  onAction={(key) => setSortOption(key)}
                >
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
              {exhibitions?.data?.map((exhibition) => (
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

            {/* Pagination Placeholder */}
            <div className="flex justify-center">
              {/* Pagination will be implemented here */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
