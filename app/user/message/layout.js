'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User, ScrollShadow } from '@heroui/react'
import { useRouter } from 'next/navigation'
export default function MessageLayout({ children }) {
  const { getAuthHeader, auth } = useAuth()
  const [data, setData] = useState()
  const router = useRouter()
  useEffect(() => {
    if (auth?.token) {
      fetch('http://localhost:3001/message', {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((r) => r.json())
        .then((res) => {
          setData(res.data)
        })
    }
  }, [auth?.token])
  return (
    <>
      <div className="flex w-full h-full ">
        <div className="flex-auto flex flex-col relative  border-r-1 border-black">
          {children}
        </div>
        <ScrollShadow className="h-[680px] w-[200px] ">
          <ul className="flex flex-col gap-5 pt-2 ps-2">
            {data?.map((v, i) => {
              return (
                <User
                  className=" justify-start"
                  key={v.id}
                  avatarProps={{
                    src: `http://localhost:3001/uploads/avatar/${v.avatar}`,
                  }}
                  name={v.name}
                  description={v.text}
                  onClick={() => {
                    router.push(`/user/message/t/${v.id}`)
                  }}
                />
              )
            })}
          </ul>
        </ScrollShadow>
      </div>
    </>
  )
}
