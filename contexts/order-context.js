'use client'
import { createContext } from 'react'
import React, { useState, useEffect } from 'react'

const OrderContext = createContext()

export function OrderContextProvider({ children }) {
  const [title,setTitle]=useState('')
  const titleCB=(string)=>{
    setTitle(string)
  }
  return (
    <OrderContext.Provider value={{ titleCB,title }}>{children}</OrderContext.Provider>
  )
}
export default OrderContext
