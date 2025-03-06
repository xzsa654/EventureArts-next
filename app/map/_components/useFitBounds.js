"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"

export function useFitBounds({
  mapRef,
  shortestPaths,
  filteredLocations,
  selectedDistrict,
  selectedMRT,
  selectedStation,
  selectedLineStations,
  taipeiDistricts,
  mrtRoutes,
  activeFilterType,
  fitBoundOptions = {},
}) {
  // Track previous values to detect changes
  const prevSelectedStation = useRef(selectedStation)
  const prevFilteredLocations = useRef(filteredLocations?.length || 0)
  const prevActiveFilterType = useRef(activeFilterType)
  const prevShortestPaths = useRef(shortestPaths?.features?.length || 0)
  const prevSelectedDistrict = useRef(selectedDistrict)
  const prevSelectedMRT = useRef(selectedMRT)

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    let bounds = L.latLngBounds()
    let hasBounds = false

    const defaultOptions = {
      padding: [100, 100],
      maxZoom: 16,
      minZoom: 13,
      animate: true,
      duration: 1,
    }

    const options = { ...defaultOptions, ...fitBoundOptions }

    // Only update bounds when there's a meaningful change
    const isNewStation = selectedStation !== prevSelectedStation.current
    const isNewFilterType = activeFilterType !== prevActiveFilterType.current
    const isNewFilteredLocations = (filteredLocations?.length || 0) !== prevFilteredLocations.current
    const isNewShortestPaths = (shortestPaths?.features?.length || 0) !== prevShortestPaths.current
    const isNewDistrict = selectedDistrict !== prevSelectedDistrict.current
    const isNewMRT = selectedMRT !== prevSelectedMRT.current

    // If nothing has changed, don't update bounds
    if (
      !isNewStation &&
      !isNewFilterType &&
      !isNewFilteredLocations &&
      !isNewShortestPaths &&
      !isNewDistrict &&
      !isNewMRT
    ) {
      return
    }

    // Handle filtered locations (when applying district filter)
    if (isNewFilteredLocations && filteredLocations?.length > 0) {
      filteredLocations.forEach((loc) => {
        if (loc.latitude && loc.longitude && loc.district === selectedDistrict) {
          bounds = bounds.extend([+loc.latitude, +loc.longitude])
          hasBounds = true
        }
      })

      if (hasBounds) {
        const boundsZoom = map.getBoundsZoom(bounds, false, options.padding)
        const finalZoom = Math.min(Math.max(boundsZoom, 11), 13)
        map.fitBounds(bounds, { ...options, maxZoom: finalZoom })
      }
    }
    // Handle initial district tab selection
    else if (isNewFilterType && activeFilterType === "district" && taipeiDistricts?.features) {
      taipeiDistricts.features.forEach((district) => {
        try {
          if (district.geometry.type === "MultiPolygon") {
            district.geometry.coordinates.forEach((polygon) => {
              polygon.forEach((ring) => {
                ring.forEach((coord) => {
                  bounds = bounds.extend([coord[1], coord[0]])
                })
              })
            })
            hasBounds = true
          } else if (district.geometry.type === "Polygon") {
            district.geometry.coordinates.forEach((ring) => {
              ring.forEach((coord) => {
                bounds = bounds.extend([coord[1], coord[0]])
              })
            })
            hasBounds = true
          }
        } catch (e) {
          console.error("Error processing district geometry:", e)
        }
      })

      if (hasBounds) {
        const boundsZoom = map.getBoundsZoom(bounds, false, options.padding)
        const finalZoom = Math.min(Math.max(boundsZoom, 9), 11)
        map.fitBounds(bounds, { ...options, maxZoom: finalZoom })
      }
    }
    // Handle new station selection
    else if (isNewStation && selectedStation && selectedLineStations?.length > 0) {
      const station = selectedLineStations.find((s) => s.station_id === selectedStation)
      if (station?.coordinates?.latitude && station?.coordinates?.longitude) {
        map.setView([station.coordinates.latitude, station.coordinates.longitude], 15, { animate: true, duration: 1 })
      }
    }
    // Handle new shortest paths
    else if (isNewShortestPaths && shortestPaths?.features?.length > 0) {
      shortestPaths.features.forEach((path) => {
        if (path.geometry.coordinates[0]?.length > 0) {
          path.geometry.coordinates[0].forEach((coord) => {
            bounds = bounds.extend([coord[1], coord[0]])
          })
          hasBounds = true
        }
      })

      if (hasBounds) {
        const boundsZoom = map.getBoundsZoom(bounds, false, options.padding)
        const finalZoom = Math.min(Math.max(boundsZoom, 13), 15)
        map.fitBounds(bounds, { ...options, maxZoom: finalZoom })
      }
    }
    // Handle new MRT line selection - only apply when there are shortestPaths (after Apply is pressed)
    else if (
      isNewMRT &&
      selectedMRT &&
      mrtRoutes &&
      activeFilterType === "mrt" &&
      shortestPaths?.features?.length > 0
    ) {
      const route = mrtRoutes.features.find(
        (feature) => feature.properties.MRTCODE === selectedMRT
      );
    
      if (route) {
        if (
          route.geometry.type === "MultiLineString" &&
          route.geometry.coordinates.length > 0
        ) {
          route.geometry.coordinates.forEach((line) => {
            line.forEach((coord) => {
              bounds = bounds.extend([coord[1], coord[0]]);
              hasBounds = true;
            });
          });
        } else if (
          route.geometry.type === "LineString" &&
          route.geometry.coordinates.length > 0
        ) {
          route.geometry.coordinates.forEach((coord) => {
            bounds = bounds.extend([coord[1], coord[0]]);
            hasBounds = true;
          });
        } else {
          console.warn("No valid coordinates for MRT route:", selectedMRT);
        }
    
        if (hasBounds && bounds.isValid()) {
          const boundsZoom = map.getBoundsZoom(bounds, false, options.padding);
          const finalZoom = Math.min(Math.max(boundsZoom, 13), 15);
          map.fitBounds(bounds, { ...options, maxZoom: finalZoom });
        } else {
          console.warn("Invalid bounds for MRT route:", selectedMRT);
        }
      } else {
        console.warn("MRT route not found:", selectedMRT);
      }
    }
    

    // Update refs with current values
    prevSelectedStation.current = selectedStation
    prevFilteredLocations.current = filteredLocations?.length || 0
    prevActiveFilterType.current = activeFilterType
    prevShortestPaths.current = shortestPaths?.features?.length || 0
    prevSelectedDistrict.current = selectedDistrict
    prevSelectedMRT.current = selectedMRT
  }, [
    mapRef,
    shortestPaths,
    filteredLocations,
    selectedDistrict,
    selectedMRT,
    selectedStation,
    selectedLineStations,
    taipeiDistricts,
    mrtRoutes,
    activeFilterType,
    fitBoundOptions,
  ])
}

