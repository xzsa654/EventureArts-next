"use client"

import { useRef, useState, useEffect } from "react"
import { MapContainer, TileLayer, LayersControl, ZoomControl, GeoJSON, LayerGroup, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import "./MapView.css"
import { useFitBounds } from "./useFitBounds" // Import the new hook
import MarkerClusterGroup from "@changey/react-leaflet-markercluster"

// Fix Leaflet's default icon issue
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/"

// Custom icons for different types
const exhibitionIcon = L.divIcon({
  className: "custom-marker exhibition-marker",
  html: `<div class="marker-pin exhibition-pin"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

const courseIcon = L.divIcon({
  className: "custom-marker course-marker",
  html: `<div class="marker-pin course-pin"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

const MapView = ({
  mrtRoutes,
  taipeiDistricts,
  selectedMRT,
  selectedStation,
  selectedDistrict,
  selectedLineStations,
  shortestPaths,
  filteredLocations,
  onRouteClick,
  onStationClick,
  activeFilterType,
  selectedLocationId, //新增從FilterResults.js傳入的selectedLocationId
  onDistrictClick, //新增地圖行政區點擊
  selectedType // ✅ 改成從 `props` 接收 `selectedType`
}) => {

  const mapRef = useRef(null)
  const center = [25.0449, 121.5233] //善導寺
  const [hoveredRoute, setHoveredRoute] = useState(null)
  const [hoveredDistrict, setHoveredDistrict] = useState(null)
  const [locations, setLocations] = useState([])


  // Track previous values to detect changes
  const prevSelectedMRT = useRef(selectedMRT)
  const prevActiveFilterType = useRef(activeFilterType)
  const prevSelectedStation = useRef(selectedStation)
  const prevSelectedDistrict = useRef(selectedDistrict)


  // Clear locations when filter criteria changes
  useEffect(() => {
    const isNewMRT = selectedMRT !== prevSelectedMRT.current
    const isNewFilterType = activeFilterType !== prevActiveFilterType.current
    const isNewStation = selectedStation !== prevSelectedStation.current
    const isNewDistrict = selectedDistrict !== prevSelectedDistrict.current

    // Clear locations when user changes filter criteria
    if (isNewMRT || isNewFilterType || isNewStation || isNewDistrict) {
      console.log("Filter criteria changed, clearing location markers")
      setLocations([])

      // Force clear any existing markers
      const markerLayerEl = document.querySelector(".leaflet-marker-pane")
      if (markerLayerEl) {
        while (markerLayerEl.firstChild) {
          markerLayerEl.removeChild(markerLayerEl.firstChild)
        }
      }

      // Also clear popup pane
      const popupLayerEl = document.querySelector(".leaflet-popup-pane")
      if (popupLayerEl) {
        while (popupLayerEl.firstChild) {
          popupLayerEl.removeChild(popupLayerEl.firstChild)
        }
      }
    }

    // Update refs
    prevSelectedMRT.current = selectedMRT
    prevActiveFilterType.current = activeFilterType
    prevSelectedStation.current = selectedStation
    prevSelectedDistrict.current = selectedDistrict
  }, [selectedMRT, activeFilterType, selectedStation, selectedDistrict])

  // Fetch location data when shortestPaths changes
  useEffect(() => {
    // Don't fetch if we're in district filter mode
    if (activeFilterType === "district") return

    if (!shortestPaths?.features?.length) return

    const locatIds = shortestPaths.features.map((path) => path.properties.end_name)

    if (locatIds.length === 0) return

    console.log(`Fetching locations for IDs: ${locatIds.join(",")}, with type: ${selectedType}`)

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/map/fetchLocations?locatIds=${locatIds.join(",")}&type=${selectedType}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }

        const data = await response.json()
        console.log("Fetched location data:", data)

        if (data.success && data.data.length > 0) {
          setLocations(data.data)
        }
      } catch (err) {
        console.error("Error fetching locations:", err)
      }
    }

    fetchLocations()
  }, [shortestPaths, selectedType, activeFilterType]) // Add activeFilterType to dependencies

  // Debug locations
  useEffect(() => {
    console.log("Current locations state:", locations)
    console.log("Current filteredLocations prop:", filteredLocations)
  }, [locations, filteredLocations])

  // 監聽 selectedLocationId 變化
// 監聽 selectedLocationId 變化
useEffect(() => {
  if (!selectedLocationId) return;

  console.log(`🔍 Selected location ID: ${selectedLocationId}, Type: ${selectedType}`);

  // 確保 `filteredLocations` 內的資料符合 `selectedType`
  let location = filteredLocations?.find(
    (loc) => loc.locat_id.toString() === selectedLocationId.toString() && loc.type === selectedType
  );

  // 如果 `filteredLocations` 找不到，再從 `locations` 查找
  if (!location) {
    location = locations.find(
      (loc) => loc.locat_id.toString() === selectedLocationId.toString() && loc.type === selectedType
    );
  }

  console.log("✅ Found location in MapView:", location);

  if (location && mapRef.current) {
    const { latitude, longitude } = location;
    console.log(`📍 Flying to: [${latitude}, ${longitude}]`);

    // 儲存 marker 以便開啟 popup
    let markerToOpen = null;

    // 在 DOM 中尋找對應的 marker
    const markers = document.querySelectorAll(".leaflet-marker-icon");
    markers.forEach((marker) => {
      const markerElement = marker._leaflet_pos;
      if (markerElement) {
        const markerInstance = marker._leaflet_id
          ? Object.values(mapRef.current._layers).find((layer) => layer._leaflet_id === marker._leaflet_id)
          : null;

        if (markerInstance && markerInstance.options && markerInstance.options.position) {
          const pos = markerInstance.options.position;
          // 比對 marker 的位置是否與目標 location 相符
          if (Math.abs(pos[0] - latitude) < 0.0001 && Math.abs(pos[1] - longitude) < 0.0001) {
            markerToOpen = markerInstance;
          }
        }
      }
    });

    // 地圖飛行到該位置
    mapRef.current.flyTo([latitude, longitude], 17, {
      duration: 1.5,
      callback: () => {
        if (markerToOpen && markerToOpen.openPopup) {
          setTimeout(() => {
            markerToOpen.openPopup();
          }, 500);
        }
      },
    });

    // 如果沒有對應的 marker，則創建一個臨時 marker
    if (!markerToOpen) {
      const hasExhibitions = location.exhibitions && location.exhibitions.length > 0;
      const hasCourses = location.courses && location.courses.length > 0;

      const icon = hasExhibitions
        ? exhibitionIcon
        : hasCourses
          ? courseIcon
          : L.divIcon({
              className: "custom-marker",
              html: `<div class="marker-pin"></div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            });

      // 創建臨時 marker 並開啟 popup
      setTimeout(() => {
        const tempMarker = L.marker([latitude, longitude], { icon }).addTo(mapRef.current);

        // 創建 popup 內容
        const popupContent = document.createElement("div");
        popupContent.className = "popup-content";

        const titleType = document.createElement("h3");
        titleType.className = "popup-title-type";
        titleType.textContent = hasExhibitions ? "Exhibition" : hasCourses ? "Course" : "Location";
        popupContent.appendChild(titleType);

        if (location.name) {
          const nameDiv = document.createElement("div");
          nameDiv.className = "popup-name";
          nameDiv.textContent = location.name;
          popupContent.appendChild(nameDiv);
        }

        if (location.startdate && location.enddate) {
          const datesDiv = document.createElement("div");
          datesDiv.className = "popup-dates";
          datesDiv.textContent = `${formatDate(location.startdate)} - ${formatDate(location.enddate)}`;
          popupContent.appendChild(datesDiv);
        }

        const locationName = document.createElement("div");
        locationName.className = "popup-location-name";
        locationName.textContent = location.locat_name;
        popupContent.appendChild(locationName);

        const address = document.createElement("div");
        address.className = "popup-address";
        address.textContent = location.address;
        popupContent.appendChild(address);

        // 添加展覽資訊
        if (hasExhibitions) {
          const exhibitionsDiv = document.createElement("div");
          exhibitionsDiv.className = "popup-exhibitions";
          const exhibitionsTitle = document.createElement("h4");
          exhibitionsTitle.textContent = "Exhibitions";
          exhibitionsDiv.appendChild(exhibitionsTitle);
          const exhibitionsList = document.createElement("div");
          exhibitionsList.className = "exhibition-list";

          location.exhibitions.forEach((exhibition) => {
            const item = document.createElement("div");
            item.className = "exhibition-item";
            const name = document.createElement("div");
            name.className = "exhibition-name";
            name.textContent = exhibition.e_name || exhibition.name;
            const dates = document.createElement("div");
            dates.className = "exhibition-dates";
            dates.textContent = `${formatDate(exhibition.e_startdate || exhibition.startdate)} - ${formatDate(exhibition.e_enddate || exhibition.enddate)}`;
            item.appendChild(name);
            item.appendChild(dates);
            exhibitionsList.appendChild(item);
          });

          exhibitionsDiv.appendChild(exhibitionsList);
          popupContent.appendChild(exhibitionsDiv);
        }

        // 添加課程資訊
        if (hasCourses) {
          const coursesDiv = document.createElement("div");
          coursesDiv.className = "popup-courses";
          const coursesTitle = document.createElement("h4");
          coursesTitle.textContent = "Courses";
          coursesDiv.appendChild(coursesTitle);
          const coursesList = document.createElement("div");
          coursesList.className = "course-list";

          location.courses.forEach((course) => {
            const item = document.createElement("div");
            item.className = "course-item";
            const name = document.createElement("div");
            name.className = "course-name";
            name.textContent = course.c_name || course.name;
            const dates = document.createElement("div");
            dates.className = "course-dates";
            dates.textContent = `${formatDate(course.c_startdate || course.startdate)} - ${formatDate(course.c_enddate || course.enddate)}`;
            item.appendChild(name);
            item.appendChild(dates);
            coursesList.appendChild(item);
          });

          coursesDiv.appendChild(coursesList);
          popupContent.appendChild(coursesDiv);
        }

        tempMarker.bindPopup(popupContent).openPopup();

        // 10 秒後移除臨時標記
        setTimeout(() => {
          mapRef.current.removeLayer(tempMarker);
        }, 10000);
      }, 1600);
    }
  }
}, [selectedLocationId, filteredLocations, locations, selectedType]); // 監聽 selectedType


  // Use the custom fitBounds hook
  useFitBounds({
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
  })

  // Base styles
  const routeStyle = {
    color: "#666666",
    weight: 3,
    opacity: 0.8,
  }

  const selectedStyle = {
    color: "#ff0000",
    weight: 5,
    opacity: 1,
  }

  const hoverStyle = {
    color: "#0000ff",
    weight: 5,
    opacity: 1,
  }

  const shortestPathStyle = {
    color: "#00ff00",
    weight: 4,
    opacity: 0.8,
    dashArray: "5, 10", // Dashed line style
  }

  // Format distance helper function
  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`
    }
    return `${Math.round(distance)} m`
  }

  // Add buffer around routes for easier interaction
  const routeBuffer = {
    weight: 30,
    color: "#000",
    opacity: 0,
  }

  const getLineColor = (lineName) => {
    const colorMap = {
      淡水信義線: "#e3002c", // Red
      松山新店線: "#008659", // Green
      中和新蘆線: "#f8b61c", // Orange
      板南線: "#0070bd", // Blue
      文湖線: "#c48c31", // Brown
    }
    return colorMap[lineName] || "#666666"
  }

  // Update station styles
  const stationStyle = {
    radius: 6,
    fillColor: "#ffffff",
    color: selectedMRT ? getLineColor(selectedMRT) : "#000000",
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
  }

  const selectedStationStyle = {
    radius: 10,
    fillColor: getLineColor(selectedMRT) || "#ff7800",
    color: "#000",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8,
  }

  const hoverStationStyle = {
    radius: 8,
    fillColor: "#ffffff",
    color: getLineColor(selectedMRT) || "#000000",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.9,
  }

  // District selected style (hover)
  const districtStyle = (feature) => {
    const isSelected = feature.properties.TNAME === selectedDistrict
    const isHovered = feature.properties.TNAME === hoveredDistrict

    return {
      color: "#ff7800",
      weight: isSelected || isHovered ? 3 : 1,
      opacity: 0.65,
      fillOpacity: isSelected ? 0.3 : isHovered ? 0.5 : 0.2,
      fillColor: isSelected ? "#ff7800" : "#ffb380",
    }
  }

  // Function to check if a route should be highlighted
  const shouldHighlightRoute = (feature) => {
    if (!selectedMRT || !feature.properties) return false
    return feature.properties.MRTCODE === selectedMRT
  }

  const styleRoutes = (feature) => {
    const isHighlighted = shouldHighlightRoute(feature)
    const isHovered = hoveredRoute === feature.properties.MRTCODE

    if (isHovered) {
      return {
        ...hoverStyle,
        color: getLineColor(feature.properties.MRTCODE),
      }
    }

    if (isHighlighted) {
      return {
        ...selectedStyle,
        color: getLineColor(feature.properties.MRTCODE),
      }
    }

    return routeStyle
  }

  const onEachRoute = (feature, layer) => {
    // Add invisible buffer layer for easier interaction
    const buffer = L.geoJSON(feature, {
      style: routeBuffer,
      interactive: true,
    })

    buffer.on({
      mouseover: () => {
        setHoveredRoute(feature.properties.MRTCODE)
        layer.setStyle({
          ...hoverStyle,
          color: getLineColor(feature.properties.MRTCODE),
        })
      },
      mouseout: () => {
        setHoveredRoute(null)
        layer.setStyle(styleRoutes(feature))
      },
      click: () => {
        console.log("Clicked route:", feature.properties.MRTCODE)
        onRouteClick(feature.properties.MRTCODE)
      },
    })

    layer.on({
      mouseover: () => {
        setHoveredRoute(feature.properties.MRTCODE)
      },
      mouseout: () => {
        setHoveredRoute(null)
      },
      click: () => {
        console.log("Clicked route:", feature.properties.MRTCODE)
        onRouteClick(feature.properties.MRTCODE)
      },
    })

    // Add popup with line name
    layer.bindPopup(feature.properties.MRTCODE)
  }

  // Create GeoJSON for stations
  const stationGeoJSON = {
    type: "FeatureCollection",
    features: selectedLineStations.map((station) => ({
      type: "Feature",
      properties: {
        name: station.name_chinese,
        name_english: station.name_english,
        id: station.station_id,
      },
      geometry: {
        type: "Point",
        coordinates: [station.coordinates.longitude, station.coordinates.latitude],
      },
    })),
  }

  // Function to check if a station should be highlighted
  const shouldHighlightStation = (stationId) => {
    return selectedStation === stationId
  }

  // Function to get station style based on selection state
  const getStationStyle = (stationId) => {
    if (shouldHighlightStation(stationId)) {
      return selectedStationStyle
    }
    return stationStyle
  }

  const onEachDistrict = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setHoveredDistrict(feature.properties.TNAME)
        layer.setStyle({
          ...districtStyle(feature),
          fillOpacity: 0.5,
          weight: 3,
        })
      },
      mouseout: (e) => {
        setHoveredDistrict(null)
        layer.setStyle(districtStyle(feature))
      },
      click: (e) => {
        onDistrictClick(feature.properties.TNAME) // 地圖行政區點擊
        console.log("Clicked district:", feature.properties.TNAME)
      },
    })

    // Add popup with district name
    layer.bindPopup(feature.properties.TNAME)
  }

  // Create separate LayerGroups for routes and stations
  const renderRoutes = () => (
    <LayerGroup>
      {mrtRoutes && (
        <GeoJSON
          key={`routes-${selectedMRT || "all"}-${hoveredRoute}`}
          data={mrtRoutes}
          style={styleRoutes}
          onEachFeature={onEachRoute}
        />
      )}
    </LayerGroup>
  )

  const renderStations = () => (
    <LayerGroup>
      {selectedLineStations && selectedLineStations.length > 0 && (
        <GeoJSON
          key={`stations-${selectedMRT}-${JSON.stringify(selectedLineStations)}`}
          data={stationGeoJSON}
          pointToLayer={(feature, latlng) => {
            const style = getStationStyle(feature.properties.id)
            const marker = L.circleMarker(latlng, {
              ...style,
              zIndexOffset: 1000,
            })

            marker.on({
              mouseover: () => {
                if (!shouldHighlightStation(feature.properties.id)) {
                  marker.setStyle({
                    ...hoverStationStyle,
                    zIndexOffset: 1000,
                  })
                }
              },
              mouseout: () => {
                if (!shouldHighlightStation(feature.properties.id)) {
                  marker.setStyle({
                    ...style,
                    zIndexOffset: 1000,
                  })
                }
              },
              click: () => {
                console.log("Clicked station:", feature.properties.id)
                onStationClick(feature.properties.id)
              },
            })

            marker.bindPopup(`${feature.properties.name}<br>${feature.properties.name_english}`)

            return marker
          }}
        />
      )}
    </LayerGroup>
  )

  // Add this useEffect to forcibly clear markers when activeFilterType changes
  // Add this right after the existing useEffects at the top of the component
  useEffect(() => {
    console.log("Filter type changed to:", activeFilterType)
    // Immediately clear locations when filter type changes
    setLocations([])

    // Force re-render of marker components by setting a key
    const markerLayerEl = document.querySelector(".leaflet-marker-pane")
    if (markerLayerEl) {
      // Clear all markers from the DOM
      while (markerLayerEl.firstChild) {
        markerLayerEl.removeChild(markerLayerEl.firstChild)
      }
    }

    // Also clear popup pane
    const popupLayerEl = document.querySelector(".leaflet-popup-pane")
    if (popupLayerEl) {
      while (popupLayerEl.firstChild) {
        popupLayerEl.removeChild(popupLayerEl.firstChild)
      }
    }
  }, [activeFilterType])

  // Render exhibition/course markers
  const renderLocationMarkers = () => {
    // First check if we should show any markers based on the active filter type
    if (activeFilterType === "mrt" && !shortestPaths?.features?.length) {
      console.log("Not showing MRT markers - no paths available")
      return null
    }

    if (activeFilterType === "district" && !filteredLocations?.length) {
      console.log("Not showing district markers - no filtered locations")
      return null
    }

    // For MRT filter, only use locations from API
    // For district filter, only use filteredLocations
    const locationsToShow =
      activeFilterType === "mrt" ? locations : activeFilterType === "district" ? filteredLocations : []

    if (!locationsToShow.length) {
      console.log("No locations to render markers for")
      return null
    }

    console.log(`Rendering ${locationsToShow.length} markers for ${activeFilterType} filter`)

    return (
      <MarkerClusterGroup
        key={`locations-${activeFilterType}-${locationsToShow.length}-${selectedLocationId}`}
        chunkedLoading
        maxClusterRadius={60}
        spiderfyOnMaxZoom={true}
        polygonOptions={{
          fillColor: "#ff7800",
          color: "#ff7800",
          weight: 0.5,
          opacity: 1,
          fillOpacity: 0.2,
        }}
      >
        {locationsToShow.map((loc, index) => {
          // Added index to map function
          if (loc.latitude && loc.longitude) {
            // Determine if it's an exhibition or course
            const hasExhibitions = loc.exhibitions && loc.exhibitions.length > 0
            const hasCourses = loc.courses && loc.courses.length > 0

            console.log(`Rendering marker for location ${loc.locat_id} at [${loc.latitude}, ${loc.longitude}]`)

            return (
              <Marker
                key={`loc-${loc.locat_id}-${activeFilterType}-${index}`} // Updated key to include index
                position={[+loc.latitude, +loc.longitude]}
                icon={
                  hasExhibitions
                    ? exhibitionIcon
                    : hasCourses
                      ? courseIcon
                      : L.divIcon({
                          className: "custom-marker",
                          html: `<div class="marker-pin"></div>`,
                          iconSize: [30, 30],
                          iconAnchor: [15, 30],
                        })
                }
                eventHandlers={{
                  // Add a click handler to update selectedLocationId
                  click: () => {
                    console.log(`Marker clicked for location: ${loc.locat_id}`)
                  },
                  // Add this to help with finding markers
                  add: (e) => {
                    // Store reference to this marker with its location ID
                    e.target.options.locationId = loc.locat_id
                    e.target.options.position = [+loc.latitude, +loc.longitude]
                  },
                }}
              >
                <Popup className="location-popup">
                  <div className="popup-content">
                    {/* New structure for popup content */}
                    <h3 className="popup-title-type">
                      {hasExhibitions ? "Exhibition" : hasCourses ? "Course" : "Location"}
                    </h3>

                    {/* Display name if it exists */}
                    {loc.name && <div className="popup-name">{loc.name}</div>}

                    {/* Display dates if they exist */}
                    {loc.startdate && loc.enddate && (
                      <div className="popup-dates">
                        {formatDate(loc.startdate)} - {formatDate(loc.enddate)}
                      </div>
                    )}

                    {/* Display location name */}
                    <div className="popup-location-name">{loc.locat_name}</div>

                    {/* Display address */}
                    <div className="popup-address">{loc.address}</div>

                    {/* Show exhibitions if available */}
                    {hasExhibitions && (
                      <div className="popup-exhibitions">
                        <h4>Exhibitions</h4>
                        <div className="exhibition-list">
                          {loc.exhibitions.map((exhibition, idx) => (
                            <div key={exhibition.e_id || exhibition.id || idx} className="exhibition-item">
                              <div className="exhibition-name">{exhibition.e_name || exhibition.name}</div>
                              <div className="exhibition-dates">
                                {formatDate(exhibition.e_startdate || exhibition.startdate)} -{" "}
                                {formatDate(exhibition.e_enddate || exhibition.enddate)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show courses if available */}
                    {hasCourses && (
                      <div className="popup-courses">
                        <h4>Courses</h4>
                        <div className="course-list">
                          {loc.courses.map((courses, idx) => (
                            <div key={courses.c_id || courses.c_id || idx} className="course-item">
                              <div className="course-name">{courses.c_name || courses.name}</div>
                              <div className="course-dates">
                                {formatDate(courses.c_startdate || courses.startdate)} -{" "}
                                {formatDate(courses.c_enddate || courses.enddate)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          }
          return null
        })}
      </MarkerClusterGroup>
    )
  }

  // Add renderPathEndMarkers function to display numbered markers at path endpoints
  // This helps with visibility when clicking on path cards
  const renderPathEndMarkers = () => {
    if (!shortestPaths?.features?.length) return null

    // Only show path end markers for MRT filter type
    if (activeFilterType !== "mrt") return null

    return (
      <LayerGroup>
        {shortestPaths.features.map((path, index) => {
          if (!path.geometry?.coordinates?.[0]?.length) return null

          const coords = path.geometry.coordinates[0]
          const lastCoord = coords[coords.length - 1]

          if (!lastCoord || lastCoord.length < 2) return null

          const position = [lastCoord[1], lastCoord[0]]
          const locatId = path.properties.end_name

          // Find location details if available
          const locationDetails = locations.find((loc) => loc.locat_id.toString() === locatId.toString())

          return (
            <Marker
              key={`path-end-${index}-${locatId}`}
              position={position}
              icon={L.divIcon({
                className: "path-end-marker",
                html: `<div class="path-end-pin">${index + 1}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>
                <div>
                  <strong>Location ID:</strong> {locatId}
                  <br />
                  <strong>Distance:</strong> {formatDistance(path.properties.distance)}
                  {locationDetails && (
                    <>
                      <br />
                      <strong>Name:</strong> {locationDetails.locat_name}
                      <br />
                      <strong>Address:</strong> {locationDetails.address}
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </LayerGroup>
    )
  }

  // Render shortest paths only when appropriate
  const renderShortestPaths = () => {
    if (!shortestPaths?.features?.length) return null

    // Only show shortest paths for MRT filter type
    if (activeFilterType !== "mrt") return null

    return (
      <LayerGroup>
        {shortestPaths.features.map((path, index) => (
          <LayerGroup key={`path-${index}`}>
            <GeoJSON
              data={path}
              style={shortestPathStyle}
              onEachFeature={(feature, layer) => {
                const distance = formatDistance(feature.properties.distance)
                layer.bindPopup(`
                  <div>
                    <strong>End Location:</strong> ${feature.properties.end_name}<br/>
                    <strong>Distance:</strong> ${distance}
                  </div>
                `)
              }}
            />
          </LayerGroup>
        ))}
      </LayerGroup>
    )
  }

  return (
    <div className="map-view">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        className="map-container"
        zoomControl={false}
        ref={mapRef}
      >
        <ZoomControl position="bottomright" />
        <LayersControl position="topright">
          {/* Base layers */}
          <LayersControl.BaseLayer name="Dark">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Light">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          {/* MRT layers - only visible when activeFilterType is "mrt" */}
          <LayersControl.Overlay checked={activeFilterType === "mrt"} name="MRT Lines">
            {renderRoutes()}
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={activeFilterType === "mrt"} name="MRT Stations">
            {renderStations()}
          </LayersControl.Overlay>

          {/* District layer - only visible when activeFilterType is "district" */}
          <LayersControl.Overlay checked={activeFilterType === "district"} name="Taipei Districts">
            <LayerGroup>
              {taipeiDistricts && (
                <GeoJSON
                  key={`districts-${selectedDistrict || "all"}-${hoveredDistrict}`}
                  data={taipeiDistricts}
                  style={districtStyle}
                  onEachFeature={onEachDistrict}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Filtered Locations overlay to match the database fields */}
          <LayersControl.Overlay checked name="Locations">
            {renderLocationMarkers()}
          </LayersControl.Overlay>

          {/* Add the Path Endpoints layer to the LayersControl */}
          <LayersControl.Overlay checked name="Path Endpoints">
            {renderPathEndMarkers()}
          </LayersControl.Overlay>

          {/* Shortest Paths */}
          <LayersControl.Overlay checked name="Shortest Paths">
            {renderShortestPaths()}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}

export default MapView

