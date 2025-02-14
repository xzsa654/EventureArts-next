'use client'

import React, { useState, useEffect } from 'react'
import Card1 from './card1'
import ParaTitle from './para-title'


export default function NewProduct(props) {
  return (
    <>
    <div className="div">
    <div className="para">
        <ParaTitle title="新鮮出爐" link="#" btn="See more" />
    </div>
    <div className="flex flex-row justify-between gap-4">
        <Card1 />
        <Card1 />
        <Card1 />
    </div>
    </div>
    </>
  )
}
