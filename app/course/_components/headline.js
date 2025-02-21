'use client'

import React, { useState, useEffect } from 'react'

export default function Headline(props) {
  return (
    <>
    <div className="headlineMain flex flex-row justify-center items-center gap-8">
        {/* Headline左邊 */}
        <div className="headSide flex flex-col text-center basis-1/3">
            <h2>Courses</h2>
            <p>Expolre offline courses in Taipei.</p>
        </div>

        {/* Headline中間 */}
        <div className="headMain flex flex-col text-center px-3 basis-1/3">
            <h2>我的藝術探險夥伴</h2>
            <br />
            <p>說走就走！探索台北線下課程</p>
        </div>

        {/* Headline右邊 */}
        <div className="headSide flex flex-col text-center basis-1/3">
            <h2>EventureArts</h2>
            <p>for Arts and Events adventures.</p>
        </div>

    </div>
    </>
  )
}
