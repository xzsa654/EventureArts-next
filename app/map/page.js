"use client"

import { useState, useEffect, useMemo } from "react"
import FilterPanel from "./_components/FilterPanel"
import MapView from "./_components/MapView"
import "./map.css"

export default function Page() {
  const [selectedMRT, setSelectedMRT] = useState("")
  const [mrtRoutes, setMrtRoutes] = useState(null)
  const [mrtStations, setMrtStations] = useState(null)
  const [taipeiDistricts, setTaipeiDistricts] = useState(null)
  const [mrtLines, setMrtLines] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [routesRes, stationsRes, districtsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_MRT_STATION_4326.geojson"),
          fetch("/map/TPE_Dist_4326.geojson"),
        ])

        const routesData = await routesRes.json()
        const stationsData = await stationsRes.json()
        const districtsData = await districtsRes.json()

        setMrtRoutes(routesData)
        setMrtStations(stationsData)
        setTaipeiDistricts(districtsData)

        const lines = [...new Set(routesData.features.map((feature) => feature.properties.MRTCODE))]
        setMrtLines(lines)

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load map data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLineSelect = (e) => {
    setSelectedMRT(e.target.value)
  }

  const memoizedFilterPanel = useMemo(() => <FilterPanel onLineSelect={handleLineSelect} />, []) // Removed handleLineSelect from dependencies

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mrtRoutes}
        mrtStations={mrtStations}
        taipeiDistricts={taipeiDistricts}
        selectedMRT={selectedMRT}
      />
    ),
    [mrtRoutes, mrtStations, taipeiDistricts, selectedMRT],
  )

  if (isLoading) {
    return <div>Loading map data...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

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