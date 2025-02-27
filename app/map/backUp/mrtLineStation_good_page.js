"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useMemo, useCallback } from "react"
import FilterPanel from "./_components/FilterPanel"
import "./map.css"

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

  const handleApplyFilter = useCallback(() => {
    console.log("🎯 Applying filter for station:", selectedStation)
    if (!selectedStation || !mapData.shortestPaths) return

    setIsLoading(true)
    try {
      // Find the selected station's name
      const station = selectedLineStations.find((s) => s.station_id === selectedStation)
      if (!station) {
        console.error("❌ Selected station not found in line stations")
        return
      }

      const stationName = `${station.name_chinese}` // Using Chinese name for matching
      console.log("🔍 Searching for paths from:", stationName)

      // Filter paths that start from the selected station
      const paths = mapData.shortestPaths.features.filter((feature) => feature.properties.start_name === stationName)

      console.log(`✅ Found ${paths.length} paths from ${stationName}`)
      setFilteredPaths({
        type: "FeatureCollection",
        features: paths,
      })
    } catch (err) {
      console.error("Error filtering paths:", err)
      setError("Failed to filter paths")
    } finally {
      setIsLoading(false)
    }
  }, [selectedStation, mapData.shortestPaths, selectedLineStations])

  const memoizedFilterPanel = useMemo(
    () => (
      <FilterPanel
        metroData={metroData}
        onLineSelect={handleLineSelect}
        onStationSelect={handleStationSelect}
        onApplyFilter={handleApplyFilter}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedLineStations={selectedLineStations}
        isLoading={isLoading}
      />
    ),
    [
      handleLineSelect,
      handleStationSelect,
      handleApplyFilter,
      metroData,
      selectedMRT,
      selectedStation,
      selectedLineStations,
      isLoading,
    ],
  )

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mapData.mrtRoutes}
        taipeiDistricts={mapData.taipeiDistricts}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedLineStations={selectedLineStations}
        shortestPaths={filteredPaths}
        filteredLocations={[]} // Add your filtered locations here if needed
        onRouteClick={handleRouteClick}
        onStationClick={handleStationClick}
      />
    ),
    [
      mapData.mrtRoutes,
      mapData.taipeiDistricts,
      selectedMRT,
      selectedStation,
      selectedLineStations,
      filteredPaths,
      handleRouteClick,
      handleStationClick,
    ],
  )

  if (isLoading && !mapData.mrtRoutes) return <div>Loading map data...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="map-page-wrapper">
      <div className="map-content">
        <div className="map-page">
          {memoizedFilterPanel}
          {memoizedMapView}
        </div>
      </div>
    </div>
  )
}