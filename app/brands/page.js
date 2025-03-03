'use client'

import React, { useState, useEffect } from 'react'
import MarqueeExhibit from './_components/Marquee/marquee-exhibit'
import MarqueeCourse from './_components/Marquee/marquee-course'
import EventCard from './_components/event-card'

export default function BrandsPage(props) {
  return (
    <>
      {/* 品牌資訊 */}
      <div>brands</div>
      {/* 展覽區塊 */}
      <div>
        exhibit container
        <div className="m-6">
          <MarqueeExhibit className="custom-marquee-one" />
        </div>
        <div className="bg-blue-300 mx-16 py-4 flex flex-wrap gap-x-8 gap-y-4 justify-center">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
      {/* 課程區塊 */}
      <div>
        <div className="m-6">
          <MarqueeCourse className="custom-marquee-two" />
        </div>
        <div className="bg-green-300 mx-16 py-4 flex flex-wrap gap-x-8 gap-y-4 justify-center">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </>
  )
}
