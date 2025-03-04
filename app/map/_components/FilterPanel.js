'use client'

import { useEffect, useRef } from 'react'
import { Select, SelectItem, Tab, Tabs } from '@heroui/react'
import './FilterPanel.css'

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
    console.log('🔄 Updating dropdown value to:', selectedMRT)
    if (lineSelectRef.current) {
      lineSelectRef.current.value = selectedMRT || ''
    }
  }, [selectedMRT])

  // Update Dist. when MapView changes
  const districtSelectRef = useRef(null)

  // 監聽 selectedDistrict 變化，更新下拉選單
  useEffect(() => {
    console.log('🏙️ Updating district dropdown to:', selectedDistrict)
    if (districtSelectRef.current) {
      districtSelectRef.current.value = selectedDistrict || ''
    }
  }, [selectedDistrict])

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button>Clear all</button>
      </div>
      <div className="filter-section">
        <p>Search By...</p>
        <Tabs
          selectedKey={activeFilterType}
          onSelectionChange={onFilterTypeChange}
          classNames={{
            tabList: 'w-full border-1.5 border-black',
            panel: 'w-full p-0',
          }}
          color="primary"
          aria-label="Filter options"
          variant="bordered"
          radius="full"
        >
          <Tab key="mrt" title="MRT">
            <div className="filter-section mt-4">
              <div className="dropdown-group">
                <Select
                  ref={lineSelectRef}
                  placeholder="Select MRT line"
                  variant="bordered"
                  radius="full"
                  defaultSelectedKeys={selectedMRT ? [selectedMRT] : []}
                  selectedKeys={selectedMRT ? [selectedMRT] : []}
                  value={selectedMRT || ''}
                  onChange={onLineSelect}
                  classNames={{ trigger: 'border-1.5 border-black' }}
                  aria-label="Select metro line"
                >
                  <SelectItem key="all" value="all" textValue="All Lines">
                    All Lines
                  </SelectItem>
                  {metroData.mrt_lines.map((line) => (
                    <SelectItem
                      key={line.line}
                      value={line.line}
                      textValue={line.line}
                    >
                      {line.line}
                    </SelectItem>
                  ))}
                </Select>

                {selectedMRT && (
                  <Select
                    placeholder="Select station"
                    variant="bordered"
                    radius="full"
                    defaultSelectedKeys={
                      selectedStation ? [selectedStation] : []
                    }
                    selectedKeys={selectedStation ? [selectedStation] : []}
                    value={selectedStation || ''}
                    onChange={(e) => onStationSelect(e.target.value)}
                    classNames={{ trigger: 'border-1.5 border-black' }}
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
                  disabled={
                    !selectedStation || selectedStation === 'all' || isLoading
                  }
                  className="apply-button w-full bg-black text-white rounded-full disabled:cursor-not-allowed hover:bg-yellow"
                >
                  {isLoading ? 'Loading...' : 'Apply Filter'}
                </button>
              </div>
            </div>
          </Tab>

          <Tab key="district" title="行政區">
            <div className="filter-section mt-4">
              <div className="dropdown-group">
                <Select
                  placeholder="Select district"
                  variant="bordered"
                  radius="full"
                  selectedKeys={selectedDistrict ? [selectedDistrict] : []} // Click MapView的時候，會更新下拉式選單
                  onSelectionChange={(keys) =>
                    onDistrictSelect(Array.from(keys)[0])
                  }
                  classNames={{ trigger: 'border-1.5 border-black' }}
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
                  disabled={
                    !selectedDistrict || selectedDistrict === 'all' || isLoading
                  }
                  className="apply-button w-full bg-black text-white rounded-full disabled:cursor-not-allowed hover:bg-yellow"
                >
                  {isLoading ? 'Loading...' : 'Apply Filter'}
                </button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
