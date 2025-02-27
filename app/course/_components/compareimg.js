'use client'

import React, { useState, useEffect } from 'react'
import ReactCompareImage from 'react-compare-image';

export default function Compareimg(props) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-[60%]">
          <ReactCompareImage 
            leftImage="/Blair/event/FlowerShop-before.png" 
            rightImage="/Blair/event/FlowerShop-after2.png" 
          />
        </div>
      </div>
    );
  }
