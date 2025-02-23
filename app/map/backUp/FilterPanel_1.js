"use client"

import { useState, useEffect } from "react"
import { DatePicker, Select, SelectItem, RadioGroup, Radio } from "@heroui/react"
import "./FilterPanel.css"

export default function FilterPanel({
  onLineSelect = () => {},
  onDistrictSelect = () => {},
  onStationSelect = () => {},
  onApplyFilter = () => {},
}) {
  const [filters, setFilters] = useState({
    type: "",
    searchBy: "district", // 'district' or 'mrt'
    district: "",
    metro: "",
    station: "",
    date: "",
    price: "",
  })
  const [districts, setDistricts] = useState([])
  const [metroData, setMetroData] = useState({ mrt_lines: [] })
  const [availableStations, setAvailableStations] = useState([])

  useEffect(() => {
    // Load districts
    fetch("/map/TPE_Dist_4326.geojson")
      .then((response) => response.json())
      .then((data) => {
        const districtNames = [...new Set(data.features.map((feature) => feature.properties.TNAME))]
        setDistricts(districtNames)
      })
      .catch((error) => console.error("Error loading districts:", error))

    // Load metro lines and stations
    fetch("/map/TPE_metroLineStation.json")
      .then((response) => response.json())
      .then((data) => {
        setMetroData(data)
      })
      .catch((error) => console.error("Error loading metro lines:", error))
  }, [])

  // Update available stations when metro line changes
  useEffect(() => {
    if (filters.metro && filters.metro !== "all") {
      const selectedLine = metroData.mrt_lines.find((line) => line.line === filters.metro)
      if (selectedLine) {
        setAvailableStations(selectedLine.stations)
        // Reset station selection if current selection is not in the new line
        if (filters.station && !selectedLine.stations.some((station) => station.station_id === filters.station)) {
          handleFilterChange("station", { target: { value: "all" } })
        }
      }
    } else {
      setAvailableStations([])
    }
  }, [filters.metro, metroData, filters.station])

  const handleSearchByChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      searchBy: value,
      district: "",
      metro: "",
      station: "",
    }))
    onDistrictSelect("")
    onLineSelect("")
    onStationSelect("")
  }

  const handleFilterChange = (key, e) => {
    const value = e.target.value
    console.log(`Filter ${key} changed:`, value)
    setFilters((prev) => ({ ...prev, [key]: value }))

    // Immediate updates for highlighting
    if (key === "district" && filters.searchBy === "district") {
      onDistrictSelect(value === "all" ? "" : value)
    }
    if (key === "metro" && filters.searchBy === "mrt") {
      onLineSelect(value === "all" ? "" : value)
      // Reset station when line changes
      setFilters((prev) => ({ ...prev, station: "" }))
      onStationSelect("")
    }
    if (key === "station" && filters.searchBy === "mrt") {
      // Don't trigger location display until Apply is clicked
      onStationSelect(value === "all" ? "" : value)
    }
  }

  const handleApply = () => {
    // Only send the relevant search criteria
    const searchCriteria = {
      type: filters.searchBy,
      value: filters.searchBy === "district" ? filters.district : filters.station,
      line: filters.metro,
    }
    onApplyFilter(searchCriteria)
  }

  const clearAll = () => {
    const defaultFilters = {
      type: "",
      searchBy: "district",
      district: "",
      metro: "",
      station: "",
      date: "",
      price: "",
    }
    setFilters(defaultFilters)
    onLineSelect("")
    onDistrictSelect("")
    onStationSelect("")
    onApplyFilter(null)
  }

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
            className={`filter-button border-1.5 ${filters.type === "courses" ? "active" : ""}`}
            onClick={() => handleFilterChange("type", { target: { value: "courses" } })}
          >
            Courses
          </button>
          <button
            className={`filter-button border-1.5 ${filters.type === "exhibitions" ? "active" : ""}`}
            onClick={() => handleFilterChange("type", { target: { value: "exhibitions" } })}
          >
            Exhibitions
          </button>
        </div>
      </div>

      <div className="filter-section">
        <p>Search By</p>
        <RadioGroup value={filters.searchBy} onValueChange={handleSearchByChange} className="flex flex-col gap-2">
          <Radio value="district">District</Radio>
          <Radio value="mrt">MRT Station</Radio>
        </RadioGroup>
      </div>

      <div className="filter-section">
        <p>Location</p>
        <div className="dropdown-group">
          {filters.searchBy === "district" ? (
            <Select
              placeholder="Select district"
              variant="bordered"
              radius="full"
              value={filters.district}
              onChange={(e) => handleFilterChange("district", e)}
              classNames={{ trigger: "border-1.5 border-black" }}
              aria-label="Select district"
            >
              <SelectItem value="all">All Districts</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </Select>
          ) : (
            <>
              <Select
                placeholder="Select metro line"
                variant="bordered"
                radius="full"
                value={filters.metro}
                onChange={(e) => handleFilterChange("metro", e)}
                classNames={{ trigger: "border-1.5 border-black" }}
                aria-label="Select metro line"
              >
                <SelectItem value="all">All Lines</SelectItem>
                {metroData.mrt_lines.map((line) => (
                  <SelectItem key={line.line} value={line.line}>
                    {line.line}
                  </SelectItem>
                ))}
              </Select>

              <Select
                placeholder="Select station"
                variant="bordered"
                radius="full"
                value={filters.station}
                onChange={(e) => handleFilterChange("station", e)}
                classNames={{ trigger: "border-1.5 border-black" }}
                aria-label="Select station"
                isDisabled={!filters.metro || filters.metro === "all"}
              >
                <SelectItem value="all">All Stations</SelectItem>
                {availableStations.map((station) => (
                  <SelectItem key={station.station_id} value={station.station_id}>
                    {station.name_chinese} {station.name_english}
                  </SelectItem>
                ))}
              </Select>
            </>
          )}
        </div>
      </div>

      <div className="filter-section">
        <p>Date</p>
        <DatePicker placeholder="YY/MM/DD" variant="underlined" aria-label="Select date" />
      </div>

      <div className="filter-section">
        <p>Price Range</p>
        <Select
          placeholder="Select price range"
          variant="bordered"
          radius="full"
          value={filters.price}
          onChange={(e) => handleFilterChange("price", e)}
          classNames={{ trigger: "border-1.5 border-black" }}
          aria-label="Select price range"
        >
          {priceRanges.map((range) => (
            <SelectItem key={range} value={range}>
              {range}
            </SelectItem>
          ))}
        </Select>
      </div>

      <button className="apply-button border-1.5" onClick={handleApply}>
        Apply <span>→</span>
      </button>
    </div>
  )
}

