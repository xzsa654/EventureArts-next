'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User, ScrollShadow, Badge } from '@heroui/react'

export default function ChatList({ chatHandle = () => {}, filterValue = '' }) {
  const { getAuthHeader, auth, onlineUsers, socket } = useAuth()
  const [data, setData] = useState(null)
  const [filterData, setFilterData] = useState([])
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

  useEffect(() => {
    if (!filterValue.length) return setFilterData(data)

    const nextData = data?.filter((v) => {
      return v.name?.includes(filterValue) || v.brandname?.includes(filterValue)
    })
    setFilterData(nextData)
  }, [data, filterValue])

  useEffect(() => {
    if (socket && data) {
      socket.on('newMessage', (message) => {
        const nextData = data?.map((v) => {
          if (message.sender_id == v.id) {
            return {
              ...v,
              text: message.text,
              unread_count: ++v.unread_count,
            }
          } else return v
        })
        setFilterData(nextData)
      })
    }
  }, [socket, data])

  return (
    <>
      <div className="flex w-full h-full ">
        <ScrollShadow className="h-[680px] w-full ">
          <ul className="flex flex-col gap-5 pt-2 ps-2">
            {filterData?.map((v) => {
              return (
                <div
                  key={v.id}
                  className="flex items-center pe-5 hover:bg-gray-400 hover:rounded-full"
                >
                  <Badge
                    content=""
                    color={
                      onlineUsers?.includes(`${v.id.toString()}`)
                        ? 'success'
                        : 'primary'
                    }
                    shape="circle"
                    placement="bottom-left"
                    classNames={{
                      base: 'w-full flex shrink ',
                    }}
                  >
                    <User
                      className=" flex   justify-normal w-full  cursor-pointer "
                      avatarProps={{
                        src: `http://localhost:3001/uploads/avatar/${v.avatar}`,
                      }}
                      name={`${v.name} ${
                        v.brandname ? `(${v.brandname})` : ''
                      } `}
                      description={
                        <div
                          className={` flex-grow flex justify-end ${
                            !!v.unread_count && 'text-black font-medium'
                          } `}
                        >
                          {!v.text ? '傳送了一張圖片' : v.text}
                        </div>
                      }
                      onClick={() => {
                        chatHandle(v.id)
                      }}
                    />
                  </Badge>
                  {!!v.unread_count && (
                    <div className=" rounded-full bg-red-200 w-[30px] h-[30px]  flex justify-center items-center ">
                      <div className=" tracking-wider text-white ">
                        {v.unread_count}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </ul>
        </ScrollShadow>
      </div>
    </>
  )
}
