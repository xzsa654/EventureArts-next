"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, LayersControl, ZoomControl, GeoJSON, LayerGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./MapView.css"
import L from "leaflet"

export default function MapView() {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]
  const [mrtRoutes, setMrtRoutes] = useState(null)
  const [mrtStations, setMrtStations] = useState(null)
  const [taipeiDistricts, setTaipeiDistricts] = useState(null)

  useEffect(() => {
    if (!mapRef.current) {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    }

    fetch("/map/TPE_MRT_ROUTE_4326.geojson")
      .then((response) => response.json())
      .then((data) => {
        console.log("MRT Routes loaded:", data)
        setMrtRoutes(data)
      })
      .catch((error) => console.error("Error loading MRT routes:", error))

    fetch("/map/TPE_MRT_STATION_4326.geojson")
      .then((response) => response.json())
      .then((data) => {
        console.log("MRT Stations loaded:", data)
        setMrtStations(data)
      })
      .catch((error) => console.error("Error loading MRT stations:", error))

    fetch("/map/TPE_Dist_4326.geojson")
      .then((response) => response.json())
      .then((data) => {
        console.log("Taipei Districts loaded:", data)
        setTaipeiDistricts(data)
      })
      .catch((error) => console.error("Error loading Taipei districts:", error))
  }, [])

  const routeStyle = {
    color: "#666666",
    weight: 3,
    opacity: 0.8,
  }

  const stationStyle = {
    radius: 6,
    fillColor: "#ffffff",
    color: "#000000",
    weight: 1.5,
    opacity: 1,
    fillOpacity: 1,
  }

  const districtStyle = {
    color: "#ff7800",
    weight: 2,
    opacity: 0.65,
    fillOpacity: 0.2,
  }

  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, stationStyle)
  }

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name)
    }
    console.log("Feature added:", feature)
  }

  const onEachDistrict = (feature, layer) => {
    if (feature.properties && feature.properties.TOWNNAME) {
      layer.bindPopup(feature.properties.TOWNNAME)
    }
    console.log("District added:", feature)
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
              {mrtRoutes && <GeoJSON key="routes" data={mrtRoutes} style={routeStyle} onEachFeature={onEachFeature} />}
              {mrtStations && (
                <GeoJSON key="stations" data={mrtStations} pointToLayer={pointToLayer} onEachFeature={onEachFeature} />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Taipei Districts">
            <LayerGroup>
              {taipeiDistricts && (
                <GeoJSON key="districts" data={taipeiDistricts} style={districtStyle} onEachFeature={onEachDistrict} />
              )}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}

