'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User, ScrollShadow } from '@heroui/react'
import { useRouter } from 'next/navigation'
export default function ChatList({ chatHandle = () => {} }) {
  const { getAuthHeader, auth } = useAuth()
  const [data, setData] = useState()
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
        <ScrollShadow className="h-[680px] w-full ">
          <ul className="flex flex-col gap-5 pt-2 ps-2">
            {data?.map((v) => {
              return (
                <User
                  className=" justify-start w-full hover:bg-gray-400 cursor-pointer "
                  key={v.id}
                  avatarProps={{
                    src: `http://localhost:3001/uploads/avatar/${v.avatar}`,
                  }}
                  name={v.name}
                  description={v.text}
                  onClick={() => {
                    chatHandle(v.id)
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
