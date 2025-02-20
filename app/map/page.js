"use client"

import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from "react";
import FilterPanel from "./_components/FilterPanel";
import "./map.css";

// 動態載入 MapView，關閉 SSR
const MapView = dynamic(() => import("./_components/MapView"), {
  ssr: false,
});

// 後端 API Base URL，可自行調整
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export default function Page() {
  // 即時篩選條件
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMRT, setSelectedMRT] = useState("");

  // MRT 路線、車站、行政區 GeoJSON
  const [mrtRoutes, setMrtRoutes] = useState(null);
  const [mrtStations, setMrtStations] = useState(null);
  const [taipeiDistricts, setTaipeiDistricts] = useState(null);
  const [mrtLines, setMrtLines] = useState([]);

  // 後端資料庫座標資訊（例如 real_location）
  const [dbLocations, setDbLocations] = useState([]);

  // 載入資料用
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 一次載入 MRT 路線、車站、行政區 GeoJSON
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

        // 從路線資料中取出所有不重複的路線代號
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

  // 從後端 API 取得資料庫的座標資訊
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

  // FilterPanel 回呼：使用者在選擇「行政區」時即時更新
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  // FilterPanel 回呼：使用者在選擇「地鐵線」時即時更新
  const handleLineSelect = (line) => {
    setSelectedMRT(line);
  };

  // 篩選器面板
  const memoizedFilterPanel = useMemo(
    () => (
      <FilterPanel
        onDistrictSelect={handleDistrictSelect}
        onLineSelect={handleLineSelect}
      />
    ),
    []
  );

  // 地圖面板
  const memoizedMapView = useMemo(
    () => (
      <MapView
        mrtRoutes={mrtRoutes}
        mrtStations={mrtStations}
        taipeiDistricts={taipeiDistricts}
        selectedDistrict={selectedDistrict}
        selectedMRT={selectedMRT}
        dbLocations={dbLocations}
      />
    ),
    [mrtRoutes, mrtStations, taipeiDistricts, selectedDistrict, selectedMRT, dbLocations]
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
