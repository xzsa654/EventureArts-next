"use client"

import "./FilterResults.css"

export default function FilterResults({
  filteredLocations,
  selectedDistrict,
  selectedStation,
  selectedLineStations,
  activeFilterType,
  shortestPaths, // Add this prop
}) {
  // Helper function to get selected station info
  const getSelectedStationInfo = () => {
    if (!selectedStation || !selectedLineStations) return null
    return selectedLineStations.find((station) => station.station_id === selectedStation)
  }

  // Helper function to get location details by end_name (locat_id)
  const getLocationDetails = (end_name) => {
    return filteredLocations?.find((loc) => loc.locat_id.toString() === end_name)
  }

  // Helper function to format distance
  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`
    }
    return `${Math.round(distance)} m`
  }

  const selectedStationInfo = getSelectedStationInfo()

  return (
    <div className="filter-results-container">
      <div className="filter-results-header">
        <h2>{activeFilterType === "district" ? "District Results" : "Station Results"}</h2>
        <span className="results-count">
          {activeFilterType === "district" && filteredLocations
            ? `${filteredLocations.filter((loc) => loc.district === selectedDistrict).length} locations`
            : selectedStationInfo && shortestPaths?.features
              ? `${shortestPaths.features.length} paths found`
              : "No selection"}
        </span>
      </div>

      <div className="results-scroll-area">
        {activeFilterType === "district" && selectedDistrict && (
          <div className="results-content">
            <div className="district-header">
              <span className="district-name">{selectedDistrict}</span>
            </div>

            {filteredLocations
              ?.filter((loc) => loc.district === selectedDistrict)
              .map((location) => (
                <div key={location.locat_id} className="location-card">
                  <div className="location-content">
                    <div className="location-info">
                      <h3>{location.locat_name}</h3>
                      <div className="location-address">{location.address}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeFilterType === "mrt" && selectedStationInfo && (
          <div className="results-content">
            <div className="station-header">
              <div className="station-info">
                <div className="station-name">{selectedStationInfo.name_chinese}</div>
                <div className="station-name-english">{selectedStationInfo.name_english}</div>
              </div>
            </div>

            <div className="station-details">
              <div className="details-label">Station Details:</div>
              <div className="details-grid">
                <div>Latitude:</div>
                <div className="coordinate">{selectedStationInfo.coordinates.latitude}</div>
                <div>Longitude:</div>
                <div className="coordinate">{selectedStationInfo.coordinates.longitude}</div>
              </div>
            </div>

            {/* Shortest Paths Section */}
            {shortestPaths?.features && shortestPaths.features.length > 0 && (
              <div className="shortest-paths-section">
                <div className="section-title">Nearest Locations:</div>
                {shortestPaths.features.map((path, index) => {
                  const locationDetails = getLocationDetails(path.properties.end_name)
                  return (
                    <div key={index} className="path-card">
                      <div className="path-header">
                        <span className="path-number">#{index + 1}</span>
                        <span className="path-distance">{formatDistance(path.properties.distance)}</span>
                      </div>
                      {locationDetails && (
                        <div className="location-details">
                          <div className="location-id">ID: {locationDetails.locat_id}</div>
                          <div className="location-name">{locationDetails.locat_name}</div>
                          <div className="location-address">{locationDetails.address}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {!selectedDistrict && !selectedStationInfo && <div className="no-selection">No selection made</div>}
      </div>
    </div>
  )
}

