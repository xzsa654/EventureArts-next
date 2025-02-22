'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Button, ScrollShadow } from '@heroui/react'
import ComponentsCard from './_components/card'
import { today, getLocalTimeZone } from '@internationalized/date'
import { CALENDAR } from '@/lib/authorization-api'
export default function CalendarPage(props) {
  const [date, setDate] = useState()
  const [cards, setcards] = useState([])
  useEffect(() => {
    // 如果沒有 - 初次渲染
    if (!date) {
      fetch(CALENDAR)
        .then((r) => r.json())
        .then((res) => {
          setcards(res)
        })
    }
  }, [date])
  return (
    <>
      <div className=" mt-20 h-screen container mx-auto flex">
        <div className=" relative bg-primary w-1/3 h-full pt-10 pb-5 flex flex-col px-10  gap-18 ">
          {/* title */}
          <div
            className="relative text-white text-6xl text-center
              after:absolute after:content-['']
              after:w-9/12 after:h-4
              after:border-t after:border-white
              after:-bottom-10 after:left-10"
          >
            February
          </div>
          <div className="gap-10 pt-16 relative grow flex justify-center  ">
            <div className="flex flex-col items-center gap-2">
              <Calendar
                minValue={today(getLocalTimeZone())}
                className=" h-[300px]"
                value={date}
                onChange={setDate}
              />
              <Button
                onPress={() => {
                  window.location.reload()
                }}
                className="w-1/3"
              >
                重設
              </Button>
            </div>

            <div
              className="tracking-[.5em] text-white rotate-180 text-5xl"
              style={{ writingMode: 'vertical-lr' }}
            >
              EVENT CALENDAR
            </div>
          </div>
        </div>
        <div className="flex-auto  bg-black p-5 ">
          <ScrollShadow className="w-full h-[800px] ">
            {cards.map((card) => (
              <ComponentsCard
                key={card.c_id}
                title={card.c_name}
                start={card.c_startdate}
                end={card.c_enddate}
              />
            ))}
          </ScrollShadow>
        </div>
      </div>
    </>
  )
}
