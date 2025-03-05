'use client'

import { useRef, useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  GeoJSON,
  LayerGroup,
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import './MapView.css'
import { useFitBounds } from './useFitBounds' // Import the new hook
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

// Fix Leaflet's default icon issue
L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.7.1/dist/images/'

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
}) => {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]
  const [hoveredRoute, setHoveredRoute] = useState(null)
  const [hoveredDistrict, setHoveredDistrict] = useState(null)

  // 監聽 selectedLocationId 變化
  useEffect(() => {
    if (!selectedLocationId || !filteredLocations.length) return

    const location = filteredLocations.find(
      (loc) => loc.locat_id === selectedLocationId
    )
    if (location && mapRef.current) {
      const { latitude, longitude } = location
      mapRef.current.flyTo([latitude, longitude], 17, {
        duration: 1.5,
      })
    }
  }, [selectedLocationId, filteredLocations])

  // Use the custom fitBounds hook
  useFitBounds({
    mapRef,
    shortestPaths,
    filteredLocations,
    selectedDistrict,
    selectedMRT,
    selectedLineStations,
    selectedStation, // Add this
    taipeiDistricts,
    mrtRoutes,
    activeFilterType, // Add this
  })

  // Base styles
  const routeStyle = {
    color: '#666666',
    weight: 3,
    opacity: 0.8,
  }

  const selectedStyle = {
    color: '#ff0000',
    weight: 5,
    opacity: 1,
  }

  const hoverStyle = {
    color: '#0000ff',
    weight: 5,
    opacity: 1,
  }

  const shortestPathStyle = {
    color: '#00ff00',
    weight: 4,
    opacity: 0.8,
    dashArray: '5, 10', // Dashed line style
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
    color: '#000',
    opacity: 0,
  }

  const getLineColor = (lineName) => {
    const colorMap = {
      淡水信義線: '#e3002c', // Red
      松山新店線: '#008659', // Green
      中和新蘆線: '#f8b61c', // Orange
      板南線: '#0070bd', // Blue
      文湖線: '#c48c31', // Brown
    }
    return colorMap[lineName] || '#666666'
  }

  // Update station styles
  const stationStyle = {
    radius: 6,
    fillColor: '#ffffff',
    color: selectedMRT ? getLineColor(selectedMRT) : '#000000',
    weight: 2,
    opacity: 1,
    fillOpacity: 1,
  }

  const selectedStationStyle = {
    radius: 10,
    fillColor: getLineColor(selectedMRT) || '#ff7800',
    color: '#000',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8,
  }

  const hoverStationStyle = {
    radius: 8,
    fillColor: '#ffffff',
    color: getLineColor(selectedMRT) || '#000000',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.9,
  }

  // District selected style (hover)
  const districtStyle = (feature) => {
    const isSelected = feature.properties.TNAME === selectedDistrict
    const isHovered = feature.properties.TNAME === hoveredDistrict

    return {
      color: '#ff7800',
      weight: isSelected || isHovered ? 3 : 1,
      opacity: 0.65,
      fillOpacity: isSelected ? 0.7 : isHovered ? 0.5 : 0.2,
      fillColor: isSelected ? '#ff7800' : '#ffb380',
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
        console.log('Clicked route:', feature.properties.MRTCODE)
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
        console.log('Clicked route:', feature.properties.MRTCODE)
        onRouteClick(feature.properties.MRTCODE)
      },
    })

    // Add popup with line name
    layer.bindPopup(feature.properties.MRTCODE)
  }

  // Create GeoJSON for stations
  const stationGeoJSON = {
    type: 'FeatureCollection',
    features: selectedLineStations.map((station) => ({
      type: 'Feature',
      properties: {
        name: station.name_chinese,
        name_english: station.name_english,
        id: station.station_id,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          station.coordinates.longitude,
          station.coordinates.latitude,
        ],
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
        console.log('Clicked district:', feature.properties.TNAME)
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
          key={`routes-${selectedMRT || 'all'}-${hoveredRoute}`}
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
          key={`stations-${selectedMRT}-${JSON.stringify(
            selectedLineStations
          )}`}
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
                console.log('Clicked station:', feature.properties.id)
                onStationClick(feature.properties.id)
              },
            })

            marker.bindPopup(
              `${feature.properties.name}<br>${feature.properties.name_english}`
            )

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

          {/* MRT layers - only visible when activeFilterType is "mrt" */}
          <LayersControl.Overlay
            checked={activeFilterType === 'mrt'}
            name="MRT Lines"
          >
            {renderRoutes()}
          </LayersControl.Overlay>

          <LayersControl.Overlay
            checked={activeFilterType === 'mrt'}
            name="MRT Stations"
          >
            {renderStations()}
          </LayersControl.Overlay>

          {/* District layer - only visible when activeFilterType is "district" */}
          <LayersControl.Overlay
            checked={activeFilterType === 'district'}
            name="Taipei Districts"
          >
            <LayerGroup>
              {taipeiDistricts && (
                <GeoJSON
                  key={`districts-${
                    selectedDistrict || 'all'
                  }-${hoveredDistrict}`}
                  data={taipeiDistricts}
                  style={districtStyle}
                  onEachFeature={onEachDistrict}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Filtered Locations overlay to match the database fields */}
          <LayersControl.Overlay checked name="Filtered Locations">
            <MarkerClusterGroup
              key={`${selectedDistrict}-${selectedStation}`} // ✅ 依行政區和捷運站變化強制重建
              chunkedLoading
              maxClusterRadius={60}
              spiderfyOnMaxZoom={true}
              polygonOptions={{
                fillColor: '#ff7800',
                color: '#ff7800',
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.2,
              }}
            >
              {Array.isArray(filteredLocations) &&
                filteredLocations.map((loc) => {
                  if (loc.latitude && loc.longitude) {
                    return (
                      <Marker
                        key={loc.id}
                        position={[+loc.latitude, +loc.longitude]}
                        icon={L.divIcon({
                          className: 'custom-marker',
                          html: `<div class="marker-pin"></div>`,
                          iconSize: [30, 30],
                          iconAnchor: [15, 30],
                        })}
                      >
                        <Popup>
                          <div className="space-y-1">
                            <p>
                              <b>ID: {loc.locat_id}</b>
                            </p>
                            <p>
                              <b>{loc.locat_name}</b>
                            </p>
                            <p>{loc.district}</p>
                            <p>{loc.address}</p>
                          </div>
                        </Popup>
                      </Marker>
                    )
                  }
                  return null
                })}
            </MarkerClusterGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Shortest Paths">
            <LayerGroup>
              {shortestPaths?.features?.map((path, index) => (
                <LayerGroup key={`path-${index}`}>
                  <GeoJSON
                    data={path}
                    style={shortestPathStyle}
                    onEachFeature={(feature, layer) => {
                      const distance = formatDistance(
                        feature.properties.distance
                      )
                      layer.bindPopup(`
                        <div>
                          <strong>End Location:</strong> ${feature.properties.end_name}<br/>
                          <strong>Distance:</strong> ${distance}
                        </div>
                      `)
                    }}
                  />
                  <Marker
                    position={[
                      path.geometry.coordinates[0][
                        path.geometry.coordinates[0].length - 1
                      ][1],
                      path.geometry.coordinates[0][
                        path.geometry.coordinates[0].length - 1
                      ][0],
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>Location ID:</strong> {path.properties.end_name}
                        <br />
                        <strong>Distance:</strong>{' '}
                        {formatDistance(path.properties.distance)}
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

export default MapView
