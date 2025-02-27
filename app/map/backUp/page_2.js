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

  // Load map data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [routesRes, lineStationsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_metroLineStation.json"),
        ])

        const routesData = await routesRes.json()
        const metroLineData = await lineStationsRes.json()

        setMapData((prev) => ({
          ...prev,
          mrtRoutes: routesData,
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
        setSelectedLineStations(selectedLine.stations)
      } else {
        console.log("❌ No matching line found for:", selectedMRT)
        setSelectedLineStations([])
      }
    } else {
      console.log("⚪ Clearing stations - no line selected")
      setSelectedLineStations([])
    }
    // Clear selected station when line changes
    setSelectedStation("")
  }, [selectedMRT, metroData.mrt_lines])

  const handleLineSelect = useCallback(
    (e) => {
      // Handle both event objects and direct values
      const value = e?.target?.value ?? e
      console.log("🚇 Line select value:", value)

      if (value === "all") {
        console.log("🔄 Clearing selection")
        setSelectedMRT("")
        setSelectedStation("")
        setSelectedLineStations([])
        return
      }

      // Verify the line exists in both data sources
      const lineInMetroData = metroData.mrt_lines?.find((line) => line.line === value)
      const lineInRoutes = mapData.mrtRoutes?.features.find((feature) => feature.properties.MRTCODE === value)

      console.log("Line exists in metro data:", !!lineInMetroData)
      console.log("Line exists in routes:", !!lineInRoutes)

      if (lineInMetroData && lineInRoutes) {
        setSelectedMRT(value)
        // Trigger a custom event to update the dropdown
        const event = new CustomEvent("metroLineSelected", { detail: value })
        window.dispatchEvent(event)
      } else {
        console.error("❌ Line not found in one or both data sources:", value)
      }
    },
    [metroData.mrt_lines, mapData.mrtRoutes],
  )

  const handleStationSelect = useCallback((stationId) => {
    console.log("🚉 Station select:", stationId)
    setSelectedStation(stationId === "all" ? "" : stationId)
  }, [])

  // Handle map route click
  const handleRouteClick = useCallback(
    (mrtCode) => {
      console.log("🗺️ Map route clicked:", mrtCode)
      // Ensure the line exists in the metro data
      const lineExists = metroData.mrt_lines?.some((line) => line.line === mrtCode)
      if (lineExists) {
        handleLineSelect(mrtCode) // Use the same handler for consistency
      } else {
        console.error("❌ Clicked route not found in metro data:", mrtCode)
      }
    },
    [metroData.mrt_lines, handleLineSelect],
  )

  const memoizedFilterPanel = useMemo(
    () => (
      <FilterPanel
        metroData={metroData}
        onLineSelect={handleLineSelect}
        onStationSelect={handleStationSelect}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedLineStations={selectedLineStations}
      />
    ),
    [handleLineSelect, handleStationSelect, metroData, selectedMRT, selectedStation, selectedLineStations],
  )

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mapData.mrtRoutes}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        selectedLineStations={selectedLineStations}
        onRouteClick={handleRouteClick}
      />
    ),
    [mapData.mrtRoutes, selectedMRT, selectedStation, selectedLineStations, handleRouteClick],
  )

  if (isLoading) return <div>Loading map data...</div>
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

