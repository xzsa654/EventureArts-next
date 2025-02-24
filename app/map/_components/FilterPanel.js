"use client"

import { useState, useEffect } from "react"
import { DatePicker, Select, SelectItem, RadioGroup, Radio } from "@heroui/react"
import "./FilterPanel.css"

export default function FilterPanel({
  metroData,
  onLineSelect = () => {},
  onDistrictSelect = () => {},
  onStationSelect = () => {},
  onApplyFilter = () => {},
  selectedMRT,
}) {
  const [filters, setFilters] = useState({
    type: "",
    searchBy: "district",
    district: "",
    metro: "",
    station: "",
    date: "",
    price: "",
  })
  const [districts, setDistricts] = useState([])
  const [availableStations, setAvailableStations] = useState([])

  // Load districts data
  useEffect(() => {
    fetch("/map/TPE_Dist_4326.geojson")
      .then((response) => response.json())
      .then((data) => {
        const districtNames = [...new Set(data.features.map((feature) => feature.properties.TNAME))]
        setDistricts(districtNames)
      })
      .catch((error) => console.error("Error loading districts:", error))
  }, [])

  // Update available stations when metro line changes
  useEffect(() => {
    if (filters.metro && filters.metro !== "all" && metroData.mrt_lines) {
      const selectedLine = metroData.mrt_lines.find((line) => line.line === filters.metro)
      if (selectedLine) {
        setAvailableStations(selectedLine.stations)
      }
    } else {
      setAvailableStations([])
    }
  }, [filters.metro, metroData])

  const handleFilterChange = (key, e) => {
    const value = e.target.value
    console.log(`Filter ${key} changed:`, value)

    if (key === "metro") {
      const newValue = value === "all" ? "" : value;
      console.log("Setting metro line to:", newValue); // Debug log
    
      // 檢查是否存在選擇的線路，如果不存在，則不進行設置
      const lineExists = metroData.mrt_lines.some(line => line.line === newValue);
      if (!lineExists && newValue !== "") {
        console.error("Selected line not found in the collection.");
        return; // 如果線路不存在，直接返回，不更新任何狀態
      }
    
      setFilters(prev => ({
        ...prev,
        metro: newValue,
        station: "", // Reset station when changing line
        searchBy: "mrt", // Switch to MRT mode when selecting a line
      }));
      onLineSelect(newValue);
      onDistrictSelect(""); // Clear district selection
    }
    

    if (key === "station") {
      const newValue = value === "all" ? "" : value
      setFilters((prev) => ({
        ...prev,
        [key]: newValue,
        searchBy: "mrt", // Ensure we stay in MRT mode
      }))
      onStationSelect(newValue)
      // Don't clear the line selection here
      return
    }

    if (key === "district") {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        metro: "", // Reset metro when selecting district
        station: "", // Reset station when selecting district
        searchBy: "district", // Switch to district mode
      }))
      onDistrictSelect(value === "all" ? "" : value)
      onLineSelect("")
      onStationSelect("")
      return
    }

    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearchByChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      searchBy: value,
      district: value === "district" ? prev.district : "",
      metro: value === "mrt" ? prev.metro : "",
      station: value === "mrt" ? prev.station : "",
    }))

    if (value === "district") {
      onLineSelect("")
      onStationSelect("")
    } else {
      onDistrictSelect("")
    }
  }

  const handleApply = () => {
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
              <SelectItem key="all" value="all" textValue="All Districts">
                All Districts
              </SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district} textValue={district}>
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
                <SelectItem key="all" value="all" textValue="All Lines">
                  All Lines
                </SelectItem>
                {metroData.mrt_lines.map((line) => (
                  <SelectItem key={line.line} value={line.line} textValue={line.line}>
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
                <SelectItem key="all" value="all" textValue="All Stations">
                  All Stations
                </SelectItem>
                {availableStations.map((station) => (
                  <SelectItem
                    key={station.station_id}
                    value={station.station_id}
                    textValue={`${station.name_chinese} ${station.name_english}`}
                  >
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
            <SelectItem key={range} value={range} textValue={range}>
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

