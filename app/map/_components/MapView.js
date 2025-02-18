"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, LayersControl, ZoomControl, GeoJSON, LayerGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./MapView.css"
import L from "leaflet"

export default function MapView({ mrtRoutes, mrtStations, taipeiDistricts, selectedMRT, selectedDistrict }) {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]

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

  const stationStyle = {
    radius: 6,
    fillColor: "#ffffff",
    color: "#000000",
    weight: 1.5,
    opacity: 1,
    fillOpacity: 1,
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

  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, stationStyle)
  }

  const onEachRouteFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        if (!selectedMRT || feature.properties.MRTCODE === selectedMRT) {
          layer.setStyle(hoverStyle)
        }
      },
      mouseout: () => {
        if (!selectedMRT || feature.properties.MRTCODE === selectedMRT) {
          layer.setStyle(selectedMRT === feature.properties.MRTCODE ? selectedStyle : routeStyle)
        }
      },
    })
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

  const filterRoutes = (feature) => {
    return !selectedMRT || feature.properties.MRTCODE === selectedMRT
  }

  const styleRoutes = (feature) => {
    return selectedMRT === feature.properties.MRTCODE ? selectedStyle : routeStyle
  }

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="map-container" zoomControl={false}>
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
                  key={selectedMRT || "all"}
                  data={mrtRoutes}
                  style={styleRoutes}
                  onEachFeature={onEachRouteFeature}
                  filter={filterRoutes}
                />
              )}
              {mrtStations && (
                <GeoJSON
                  key="stations"
                  data={mrtStations}
                  pointToLayer={pointToLayer}
                  onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.name) {
                      layer.bindPopup(feature.properties.name)
                    }
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
        </LayersControl>
      </MapContainer>
    </div>
  )
}

