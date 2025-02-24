"use client"

import { useRef, useState } from "react"
import { MapContainer, TileLayer, LayersControl, ZoomControl, GeoJSON, LayerGroup, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./MapView.css"
import L from "leaflet"
// Fix Leaflet's default icon issue
// Add this code right after the imports
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/"

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// In your Marker components, use the custom icon:
const lat = 51.505 // Example latitude
const lng = -0.09 // Example longitude

export default function MapView({
  mrtRoutes,
  taipeiDistricts,
  selectedMRT,
  selectedStation,
  selectedLineStations,
  shortestPaths,
  filteredLocations,
  onRouteClick,
  onStationClick,
}) {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [hoveredRoute, setHoveredRoute] = useState(null)

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
    weight: 15, // Adjusted buffer size
    color: "#000",
    opacity: 0,
  }

  const getLineColor = (lineName) => {
    const colorMap = {
      淡水信義線: "#ff0000", // Red
      松山新店線: "#008000", // Green
      中和新蘆線: "#ff6600", // Orange
      板南線: "#0000ff", // Blue
      文湖線: "#825200", // Brown
      環狀線: "#ffff00", // Yellow
    }
    return colorMap[lineName] || "#666666"
  }

  // Update station styles
  const stationStyle = {
    radius: 6, // Slightly larger base size
    fillColor: "#ffffff",
    color: selectedMRT ? getLineColor(selectedMRT) : "#000000",
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
  }

  const selectedStationStyle = {
    radius: 10, // Larger radius for selected station
    fillColor: getLineColor(selectedMRT) || "#ff7800", // Use line color for fill
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

  const districtStyle = (feature) => {
    return {
      color: "#ff7800",
      weight: 2,
      opacity: 0.65,
      fillOpacity: feature.properties.TNAME === selectedDistrict ? 0.7 : 0.2,
      fillColor: feature.properties.TNAME === selectedDistrict ? "#ff7800" : "#ffb380",
    }
  }

  // Update the shortestPathStyle and add popup content

  // Add function to format distance

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
        setSelectedDistrict(feature.properties.TNAME)
      },
      mouseout: (e) => {
        setSelectedDistrict(null)
      },
    })
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
          key={`stations-${selectedMRT}-${JSON.stringify(selectedLineStations)}`} // Force remount when stations change
          data={stationGeoJSON}
          pointToLayer={(feature, latlng) => {
            const style = getStationStyle(feature.properties.id)
            const marker = L.circleMarker(latlng, {
              ...style,
              zIndexOffset: 1, // Ensure stations appear above lines
            })

            // Add hover effect
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
                    zIndexOffset: 1,
                  })
                }
              },
              click: () => {
                console.log("Clicked station:", feature.properties.id)
                onStationClick(feature.properties.id)
              },
            })

            // Add popup with both Chinese and English names
            marker.bindPopup(`${feature.properties.name}<br>${feature.properties.name_english}`)

            return marker
          }}
        />
      )}
    </LayerGroup>
  )

  return (
    <div className="map-view">
      <MapContainer
        center={center}
        zoom={13}
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

          {/* MRT lines and stations in separate layers */}
          <LayersControl.Overlay checked name="MRT Lines">
            {renderRoutes()}
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="MRT Stations">
            {renderStations()}
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Taipei Districts">
            <LayerGroup>
              {taipeiDistricts && (
                <GeoJSON
                  key={selectedDistrict || "all-districts"}
                  data={taipeiDistricts}
                  style={districtStyle}
                  onEachFeature={onEachDistrict}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Filtered Locations">
            <LayerGroup>
              {filteredLocations?.map((loc) => {
                if (loc.latitude && loc.longitude) {
                  return (
                    <Marker key={loc.locat_id} position={[+loc.latitude, +loc.longitude]}>
                      <Popup>
                        <b>ID: {loc.locat_id}</b>
                        <br />
                        <b>{loc.locat_name}</b>
                        <br />
                        {loc.district}
                        {loc.address}
                      </Popup>
                    </Marker>
                  )
                }
                return null
              })}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Shortest Paths">
            <LayerGroup>
              {shortestPaths?.features?.map((path, index) => (
                <LayerGroup key={`path-${index}`}>
                  <GeoJSON
                    data={path}
                    style={shortestPathStyle}
                    onEachFeature={(feature, layer) => {
                      // Add popup with path information
                      const distance = formatDistance(feature.properties.distance)
                      layer.bindPopup(`
                        <div>
                          <strong>End Location:</strong> ${feature.properties.end_name}<br/>
                          <strong>Distance:</strong> ${distance}
                        </div>
                      `)
                    }}
                  />
                  {/* Add marker at the end point of the path */}
                  <Marker
                    position={[
                      path.geometry.coordinates[0][path.geometry.coordinates[0].length - 1][1],
                      path.geometry.coordinates[0][path.geometry.coordinates[0].length - 1][0],
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>Location ID:</strong> {path.properties.end_name}
                        <br />
                        <strong>Distance:</strong> {formatDistance(path.properties.distance)}
                      </div>
                    </Popup>
                  </Marker>
                </LayerGroup>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}

