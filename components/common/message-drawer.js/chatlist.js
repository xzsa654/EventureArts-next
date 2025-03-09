'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Image, ScrollShadow, Badge, Avatar } from '@heroui/react'

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
                <button
                  onClick={() => {
                    chatHandle(v.id)
                  }}
                  key={v.id}
                  className="flex  items-center pe-5 hover:bg-gray-400 hover:rounded-full"
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
                      base: 'w-full flex  ',
                    }}
                  >
                    <Image
                      radius="full"
                      width={40}
                      height={40}
                      className="w-60"
                      src={`http://localhost:3001/uploads/avatar/${v.avatar}`}
                      alt="avatar"
                    ></Image>

                    <div className="flex flex-col  ">
                      <div className=" text-start ml-1">{`${v.name} ${
                        v.brandname ? `(${v.brandname})` : ''
                      } `}</div>
                      <div
                        className={` ml-1 w-full h-5 overflow-hidden text-ellipsis ${
                          !!v.unread_count && 'text-black'
                        } text-gray-700 `}
                      >
                        {!v.text ? '傳送了一張圖片' : v.text}
                      </div>
                    </div>
                  </Badge>
                  {!!v.unread_count && (
                    <div className=" rounded-full bg-red-200 w-[30px] h-[30px]  flex justify-center items-center ">
                      <div className=" tracking-wider text-white ">
                        {v.unread_count}
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </ul>
        </ScrollShadow>
      </div>
    </>
  )
}
