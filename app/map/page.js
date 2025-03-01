"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useMemo, useCallback } from "react"
import FilterPanel from "./_components/FilterPanel"
import "./map.css"
import FilterResults from "./_components/FilterResults"

const MapView = dynamic(() => import("./_components/MapView"), {
  ssr: false,
})

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

export default function Page() {
  const [selectedMRT, setSelectedMRT] = useState("")
  const [selectedStation, setSelectedStation] = useState("")
  const [selectedLineStations, setSelectedLineStations] = useState([])
  const [mapData, setMapData] = useState({
    mrtRoutes: null,
    taipeiDistricts: null,
    shortestPaths: null,
  })
  const [metroData, setMetroData] = useState({ mrt_lines: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredPaths, setFilteredPaths] = useState(null)

  // Add these new state variables
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [activeFilterType, setActiveFilterType] = useState("mrt") // "mrt" or "district"
  // Add a new state for filtered locations
  const [filteredLocations, setFilteredLocations] = useState([])
  const [shortestPaths, setShortestPaths] = useState(null) // Added state for shortestPaths

  // Load map data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [routesRes, lineStationsRes, shortestPathsRes, districtsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_metroLineStation.json"),
          fetch("/map/shortestPath_wgs84.geojson"),
          fetch("/map/TPE_Dist_4326.geojson"),
        ])

        const routesData = await routesRes.json()
        const metroLineData = await lineStationsRes.json()
        const shortestPathsData = await shortestPathsRes.json()
        const districtsData = await districtsRes.json()

        setMapData((prev) => ({
          ...prev,
          mrtRoutes: routesData,
          shortestPaths: shortestPathsData,
          taipeiDistricts: districtsData,
        }))
        setMetroData(metroLineData)
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load map data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update stations when line changes
  useEffect(() => {
    console.log("🔄 Updating stations for line:", selectedMRT)

    if (selectedMRT && metroData.mrt_lines) {
      const selectedLine = metroData.mrt_lines.find((line) => line.line === selectedMRT)
      if (selectedLine) {
        console.log("✅ Found line:", selectedLine.line)
        console.log("📍 Station count:", selectedLine.stations.length)
        setSelectedLineStations([])
        setTimeout(() => {
          setSelectedLineStations(selectedLine.stations)
        }, 0)
      } else {
        console.log("❌ No matching line found for:", selectedMRT)
        setSelectedLineStations([])
      }
    } else {
      console.log("⚪ Clearing stations - no line selected")
      setSelectedLineStations([])
    }
    setSelectedStation("")
    // Clear filtered paths when changing lines
    setFilteredPaths(null)
  }, [selectedMRT, metroData.mrt_lines])

  const handleLineSelect = useCallback(
    (e) => {
      const value = e?.target?.value ?? e
      console.log("🚇 Line select value:", value)

      if (value === "all") {
        console.log("🔄 Clearing selection")
        setSelectedMRT("")
        setSelectedStation("")
        setSelectedLineStations([])
        setFilteredPaths(null)
        return
      }

      const lineInMetroData = metroData.mrt_lines?.find((line) => line.line === value)
      const lineInRoutes = mapData.mrtRoutes?.features.find((feature) => feature.properties.MRTCODE === value)

      console.log("Line exists in metro data:", !!lineInMetroData)
      console.log("Line exists in routes:", !!lineInRoutes)

      if (lineInMetroData && lineInRoutes) {
        setSelectedMRT(value)
        const event = new CustomEvent("metroLineSelected", { detail: value })
        window.dispatchEvent(event)
      } else {
        console.error("❌ Line not found in one or both data sources:", value)
      }
    },
    [metroData.mrt_lines, mapData.mrtRoutes],
  )

  const handleStationSelect = useCallback(
    (stationId) => {
      console.log("🚉 Station select:", stationId)
      const newValue = stationId === "all" ? "" : stationId
      setSelectedStation(newValue)
      // Clear filtered paths when changing stations
      setFilteredPaths(null)

      if (newValue && metroData.mrt_lines) {
        const line = metroData.mrt_lines.find((line) =>
          line.stations.some((station) => station.station_id === newValue),
        )
        if (line && line.line !== selectedMRT) {
          handleLineSelect(line.line)
        }
      }
    },
    [metroData.mrt_lines, selectedMRT, handleLineSelect],
  )

  // Handle map route click
  const handleRouteClick = useCallback(
    (mrtCode) => {
      console.log("🗺️ Map route clicked:", mrtCode)
      const lineExists = metroData.mrt_lines?.some((line) => line.line === mrtCode)
      if (lineExists) {
        handleLineSelect(mrtCode)
      } else {
        console.error("❌ Clicked route not found in metro data:", mrtCode)
      }
    },
    [metroData.mrt_lines, handleLineSelect],
  )

  // Handle map station click
  const handleStationClick = useCallback(
    (stationId) => {
      console.log("🗺️ Map station clicked:", stationId)
      handleStationSelect(stationId)
    },
    [handleStationSelect],
  )

  // Add new handler for district selection
  const handleDistrictSelect = useCallback((districtName) => {
    console.log("🏙️ District selected:", districtName)
    const newValue = districtName === "all" ? "" : districtName
    setSelectedDistrict(newValue)
    setFilteredPaths(null) // 清除現有的捷運路徑
  
    // ✅ 如果有選擇行政區，確保 `useFitBounds` 會更新
    if (newValue && mapData.taipeiDistricts?.features) {
      console.log(`📍 FitBounds will be applied for district: ${newValue}`)
    }
  }, [mapData.taipeiDistricts])

  // Modify handleApplyFilter to handle both MRT and district filtering
  const handleApplyFilter = useCallback(async () => {
    if (activeFilterType === "mrt") {
      console.log("🎯 Applying MRT filter for station:", selectedStation)
      if (!selectedStation || !mapData.shortestPaths) return

      setIsLoading(true)
      try {
        const station = selectedLineStations.find((s) => s.station_id === selectedStation)
        if (!station) {
          console.error("❌ Selected station not found in line stations")
          return
        }

        const stationName = `${station.name_chinese}`
        console.log("🔍 Searching for paths from:", stationName)

        const paths = mapData.shortestPaths.features.filter((feature) => feature.properties.start_name === stationName)

        console.log(`✅ Found ${paths.length} paths from ${stationName}`)
        setFilteredPaths({
          type: "FeatureCollection",
          features: paths,
        })
        setFilteredLocations([]) // Clear any existing locations
      } catch (err) {
        console.error("Error filtering paths:", err)
        setError("Failed to filter paths")
      } finally {
        setIsLoading(false)
      }
    } else {
      // District filtering logic
      console.log("🎯 Applying district filter for:", selectedDistrict)
      if (!selectedDistrict || selectedDistrict === "all") return

      setIsLoading(true)
      try {
        // Fetch all locations
        const response = await fetch(`${API_BASE_URL}/map`)

        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }

        const result = await response.json()

        // Check if the API call was successful and filter the data by district
        if (result.success && Array.isArray(result.data)) {
          const filteredData = result.data.filter((location) => location.district === selectedDistrict)

          console.log(`✅ Found ${filteredData.length} locations in ${selectedDistrict}:`, filteredData)
          setFilteredLocations(filteredData)
        } else {
          console.warn("API call successful but no valid data:", result.message)
          setFilteredLocations([])
        }

        setFilteredPaths(null) // Clear any existing paths
      } catch (err) {
        console.error("Error fetching locations:", err)
        setError("Failed to fetch locations")
        setFilteredLocations([])
      } finally {
        setIsLoading(false)
      }
    }
  }, [activeFilterType, selectedStation, selectedDistrict, mapData.shortestPaths, selectedLineStations])

  // Add handler for filter type change
  const handleFilterTypeChange = useCallback((type) => {
    console.log("🔄 Changing filter type to:", type)
    setActiveFilterType(type)
    // Clear selections when switching filter types
    if (type === "mrt") {
      setSelectedDistrict("")
    } else {
      setSelectedMRT("")
      setSelectedStation("")
      setSelectedLineStations([])
    }
    setFilteredPaths(null)
  }, [])

  // Update the memoized components to include new props
  const memoizedFilterPanel = useMemo(
    () => (
      <FilterPanel
        metroData={metroData}
        districtData={mapData.taipeiDistricts}
        onLineSelect={handleLineSelect}
        onStationSelect={handleStationSelect}
        onDistrictSelect={handleDistrictSelect}
        onApplyFilter={handleApplyFilter}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedDistrict={selectedDistrict}
        selectedLineStations={selectedLineStations}
        isLoading={isLoading}
        activeFilterType={activeFilterType}
        onFilterTypeChange={handleFilterTypeChange}
        setShortestPaths={setShortestPaths} 
      />
    ),
    [
      handleLineSelect,
      handleStationSelect,
      handleDistrictSelect,
      handleApplyFilter,
      metroData,
      mapData.taipeiDistricts,
      selectedMRT,
      selectedStation,
      selectedDistrict,
      selectedLineStations,
      isLoading,
      activeFilterType,
      handleFilterTypeChange,
    ],
  )

  // Update the memoizedMapView to include filteredLocations
  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mapData.mrtRoutes}
        taipeiDistricts={mapData.taipeiDistricts}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedDistrict={selectedDistrict}
        selectedLineStations={selectedLineStations}
        shortestPaths={filteredPaths}
        filteredLocations={filteredLocations} // Pass the filtered locations
        onRouteClick={handleRouteClick}
        onStationClick={handleStationClick}
        activeFilterType={activeFilterType}
      />
    ),
    [
      mapData.mrtRoutes,
      mapData.taipeiDistricts,
      selectedMRT,
      selectedStation,
      selectedDistrict,
      selectedLineStations,
      filteredPaths,
      filteredLocations, // Add to dependencies
      handleRouteClick,
      handleStationClick,
      activeFilterType,
    ],
  )

  if (isLoading && !mapData.mrtRoutes) return <div>Loading map data...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="map-page-wrapper">
      <div className="map-content">
        <div className="map-page">
          {/* Left side: Filter panel and results */}
          <div className="left-side">
            {memoizedFilterPanel}
            <FilterResults
              filteredLocations={filteredLocations}
              selectedDistrict={selectedDistrict}
              selectedStation={selectedStation}
              selectedLineStations={selectedLineStations}
              activeFilterType={activeFilterType}
              shortestPaths={shortestPaths} 
            />
          </div>
  
          {/* right side：MapView */}
          <div className="right-side">
            {memoizedMapView}
          </div>
        </div>
      </div>
    </div>
  )  
}

