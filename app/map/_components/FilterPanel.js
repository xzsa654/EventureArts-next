'use client'

import { useState, useEffect } from 'react'
import { DatePicker, Select, SelectItem } from '@heroui/react'
import './FilterPanel.css'

export default function FilterPanel({
  onLineSelect = () => {},
  onDistrictSelect = () => {},
}) {
  // 初始過濾條件設定
  const [filters, setFilters] = useState({
    type: '',
    district: '',
    metro: '',
    station: '',
    date: '',
    price: '',
  })
  // MRT 路線與行政區選項
  const [mrtLines, setMrtLines] = useState([])
  const [districts, setDistricts] = useState([])

  // 載入 MRT 路線與行政區資料（GeoJSON）
  useEffect(() => {
    // 取得 MRT 路線資料
    fetch('/map/TPE_MRT_ROUTE_4326.geojson')
      .then((response) => response.json())
      .then((data) => {
        const lines = [
          ...new Set(
            data.features.map((feature) => feature.properties.MRTCODE)
          ),
        ]
        setMrtLines(lines)
      })
      .catch((error) => console.error('Error loading MRT routes:', error))

    // 取得行政區資料
    fetch('/map/TPE_Dist_4326.geojson')
      .then((response) => response.json())
      .then((data) => {
        const districtNames = [
          ...new Set(data.features.map((feature) => feature.properties.TNAME)),
        ]
        setDistricts(districtNames)
      })
      .catch((error) => console.error('Error loading districts:', error))
  }, [])

  // 當過濾條件變更時更新 state 並呼叫外部 callback
  const handleFilterChange = (key, value) => {
    console.log(`Filter ${key} changed:`, value)
    setFilters((prev) => ({ ...prev, [key]: value }))

    // 當選取 metro 或 district 時，通知父層
    if (key === 'metro') {
      onLineSelect(value)
    }
    if (key === 'district') {
      onDistrictSelect(value)
    }
  }

  // 清除所有過濾條件並通知父層重置
  const clearAll = () => {
    const defaultFilters = {
      type: '',
      district: '',
      metro: '',
      station: '',
      date: '',
      price: '',
    }
    setFilters(defaultFilters)
    onLineSelect('')
    onDistrictSelect('')
  }

  // 預設站點與價格範圍資料（可依需求改成從後端取得）
  const stations = [
    '台北車站',
    '中山站',
    '西門站',
    '東門站',
    '忠孝復興站',
    '南京復興站',
    '中正紀念堂站',
  ]
  const priceRanges = ['Free', '$ 0-100', '$ 100-500', 'No price filter']

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="clear-all" onClick={clearAll}>
          Clear all
        </button>
      </div>

      {/* 篩選類型區塊 */}
      <div className="filter-section">
        <p>Find</p>
        <div className="filter-buttons">
          <button
            className={`filter-button border-1.5 ${filters.type === 'courses' ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'courses')}
          >
            Courses
          </button>
          <button
            className={`filter-button border-1.5 ${filters.type === 'exhibitions' ? 'active' : ''}`}
            onClick={() => handleFilterChange('type', 'exhibitions')}
          >
            Exhibitions
          </button>
        </div>
      </div>

      {/* 篩選地點區塊 */}
      <div className="filter-section">
        <p>Location</p>
        <div className="dropdown-group">
          {/* 行政區選擇 */}
          <Select
            placeholder="Select district"
            variant="bordered"
            radius="full"
            value={filters.district}
            onChange={(e) => handleFilterChange("district", e.target.value)}
            classNames={{ trigger: 'border-1.5 border-black' }}
            aria-label="Select district"
          >
            <SelectItem value="All Districts">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </Select>

          {/* 地鐵線路選擇 */}
          <Select
            placeholder="Select metro line"
            variant="bordered"
            radius="full"
            value={filters.metro}
            onChange={(e) => handleFilterChange("metro", e.target.value)}
            classNames={{ trigger: 'border-1.5 border-black' }}
            aria-label="Select metro line"
          >
            <SelectItem value="All Lines">All Lines</SelectItem>
            {mrtLines.map((line) => (
              <SelectItem key={line} value={line}>
                {line}
              </SelectItem>
            ))}
          </Select>

          {/* 車站選擇 */}
          <Select
            placeholder="Select station"
            variant="bordered"
            radius="full"
            value={filters.station}
            onChange={(e) => handleFilterChange("station", e.target.value)}
            classNames={{ trigger: 'border-1.5 border-black' }}
            aria-label="Select station"
          >
            {stations.map((station) => (
              <SelectItem key={station} value={station}>
                {station}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* 篩選日期區塊 */}
      <div className="filter-section">
        <p>Date</p>
        <DatePicker
          placeholder="YY/MM/DD"
          variant="underlined"
          // radius="full"
          // value={filters.date}
          // inputWrapper="border-1.5 border-black bg-transparent"
          aria-label="Select date"
        />
      </div>

      {/* 篩選價格區塊 */}
      <div className="filter-section">
        <p>Price Range</p>
        <Select
          placeholder="Select price range"
          variant="bordered"
          radius="full"
          value={filters.price}
          onChange={(e) => handleFilterChange("price", e.target.value)}
          classNames={{ trigger: 'border-1.5 border-black' }}
          aria-label="Select price range"
        >
          {priceRanges.map((range) => (
            <SelectItem key={range} value={range}>
              {range}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Apply 按鈕（保留原本功能，可視需求觸發額外行為） */}
      <button className="apply-button border-1.5">
        Apply <span>→</span>
      </button>
    </div>
  )
}
