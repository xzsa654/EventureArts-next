"use client"

import dynamic from "next/dynamic"
import FilterPanel from "./_components/FilterPanel"
import "./map.css"

const MapView = dynamic(() => import("./_components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loader"></div>
    </div>
  ),
})

export default function MapPage() {
  return (
    <div className="map-page-wrapper">
      <div className="map-content">
        <div className="map-page">
          <FilterPanel />
          <MapView />
        </div>
      </div>
      
    </div>
  )
}

