'use client';

import { useEffect, useState } from 'react';

export function useFetchLocations(locatIds) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locatIds.length) return;

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/map/fetchLocations?locatIds=${locatIds.join(',')}`
        );
        const data = await response.json();

        if (data.success) {
          setLocations(data.data);
        } else {
          setError('Failed to fetch locations');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [locatIds]);

  return { locations, loading, error };
}
