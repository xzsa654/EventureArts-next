"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, LayersControl, ZoomControl, GeoJSON, LayerGroup, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./MapView.css"
import L from "leaflet"

export default function MapView({
  mrtRoutes,
  taipeiDistricts,
  selectedMRT,
  selectedDistrict,
  selectedStation,
  shortestPaths,
  filteredLocations,
  selectedLineStations,
}) {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]

  // Debug logging
  useEffect(() => {
    console.log("Selected MRT Line:", selectedMRT)
    console.log("Selected Station:", selectedStation)
    console.log("Selected Line Stations:", selectedLineStations)
    if (mrtRoutes && mrtRoutes.features) {
      console.log(
        "Available MRT Routes:",
        mrtRoutes.features.map((f) => ({
          code: f.properties.MRTCODE,
          selected: f.properties.MRTCODE === selectedMRT,
        })),
      )
    }
  }, [selectedMRT, selectedStation, selectedLineStations, mrtRoutes])

  useEffect(() => {
    if (!mapRef.current) {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    }
  }, [])

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

  // Update station styles to use line colors
  const stationStyle = {
    radius: 5,
    fillColor: "#ffffff",
    color: selectedMRT ? getLineColor(selectedMRT) : "#000000",
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
  }

  const selectedStationStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8,
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

  const shortestPathStyle = {
    color: "#00ff00",
    weight: 4,
    opacity: 0.8,
  }

  // Function to check if a route should be highlighted
  const shouldHighlightRoute = (feature) => {
    if (!selectedMRT || !feature.properties) return false

    // Direct comparison between selected line and MRTCODE
    const match = feature.properties.MRTCODE === selectedMRT

    console.log("Comparing route:", {
      selected: selectedMRT,
      routeCode: feature.properties.MRTCODE,
      match: match,
    })

    return match
  }

  const styleRoutes = (feature) => {
    const isHighlighted = shouldHighlightRoute(feature)

    console.log("Styling route:", {
      code: feature.properties.MRTCODE,
      isHighlighted,
      selectedMRT,
    })

    if (isHighlighted) {
      return {
        ...selectedStyle,
        color: getLineColor(feature.properties.MRTCODE),
      }
    }
    return routeStyle
  }

  const onEachRoute = (feature, layer) => {
    layer.on({
      mouseover: () => {
        if (shouldHighlightRoute(feature)) {
          layer.setStyle({
            ...hoverStyle,
            color: getLineColor(feature.properties.MRTCODE),
          })
        }
      },
      mouseout: () => {
        layer.setStyle(styleRoutes(feature))
      },
      click: () => {
        console.log("Clicked route:", feature.properties)
      },
    })

    // Add popup with line name
    layer.bindPopup(feature.properties.MRTCODE)
  }

  const onEachDistrict = (feature, layer) => {
    if (feature.properties && feature.properties.TNAME) {
      layer.bindPopup(feature.properties.TNAME)
    }
    layer.on({
      mouseover: () => {
        if (!selectedDistrict || feature.properties.TNAME === selectedDistrict) {
          layer.setStyle({
            fillOpacity: 0.7,
            fillColor: "#ff7800",
          })
        }
      },
      mouseout: () => {
        layer.setStyle(districtStyle(feature))
      },
    })
  }

  // Create GeoJSON for stations with line-colored markers
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
    return {
      ...stationStyle,
      // Make unselected stations slightly smaller when one is selected
      radius: selectedStation ? 4 : 5,
    }
  }

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
          <LayersControl.BaseLayer checked name="Dark">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Light">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="MRT">
            <LayerGroup>
              {mrtRoutes && (
                <GeoJSON
                  key={`routes-${selectedMRT || "all"}`}
                  data={mrtRoutes}
                  style={styleRoutes}
                  onEachFeature={onEachRoute}
                />
              )}
              {selectedLineStations && selectedLineStations.length > 0 && (
                <GeoJSON
                  key={`stations-${selectedStation || "all"}`}
                  data={stationGeoJSON}
                  pointToLayer={(feature, latlng) => {
                    const style = getStationStyle(feature.properties.id)
                    const marker = L.circleMarker(latlng, style)

                    // Add popup with both Chinese and English names
                    marker.bindPopup(`${feature.properties.name}<br>${feature.properties.name_english}`)

                    // Add hover effect
                    marker.on({
                      mouseover: () => {
                        if (!shouldHighlightStation(feature.properties.id)) {
                          marker.setStyle({
                            ...style,
                            radius: style.radius + 2,
                            fillOpacity: 0.8,
                          })
                        }
                      },
                      mouseout: () => {
                        if (!shouldHighlightStation(feature.properties.id)) {
                          marker.setStyle(style)
                        }
                      },
                    })

                    return marker
                  }}
                />
              )}
            </LayerGroup>
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
              {shortestPaths?.features
                ?.filter((path) => path.properties.start_name === selectedStation)
                .map((path, index) => (
                  <LayerGroup key={`path-${index}`}>
                    <GeoJSON
                      data={{
                        type: "Feature",
                        properties: path.properties,
                        geometry: path.geometry,
                      }}
                      style={shortestPathStyle}
                    />
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
                          <strong>Distance:</strong> {Math.round(path.properties.distance)} meters
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

