'use client'

import { useState, useEffect } from 'react'
import { DatePicker, Select, SelectItem } from '@heroui/react'
import './FilterPanel.css'


export default function FilterPanel({
  onLineSelect = () => {},
  onDistrictSelect = () => {},
}) {
  const [filters, setFilters] = useState({
    type: '',
    district: '',
    metro: '',
    station: '',
    date: null,
    price: '',
  })
  const [mrtLines, setMrtLines] = useState([])
  const [districts, setDistricts] = useState([])

  useEffect(() => {
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

  const handleFilterChange = (key, value) => {
    console.log(value)
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (key === 'metro') {
      onLineSelect(value)
    }
    if (key === 'district') {
      onDistrictSelect(value)
    }
  }

  const clearAll = () => {
    setFilters({
      type: '',
      district: '',
      metro: '',
      station: '',
      date: null,
      price: '',
    })
    onLineSelect('')
    onDistrictSelect('')
  }

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
  // const [value, setValue] = useState(null);

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="clear-all" onClick={clearAll}>
          Clear all
        </button>
      </div>

      <div className="filter-section">
        <p>Find</p>
        <div className="filter-buttons">
          <button
            className={`filter-button border-1.5 ${
              filters.type === 'courses' ? 'active' : ''
            }`}
            onClick={() => handleFilterChange('type', 'courses')}
          >
            Courses
          </button>
          <button
            className={`filter-button border-1.5 ${
              filters.type === 'exhibitions' ? 'active' : ''
            }`}
            onClick={() => handleFilterChange('type', 'exhibitions')}
          >
            Exhibitions
          </button>
        </div>
      </div>

      <div className="filter-section">
        <p>Location</p>
        <div className="dropdown-group">
          <Select
            placeholder="Select district"
            variant="bordered"
            radius="full"
            value={filters.district}
            onChange={(value) => handleFilterChange('district', value)}
            classNames={{
              trigger: 'border-1.5 border-black',
            }}
            aria-label="Select district"
          >
            <SelectItem value="All Districts">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Select metro line"
            variant="bordered"
            radius="full"
            value={filters.metro}
            onChange={(value) => handleFilterChange('metro', value)}
            classNames={{
              trigger: 'border-1.5 border-black',
            }}
            aria-label="Select metro line"
          >
            <SelectItem value="All Lines">All Lines</SelectItem>
            {mrtLines.map((line) => (
              <SelectItem key={line} value={line}>
                {line}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Select station"
            variant="bordered"
            radius="full"
            value={filters.station}
            onChange={(value) => handleFilterChange('station', value)}
            classNames={{
              trigger: 'border-1.5 border-black',
            }}
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

      <div className="filter-section ">
        <p>Date</p>
        <DatePicker
          placeholder="YY/MM/DD"
          variant="borded"
          radius="full"
          value={filters.date}
          onChange={(date) => handleFilterChange("date", date)}
          inputWrapper="border-1.5 border-black bg-transparent"
          aria-label="Select date"
        />
      </div>

      <div className="filter-section">
        <p>Price Range</p>
        <Select
          placeholder="Select price range"
          variant="bordered"
          radius="full"
          value={filters.price}
          onChange={(value) => handleFilterChange('price', value)}
          classNames={{
            trigger: 'border-1.5 border-black',
          }}
          aria-label="Select price range"
        >
          {priceRanges.map((range) => (
            <SelectItem key={range} value={range}>
              {range}
            </SelectItem>
          ))}
        </Select>
      </div>

      <button className="apply-button border-1.5">
        Apply <span>→</span>
      </button>
    </div>
  )
}
