"use client"

import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from "react";
import FilterPanel from "./_components/FilterPanel";
import "./map.css";

const MapView = dynamic(() => import('./_components/MapView'), {
  ssr: false, // 關閉 SSR，確保只在瀏覽器端載入
});

// 後端 API 的 base URL（預設為 http://localhost:3001）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export default function Page() {
  const [selectedMRT, setSelectedMRT] = useState("");
  const [mrtRoutes, setMrtRoutes] = useState(null);
  const [mrtStations, setMrtStations] = useState(null);
  const [taipeiDistricts, setTaipeiDistricts] = useState(null);
  const [mrtLines, setMrtLines] = useState([]);
  const [dbLocations, setDbLocations] = useState([]); // 後端資料庫的場地座標資訊
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 取得 MRT 路線、車站、行政區 GeoJSON 資料
  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        setIsLoading(true);
        const [routesRes, stationsRes, districtsRes] = await Promise.all([
          fetch("/map/TPE_MRT_ROUTE_4326.geojson"),
          fetch("/map/TPE_MRT_STATION_4326.geojson"),
          fetch("/map/TPE_Dist_4326.geojson"),
        ]);

        const routesData = await routesRes.json();
        const stationsData = await stationsRes.json();
        const districtsData = await districtsRes.json();

        setMrtRoutes(routesData);
        setMrtStations(stationsData);
        setTaipeiDistricts(districtsData);

        const lines = [
          ...new Set(routesData.features.map((feature) => feature.properties.MRTCODE)),
        ];
        setMrtLines(lines);

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading GeoJSON data:", err);
        setError("Failed to load map data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchGeoJsonData();
  }, []);

  // 從後端 API 取得資料庫中的場地座標資訊
  useEffect(() => {
    fetch(`${API_BASE_URL}/map`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDbLocations(data.data);
        } else {
          console.error("Error fetching backend locations:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching backend locations:", error));
  }, []);

  const handleLineSelect = (e) => {
    setSelectedMRT(e.target.value);
  };

  const memoizedFilterPanel = useMemo(
    () => <FilterPanel onLineSelect={handleLineSelect} />,
    [] // 因為 handleLineSelect 為簡單函數，不需要額外依賴
  );

  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mrtRoutes}
        mrtStations={mrtStations}
        taipeiDistricts={taipeiDistricts}
        selectedMRT={selectedMRT}
        dbLocations={dbLocations} // 將後端場地資料傳入 MapView 進行渲染
      />
    ),
    [mrtRoutes, mrtStations, taipeiDistricts, selectedMRT, dbLocations]
  );

  if (isLoading) {
    return <div>Loading map data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="map-page-wrapper">
      <div className="map-content">
        <div className="map-page">
          {memoizedFilterPanel}
          {memoizedMapView}
        </div>
      </div>
    </div>
  );
}
