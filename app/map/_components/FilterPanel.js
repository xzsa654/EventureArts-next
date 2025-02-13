"use client"

import { useState } from "react"
import { DatePicker, Select, SelectItem } from "@heroui/react"
import "./FilterPanel.css"

export default function FilterPanel() {
  const [filters, setFilters] = useState({
    type: "",
    district: "",
    metro: "",
    station: "",
    date: null,
    price: "",
  })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearAll = () => {
    setFilters({
      type: "",
      district: "",
      metro: "",
      station: "",
      date: null,
      price: "",
    })
  }

  const districts = [
    "中正區",
    "大同區",
    "中山區",
    "松山區",
    "大安區",
    "萬華區",
    "信義區",
    "士林區",
    "北投區",
    "內湖區",
    "南港區",
    "文山區",
  ]
  const metros = ["紅線", "藍線", "綠線", "橘線", "棕線"]
  const stations = ["台北車站", "中山站", "西門站", "東門站", "忠孝復興站", "南京復興站", "中正紀念堂站"]
  const priceRanges = ["Free", "$ 0-100", "$ 100-500", "No price filter"]

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
            className={`filter-button ${filters.type === "courses" ? "active" : ""}`}
            onClick={() => handleFilterChange("type", "courses")}
          >
            Courses
          </button>
          <button
            className={`filter-button ${filters.type === "exhibitions" ? "active" : ""}`}
            onClick={() => handleFilterChange("type", "exhibitions")}
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
            onChange={(value) => handleFilterChange("district", value)}
          >
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
            onChange={(value) => handleFilterChange("metro", value)}
          >
            {metros.map((metro) => (
              <SelectItem key={metro} value={metro}>
                {metro}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Select station"
            variant="bordered"
            radius="full"
            value={filters.station}
            onChange={(value) => handleFilterChange("station", value)}
          >
            {stations.map((station) => (
              <SelectItem key={station} value={station}>
                {station}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="filter-section">
        <p>Date</p>
        <DatePicker
          placeholder="YY/MM/DD"
          variant="bordered"
          radius="full"
          value={filters.date}
          onChange={(date) => handleFilterChange("date", date)}
        />
      </div>

      <div className="filter-section">
        <p>Price Range</p>
        <Select
          placeholder="Select price range"
          variant="bordered"
          radius="full"
          value={filters.price}
          onChange={(value) => handleFilterChange("price", value)}
        >
          {priceRanges.map((range) => (
            <SelectItem key={range} value={range}>
              {range}
            </SelectItem>
          ))}
        </Select>
      </div>

      <button className="apply-button">
        Apply <span>→</span>
      </button>
    </div>
  )
}

