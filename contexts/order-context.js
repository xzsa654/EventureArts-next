'use client'
import { createContext, useContext, useState } from 'react';

// 創建 OrderContext
const OrderContext = createContext();

// 提供 Context 的 Provider 組件
export function OrderContextProvider({ children }) {
  const [orderData, setOrderData] = useState(null); // 存放商品明細
  // const [title, setTitle] = useState('')
  // const titleCB = (string) => {
  //   setTitle(string)
  
  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
}
// 提供一個 Hook 來存取訂單資訊
export default OrderContext
