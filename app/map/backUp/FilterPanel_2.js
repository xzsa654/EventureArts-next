"use client"

import { useEffect, useRef } from "react"
import { Select, SelectItem } from "@heroui/react"
import "./FilterPanel.css"

export default function FilterPanel({
  metroData,
  onLineSelect,
  onStationSelect,
  selectedMRT,
  selectedStation,
  selectedLineStations,
}) {
  const lineSelectRef = useRef(null)

  // Update dropdown when selectedMRT changes from map
  useEffect(() => {
    console.log("🔄 Updating dropdown value to:", selectedMRT)
    if (lineSelectRef.current) {
      // Force the Select component to update its value
      lineSelectRef.current.value = selectedMRT || ""
    }
  }, [selectedMRT])

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <p>Metro Line</p>
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
        </div>
      </div>
    </div>
  )
}

