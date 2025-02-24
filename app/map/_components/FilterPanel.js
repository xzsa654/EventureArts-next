"use client"

import { useEffect, useRef } from "react"
import { Select, SelectItem, Tab, Tabs } from "@heroui/react"
import "./FilterPanel.css"

export default function FilterPanel({
  metroData,
  districtData,
  onLineSelect,
  onStationSelect,
  onDistrictSelect,
  onApplyFilter,
  selectedMRT,
  selectedStation,
  selectedDistrict,
  selectedLineStations,
  isLoading,
  activeFilterType,
  onFilterTypeChange,
}) {
  const lineSelectRef = useRef(null)

  // Update dropdown when selectedMRT changes from map
  useEffect(() => {
    console.log("🔄 Updating dropdown value to:", selectedMRT)
    if (lineSelectRef.current) {
      lineSelectRef.current.value = selectedMRT || ""
    }
  }, [selectedMRT])

  return (
    <div className="filter-panel">
      <Tabs
        selectedKey={activeFilterType}
        onSelectionChange={onFilterTypeChange}
        className="w-full"
        aria-label="Filter options"
      >
        <Tab key="mrt" title="Filter by MRT">
          <div className="filter-section mt-4">
            <div className="dropdown-group">
              <Select
                ref={lineSelectRef}
                placeholder="Select metro line"
                variant="bordered"
                radius="full"
                defaultSelectedKeys={selectedMRT ? [selectedMRT] : []}
                selectedKeys={selectedMRT ? [selectedMRT] : []}
                value={selectedMRT || ""}
                onChange={onLineSelect}
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

              {selectedMRT && (
                <Select
                  placeholder="Select station"
                  variant="bordered"
                  radius="full"
                  defaultSelectedKeys={selectedStation ? [selectedStation] : []}
                  selectedKeys={selectedStation ? [selectedStation] : []}
                  value={selectedStation || ""}
                  onChange={(e) => onStationSelect(e.target.value)}
                  classNames={{ trigger: "border-1.5 border-black" }}
                  aria-label="Select station"
                >
                  <SelectItem key="all" value="all" textValue="All Stations">
                    All Stations
                  </SelectItem>
                  {selectedLineStations.map((station) => (
                    <SelectItem
                      key={station.station_id}
                      value={station.station_id}
                      textValue={`${station.name_chinese} ${station.name_english}`}
                    >
                      {station.name_chinese} {station.name_english}
                    </SelectItem>
                  ))}
                </Select>
              )}

              <button
                onClick={onApplyFilter}
                disabled={!selectedStation || selectedStation === "all" || isLoading}
                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                {isLoading ? "Loading..." : "Apply Filter"}
              </button>
            </div>
          </div>
        </Tab>

        <Tab key="district" title="Filter by District">
          <div className="filter-section mt-4">
            <div className="dropdown-group">
              <Select
                placeholder="Select district"
                variant="bordered"
                radius="full"
                value={selectedDistrict || ""}
                onChange={(e) => onDistrictSelect(e.target.value)}
                classNames={{ trigger: "border-1.5 border-black" }}
                aria-label="Select district"
              >
                <SelectItem key="all" value="all" textValue="All Districts">
                  All Districts
                </SelectItem>
                {districtData?.features?.map((district) => (
                  <SelectItem
                    key={district.properties.TNAME}
                    value={district.properties.TNAME}
                    textValue={district.properties.TNAME}
                  >
                    {district.properties.TNAME}
                  </SelectItem>
                ))}
              </Select>

              <button
                onClick={onApplyFilter}
                disabled={!selectedDistrict || selectedDistrict === "all" || isLoading}
                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                {isLoading ? "Loading..." : "Apply Filter"}
              </button>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

