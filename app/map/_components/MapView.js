'use client'

import { useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  GeoJSON,
  LayerGroup,
  // CircleMarker,
  Marker,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'
import L from 'leaflet'

export default function MapView({
  mrtRoutes,
  mrtStations,
  taipeiDistricts,
  selectedMRT,
  selectedDistrict,
  dbLocations,
}) {
  const mapRef = useRef(null)
  const center = [25.033, 121.5654]

  useEffect(() => {
    // 設定預設的 Marker icon（Leaflet 預設的 icon URL 在 Next.js 下可能出不來）
    if (!mapRef.current) {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    }
  }, [])

  // MRT line default style
  const routeStyle = {
    color: '#666666',
    weight: 3,
    opacity: 0.8,
  }
  // MRT line highlight style
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

  //
  const stationStyle = {
    radius: 6,
    fillColor: '#ffffff',
    color: '#000000',
    weight: 1.5,
    opacity: 1,
    fillOpacity: 1,
  }

  // 行政區樣式：選到的區域 fillOpacity 會比較深
  const districtStyle = (feature) => {
    const isSelected = feature.properties.TNAME === selectedDistrict
    return {
      color: '#ff7800',
      weight: 2,
      opacity: 0.65,
      fillOpacity: isSelected ? 0.7 : 0.2,
      fillColor: isSelected ? '#ff7800' : '#ffb380',
    }
  }

  // MRT 車站用 circleMarker 呈現
  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, stationStyle)
  }

  // MRT 路線事件：滑入、滑出時改變樣式
  const onEachRouteFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        if (!selectedMRT || feature.properties.MRTCODE === selectedMRT) {
          layer.setStyle(hoverStyle)
        }
      },
      mouseout: () => {
        if (!selectedMRT || feature.properties.MRTCODE === selectedMRT) {
          layer.setStyle(
            selectedMRT === feature.properties.MRTCODE
              ? selectedStyle
              : routeStyle
          )
        }
      },
    })
  }

  // 行政區事件：滑入、滑出時改變透明度
  const onEachDistrict = (feature, layer) => {
    if (feature.properties && feature.properties.TNAME) {
      layer.bindPopup(feature.properties.TNAME)
    }
    layer.on({
      mouseover: () => {
        if (
          !selectedDistrict ||
          feature.properties.TNAME === selectedDistrict
        ) {
          layer.setStyle({
            fillOpacity: 0.7,
            fillColor: '#ff7800',
          })
        }
      },
      mouseout: () => {
        layer.setStyle(districtStyle(feature))
      },
    })
  }

  // 只呈現選取的 MRT 路線（若有）
  const filterRoutes = (feature) => {
    return !selectedMRT || feature.properties.MRTCODE === selectedMRT
  }

  // 決定 MRT 路線顏色
  const styleRoutes = (feature) => {
    return selectedMRT === feature.properties.MRTCODE
      ? selectedStyle
      : routeStyle
  }

  // 根據 selectedDistrict 過濾資料庫座標
  const filteredDbLocations =
    selectedDistrict && selectedDistrict !== ''
      ? dbLocations.filter((loc) => loc.district === selectedDistrict)
      : dbLocations

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
          {/* 不同底圖 */}
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

          {/* MRT 路線與車站 */}
          <LayersControl.Overlay checked name="MRT">
            <LayerGroup>
              {mrtRoutes && (
                <GeoJSON
                  key={selectedMRT || 'all'}
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

          {/* 行政區 */}
          <LayersControl.Overlay checked name="Taipei Districts">
            <LayerGroup>
              {taipeiDistricts && (
                <GeoJSON
                  key={selectedDistrict || 'all-districts'}
                  data={taipeiDistricts}
                  style={districtStyle}
                  onEachFeature={onEachDistrict}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* 從資料庫取得的標記點（根據 selectedDistrict 篩選） */}
          <LayersControl.Overlay checked name="Database Locations">
            <LayerGroup>
              {filteredDbLocations.map((loc) => {
                if (loc.latitude && loc.longitude) {
                  return (
                    <Marker
                    key={loc.locat_id}
                    position={[+loc.latitude, +loc.longitude]}
                  
                      // key={loc.locat_id}
                      // center={[
                      //   parseFloat(loc.latitude),
                      //   parseFloat(loc.longitude),
                      // ]}
                      // style of circle marker
                      // pathOptions={{
                      //   color: '#65a30d',
                      //   weight: 2,
                      //   fillColor: '#fbbf24',
                      //   fillOpacity: 0.8,
                      // }}
                      // radius={10}
                    >
                      <Popup>
                        <b>ID: {loc.locat_id}</b>
                        <br />
                        <b>{loc.locat_name}</b>
                        <br />
                        {loc.district}{loc.address}
                      </Popup>
                    </Marker>
                  )
                }
                return null
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}
