import React from 'react'

const GoogleMap = ({ address }) => {
  // 確保地址存在
  if (!address) return <p>📌 地址載入中...</p>

  // 轉換地址成適合 Google Maps 格式
  const googleMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`

  return (
    <>
      <iframe
        width="700"
        height="500"
        title=" "
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={googleMapSrc}
      />
    </>
  )
}

export default GoogleMap
