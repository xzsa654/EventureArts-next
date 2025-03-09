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
      padding: [50, 50],
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
        const finalZoom = Math.min(Math.max(boundsZoom, 12), 16)
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
// Handle initial district tab selection
else if (isNewFilterType && activeFilterType === "district" && taipeiDistricts?.features) {
  taipeiDistricts.features.forEach((district) => {
    try {
      if (district.geometry.type === "MultiPolygon") {
        district.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            ring.forEach((coord) => {
              bounds = bounds.extend([coord[1], coord[0]]);
            });
          });
        });
        hasBounds = true;
      } else if (district.geometry.type === "Polygon") {
        district.geometry.coordinates.forEach((ring) => {
          ring.forEach((coord) => {
            bounds = bounds.extend([coord[1], coord[0]]);
          });
        });
        hasBounds = true;
      }
    } catch (e) {
      console.error("Error processing district geometry:", e);
    }
  });

  if (hasBounds) {
    const boundsZoom = map.getBoundsZoom(bounds, false, options.padding);
    const finalZoom = Math.min(Math.max(boundsZoom, 13), 16); // ✅ 限制縮放範圍，避免過度縮小
    map.fitBounds(bounds, { ...options, maxZoom: finalZoom });
  }
}

// Handle selecting MRT filter (before Apply is pressed)
else if (isNewFilterType && activeFilterType === "mrt" && mrtRoutes?.features) {
  let hasBounds = false;

  // ✅ 當還沒有選擇特定捷運站時，把所有捷運線放進視口
  mrtRoutes.features.forEach((route) => {
    if (route.geometry.type === "MultiLineString") {
      route.geometry.coordinates.forEach((line) => {
        line.forEach((coord) => bounds.extend([coord[1], coord[0]]));
      });
    } else if (route.geometry.type === "LineString") {
      route.geometry.coordinates.forEach((coord) => bounds.extend([coord[1], coord[0]]));
    }
    hasBounds = true;
  });

  if (hasBounds && bounds.isValid()) {
    const boundsZoom = map.getBoundsZoom(bounds, false, options.padding);
    const finalZoom = Math.min(Math.max(boundsZoom, 12), 14); // ✅ 限制縮放範圍
    map.fitBounds(bounds, { ...options, maxZoom: finalZoom });
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

