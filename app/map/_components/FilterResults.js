'use client'

import './FilterResults.css'

export default function FilterResults({
  filteredLocations,
  selectedDistrict,
  selectedStation,
  selectedLineStations,
  activeFilterType,
  shortestPaths,
  onSelectLocation, //  接收來自FilterResults結果的 props
}) {
  // Helper function to get selected station info
  const getSelectedStationInfo = () => {
    if (!selectedStation || selectedStation === 'all' || !selectedLineStations)
      return null
    return selectedLineStations.find(
      (station) => station.station_id === selectedStation
    )
  }

  // Helper function to get location details by end_name (locat_id)
  const getLocationDetails = (end_name) => {
    if (!end_name || !filteredLocations) return null
    // Convert both to strings for comparison
    return filteredLocations.find(
      (loc) => loc.locat_id.toString() === end_name.toString()
    )
  }

  // Helper function to format distance
  const formatDistance = (distance) => {
    if (!distance) return 'N/A'
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`
    }
    return `${Math.round(distance)} m`
  }

  const selectedStationInfo = getSelectedStationInfo()

  // Sort shortest paths by distance
  const sortedPaths = shortestPaths?.features
    ? [...shortestPaths.features].sort(
        (a, b) => a.properties.distance - b.properties.distance
      )
    : []

  return (
    <div className="filter-results-container">
      <div className="filter-results-header">
        <h3>{activeFilterType === 'district' ? 'Results' : 'Results'}</h3>
        <span className="results-count">
          {activeFilterType === 'district' && filteredLocations
            ? `${filteredLocations.length} exhibitions`
            : selectedStationInfo && sortedPaths.length > 0
            ? `${sortedPaths.length} found`
            : 'No selection'}
        </span>
      </div>

      <div className="results-scroll-area">
        {activeFilterType === 'district' && selectedDistrict && (
          <div className="results-content">
            <div className="district-header">
              <span className="district-name">{selectedDistrict}</span>
            </div>

            {filteredLocations?.map((location) => (
              <div
                key={location.id} // 後端更改SQL之後可判斷courses/exhibit
                className="location-card"
                onClick={() => onSelectLocation(location.locat_id)}
              >
                <div className="location-content">
                  <div className="location-info">
                    <h3>{location.name}</h3> {/* 只需要name */}
                    <div className="location-address">
                      {location.locat_name}
                    </div>
                    <div className="location-address">{location.address}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeFilterType === 'mrt' && selectedStationInfo && (
          <div className="results-content">
            <div className="station-header">
              <div className="station-info">
                <div className="station-name">
                  {selectedStationInfo.name_chinese}
                </div>
                <div className="station-name-english">
                  {selectedStationInfo.name_english}
                </div>
              </div>
            </div>

            {/* <div className="station-details">
              <div className="details-label">Station Details:</div>
              <div className="details-grid">
                <div>Latitude:</div>
                <div className="coordinate">{selectedStationInfo.coordinates.latitude}</div>
                <div>Longitude:</div>
                <div className="coordinate">{selectedStationInfo.coordinates.longitude}</div>
              </div>
            </div> */}

            {/* Shortest Paths Section */}
            {sortedPaths.length > 0 ? (
              <div className="shortest-paths-section">
                <div className="section-title">Nearest Locations:</div>
                {sortedPaths.map((path, index) => {
                  const locationDetails = getLocationDetails(
                    path.properties.end_name
                  )
                  return (
                    <div key={index} className="path-card">
                      <div className="path-header">
                        <span className="path-number">#{index + 1}</span>
                        <span className="path-distance">
                          {formatDistance(path.properties.distance)}
                        </span>
                      </div>
                      {locationDetails ? (
                        <div className="location-details">
                          <div className="location-id">
                            ID: {locationDetails.locat_id}
                          </div>
                          <div className="location-name">
                            {locationDetails.locat_name}
                          </div>
                          <div className="location-address">
                            {locationDetails.address}
                          </div>
                        </div>
                      ) : (
                        <div className="location-details">
                          <div className="location-id">
                            ID: {path.properties.end_name}
                          </div>
                          <div className="location-name">
                            Location details not found
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : selectedStation && selectedStation !== 'all' ? (
              <div className="no-paths-message">
                Click "Apply Filter" to find nearest locations
              </div>
            ) : null}
          </div>
        )}

        {!selectedDistrict && !selectedStationInfo && (
          <div className="no-selection">No selection made</div>
        )}
      </div>
    </div>
  )
}
