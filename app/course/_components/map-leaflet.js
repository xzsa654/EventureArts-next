import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ latitude, longitude, locat_name, address }) => {
  const [position, setPosition] = useState(null);

// 設置位置
  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);



  const customIcon = L.icon({
    iconUrl: "https://icons.iconarchive.com/icons/steve/zondicons/512/Location-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div>
      {position ? (
        <MapContainer 
        center={position} 
        zoom={17} 
        style={{ height: "500px", width: "660px" }}>

          {/* 地圖樣式&版權聲明 */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>' 
          /> 
          
          <Marker position={position} icon={customIcon}>
            {/* 地圖彈出視窗 */}
            <Popup>
              🗺️ 詳細資訊
                <br />
                <br />
              店名：{locat_name}
                <br/>
                <br/>
              地址：{address}
                <br />
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>地圖加載中...</p>
      )}
    </div>
  );
};

export default Map;