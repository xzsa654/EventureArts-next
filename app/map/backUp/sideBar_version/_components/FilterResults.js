"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const FilterResults = ({ filteredLocations, selectedDistrict, onLocationClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Filter locations for the selected district
  const locations = filteredLocations?.filter((loc) => loc.district === selectedDistrict) || []

  return (
    <div
      className={`fixed left-0 top-0 z-[400] h-screen bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-12" : "w-80"
      }`}
    >
      {/* Collapse toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 z-50 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        {isCollapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
      </button>

      {/* Content */}
      {!isCollapsed && (
        <div className="h-full overflow-hidden">
          {/* Header */}
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Filter Results</h2>
            <p className="text-sm text-gray-500">
              {locations.length} location{locations.length !== 1 ? "s" : ""} found
              {selectedDistrict ? ` in ${selectedDistrict}` : ""}
            </p>
          </div>

          {/* Results list */}
          <div className="h-[calc(100vh-5rem)] overflow-y-auto p-4">
            {locations.length > 0 ? (
              <div className="space-y-4">
                {locations.map((location) => (
                  <div
                    key={location.locat_id}
                    className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
                    onClick={() => onLocationClick(location)}
                  >
                    <h3 className="font-medium">{location.locat_name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{location.address}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">No locations found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterResults

