"use client"; 

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function LayoutClient({ children }) {
  // 取得當前路徑
  const pathname = usePathname();

  // 判斷條件 (可按照需求更改)
  const isOnlineDetail = pathname.startsWith('/exhibit/online-detail');
  const isMap = pathname.startsWith('/map');

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
