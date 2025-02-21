"use client"; 

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function LayoutClient({ children }) {
  const [currentPath, setCurrentPath] = useState(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  if (currentPath === null) return null; // 🚀 避免 SSR 時執行錯誤

  // 判斷條件 (可按照需求更改)
  const isOnlineDetail = currentPath.startsWith('/exhibit/online-detail');
  const isMap = currentPath.startsWith('/map');

  return (
    <>
      {/* 如果不是 online-detail 路徑，就顯示 Header */}
      {!isOnlineDetail && <Header />}

      {/* 這裡放入子頁面 */}
      {children}

      {/* 如果不是 online-detail && 不是 map，就顯示 Footer */}
      {!isOnlineDetail && !isMap && <Footer />}
    </>
  );
}
