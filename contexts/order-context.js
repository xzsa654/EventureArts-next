'use client'
import { createContext, useState } from 'react'

// 創建 OrderContext
const OrderContext = createContext()

// 提供 Context 的 Provider 組件
export function OrderContextProvider({ children }) {
  // const [title, setTitle] = useState('')
  // const titleCB = (string) => {
  //   setTitle(string)

  const [orderData, setOrderData] = useState(null);
  
  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  )
}
export default OrderContext
