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
  const [selectedLineStations, setSelectedLineStations] = useState([])
  const [mapData, setMapData] = useState({
    mrtRoutes: null,
    taipeiDistricts: null,
    shortestPaths: null,
  })
  const [metroData, setMetroData] = useState({ mrt_lines: [] })
  const [dbLocations, setDbLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [routesRes, districtsRes, pathsRes, lineStationsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_Dist_4326.geojson"),
          fetch("/map/shortPath_wgs84.geojson"),
          fetch("/map/TPE_metroLineStation.json"),
        ])

        const routesData = await routesRes.json()
        const districtsData = await districtsRes.json()
        const pathsData = await pathsRes.json()
        const metroLineData = await lineStationsRes.json()

        setMapData({
          mrtRoutes: routesData,
          taipeiDistricts: districtsData,
          shortestPaths: pathsData,
        })
        setMetroData(metroLineData)

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
  if (selectedMRT && metroData.mrt_lines) {
    const selectedLine = metroData.mrt_lines.find(line => line.line === selectedMRT);
    setSelectedLineStations(selectedLine ? selectedLine.stations : []);
  } else {
    setSelectedLineStations([]);
  }
}, [selectedMRT, metroData]);


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
    setSelectedLineStations([])
  }, [])

  const handleLineSelect = useCallback(
    (e) => {
      // Handle both event objects and direct values
      const value = e?.target?.value ?? e
      console.log("Raw line value:", value)

      // If "all" is selected, clear the selection
      if (value === "all") {
        setSelectedMRT("")
        setSelectedStation("")
        setSelectedDistrict("")
        return
      }

      // Find the matching line in the metro data
      const selectedLine = metroData.mrt_lines?.find((line) => line.line === value)
      if (selectedLine) {
        console.log("Found matching line:", selectedLine.line)
        // Use the line name directly as it matches the MRTCODE
        setSelectedMRT(selectedLine.line)
        setSelectedStation("")
        setSelectedDistrict("")
        // Set the stations for this line
        setSelectedLineStations(selectedLine.stations)
      }
    },
    [metroData.mrt_lines],
  )

  const handleStationSelect = useCallback(
    (station) => {
      console.log("Selected station:", station)
      if (station && station !== "all") {
        // Find the line that contains this station
        const line = metroData.mrt_lines?.find((line) => line.stations.some((s) => s.station_id === station))

        if (line) {
          console.log("Found line for station:", line.line)
          // Use the line name directly as it matches the MRTCODE
          setSelectedMRT(line.line)
          setSelectedStation(station)
          setSelectedLineStations(line.stations)
        }
      } else {
        setSelectedStation("")
      }
    },
    [metroData.mrt_lines],
  )

  const handleApplyFilter = useCallback(
    (searchCriteria) => {
      if (!searchCriteria) {
        setFilteredLocations([])
        return
      }

      if (searchCriteria.type === "district") {
        const locations = dbLocations.filter((loc) => loc.district === searchCriteria.value)
        setFilteredLocations(locations)
      } else if (searchCriteria.type === "mrt") {
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
        metroData={metroData}
        onDistrictSelect={handleDistrictSelect}
        onLineSelect={handleLineSelect}
        onStationSelect={handleStationSelect}
        onApplyFilter={handleApplyFilter}
        selectedMRT={selectedMRT}
      />
    ),
    [handleDistrictSelect, handleLineSelect, handleStationSelect, handleApplyFilter, metroData, selectedMRT],
  )

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mapData.mrtRoutes}
        taipeiDistricts={mapData.taipeiDistricts}
        shortestPaths={mapData.shortestPaths}
        selectedDistrict={selectedDistrict}
        selectedMRT={selectedMRT}
        selectedStation={selectedStation}
        filteredLocations={filteredLocations}
        selectedLineStations={selectedLineStations}
      />
    ),
    [mapData, selectedDistrict, selectedMRT, selectedStation, filteredLocations, selectedLineStations],
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

