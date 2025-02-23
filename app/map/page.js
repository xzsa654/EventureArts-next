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
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedMRT, setSelectedMRT] = useState("")
  const [selectedStation, setSelectedStation] = useState("")
  const [mapData, setMapData] = useState({
    mrtRoutes: null,
    mrtStations: null,
    taipeiDistricts: null,
    shortestPaths: null,
  })
  const [dbLocations, setDbLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [routesRes, stationsRes, districtsRes, pathsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_MRT_STATION_4326.geojson"),
          fetch("/map/TPE_Dist_4326.geojson"),
          fetch("/map/shortPath_wgs84.geojson"),
        ])

        const routesData = await routesRes.json()
        const stationsData = await stationsRes.json()
        const districtsData = await districtsRes.json()
        const pathsData = await pathsRes.json()

        setMapData({
          mrtRoutes: routesData,
          mrtStations: stationsData,
          taipeiDistricts: districtsData,
          shortestPaths: pathsData,
        })
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load map data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}/map`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDbLocations(data.data)
        } else {
          console.error("Error fetching backend locations:", data.message)
        }
      })
      .catch((error) => console.error("Error fetching backend locations:", error))
  }, [])

  const handleDistrictSelect = useCallback((district) => {
    setSelectedDistrict(district)
    setSelectedMRT("")
    setSelectedStation("")
  }, [])

  const handleLineSelect = useCallback((line) => {
    setSelectedMRT(line)
    setSelectedStation("")
    setSelectedDistrict("")
  }, [])

  const handleStationSelect = useCallback((station) => {
    setSelectedStation(station)
  }, [])

  const handleApplyFilter = useCallback(
    (searchCriteria) => {
      if (!searchCriteria) {
        setFilteredLocations([])
        return
      }

      if (searchCriteria.type === "district") {
        // Filter locations by district
        const locations = dbLocations.filter((loc) => loc.district === searchCriteria.value)
        setFilteredLocations(locations)
      } else if (searchCriteria.type === "mrt") {
        // Filter locations by station proximity using shortestPaths
        const paths = mapData.shortestPaths.features.filter(
          (path) => path.properties.start_name === searchCriteria.value,
        )
        const nearbyLocationIds = paths.map((path) => path.properties.end_name)
        const locations = dbLocations.filter((loc) => nearbyLocationIds.includes(loc.locat_id))
        setFilteredLocations(locations)
      }
    },
    [dbLocations, mapData.shortestPaths],
  )

  const memoizedFilterPanel = useMemo(
    () => (
      <FilterPanel
        onDistrictSelect={handleDistrictSelect}
        onLineSelect={handleLineSelect}
        onStationSelect={handleStationSelect}
        onApplyFilter={handleApplyFilter}
      />
    ),
    [handleDistrictSelect, handleLineSelect, handleStationSelect, handleApplyFilter],
  )

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mapData.mrtRoutes}
        mrtStations={mapData.mrtStations}
        taipeiDistricts={mapData.taipeiDistricts}
        shortestPaths={mapData.shortestPaths}
        selectedDistrict={selectedDistrict}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        filteredLocations={filteredLocations}
      />
    ),
    [mapData, selectedDistrict, selectedMRT, selectedStation, filteredLocations],
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

