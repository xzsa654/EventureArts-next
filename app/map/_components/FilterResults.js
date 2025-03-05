'use client'

import './FilterResults.css'
import { useFetchLocations } from '../hooks/useFetchLocations'

export default function FilterResults({
  filteredLocations,
  selectedDistrict,
  selectedStation,
  selectedLineStations,
  activeFilterType,
  shortestPaths,
  onSelectLocation,
}) {
  // 排序捷運最近距離
  const shortestPathsSorted = shortestPaths?.features
    ? [...shortestPaths.features].sort(
        (a, b) => a.properties.distance - b.properties.distance
      )
    : []

  // 取得 end_name 作為 locatIds
  const locatIds = shortestPathsSorted.map((path) => path.properties.end_name)

  // 透過 hook 獲取 locations 資料
  const { locations, loading, error } = useFetchLocations(locatIds)

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


  return (
    <div className="filter-results-container">
      <div className="filter-results-header">
        <h4 className="text-sm font-medium text-gray-700 tracking-wide">
          Results
        </h4>
        <span className="text-sm text-gray-500 tracking-wider">
          {activeFilterType === 'district' && filteredLocations
            ? `${filteredLocations.length} exhibitions`
            : selectedStationInfo && shortestPathsSorted.length > 0
            ? `${shortestPathsSorted.length} found`
            : 'No selection'}
        </span>
      </div>
  
      <div className="results-scroll-area">
        {activeFilterType === 'district' && selectedDistrict && (
          <div className="results-content">
            {filteredLocations?.map((location) => (
              <button
                key={location.id}
                className="location-card"
                onClick={() => onSelectLocation(location.locat_id)}
              >
                <div className="location-content">
                  <div className="location-info">
                    <h3>{location.name}</h3>
                    <div className="location-address">
                      {location.locat_name}
                    </div>
                    <div className="location-address">{location.address}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
  
        {activeFilterType === 'mrt' && selectedStationInfo && (
          <div className="results-content">
            {loading && <div className="loading">Loading locations...</div>}
            {error && <div className="error">Error loading locations</div>}
  
            {shortestPathsSorted.length > 0 ? (
              <div>
                <div className="section-title">Nearest Locations:</div>
                {shortestPathsSorted.map((path, index) => {
                  const locationDetails = locations.find(
                    (loc) => loc.locat_id.toString() === path.properties.end_name.toString()
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
