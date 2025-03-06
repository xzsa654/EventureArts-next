"use client"

import { useEffect, useState } from "react"

export function useFetchLocations(locatIds, selectedType) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Don't fetch if there are no IDs or no selected type
    if (!locatIds.length || !selectedType) {
      setLoading(false)
      return
    }

    // Convert locatIds to a string for comparison
    const locatIdsString = locatIds.join(",")

    // Use a ref to track the last fetched IDs to prevent duplicate requests
    const controller = new AbortController()

    const fetchLocations = async () => {
      try {
        setLoading(true)
        console.log(
          "Fetching URL:",
          `http://localhost:3001/map/fetchLocations?locatIds=${locatIdsString}&type=${selectedType}`,
        )

        const response = await fetch(
          `http://localhost:3001/map/fetchLocations?locatIds=${locatIdsString}&type=${selectedType}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }

        const data = await response.json()
        console.log("API Response:", data)

        if (data.success && data.data.length > 0) {
          setLocations(data.data)
        } else {
          setLocations([])
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err)
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()

    // Cleanup function to abort fetch if component unmounts or dependencies change
    return () => {
      controller.abort()
    }
  }, [locatIds.join(","), selectedType]) // Use locatIds.join(',') to prevent unnecessary re-renders

  return { locations, loading, error }
}

