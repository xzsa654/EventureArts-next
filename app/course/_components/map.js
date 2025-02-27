import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ address }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else {
            console.error("地址轉換失敗");
          }
        })
        .catch(error => console.error("地理編碼錯誤:", error));
    }
  }, [address]);

  const customIcon = L.icon({
    iconUrl: "https://icons.iconarchive.com/icons/steve/zondicons/512/Location-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div>
      {position ? (
        <MapContainer center={position} zoom={15} style={{ height: "500px", width: "660px" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>地圖加載中...</p>
      )}
    </div>
  );
};

export default Map;