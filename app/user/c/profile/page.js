'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { Button, useDisclosure } from '@heroui/react'
import { HiArrowRight } from 'react-icons/hi'
import Image from 'next/image'
import { USERDATA } from '@/lib/user-api'
import EditModal from '../../_components/c_player/edit-modal'
export default function UserPage() {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()

  const [data, setData] = useState({})
  const { isOpen, onOpenChange } = useDisclosure()
  const uploadRef = useRef(null)
  const gender = { male: '男性', female: '女性', 'not provided': '未透露' }
  const [reSend, onReSend] = useState(false)

  useEffect(() => {
    if (auth?.token) {
      fetch(USERDATA, {
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((r) => r.json())
        .then((result) => {
          setData(result)
          onReSend(false)
        })
    }
  }, [auth.token, reSend])

  return (
    <>
      <div className="flex w-full h-[820]">
        {/* 左邊 */}
        <div className=" w-4/5 flex flex-col border-r-1 border-black ">
          {/* 左上方 */}
          <div className="relative p-5 h-3/4 flex items-stretch gap-5 border-b border-black">
            <div className="w-1/2 h-auto flex flex-col justify-center items-center">
              <div className=" max-w-[400px] max-h-[400px] overflow-hidden mb-4 ">
                <Image
                  width={400}
                  height={400}
                  className="w-full h-full object-cover "
                  alt="avatar"
                  src={`http://localhost:3001/uploads/avatar/${data?.avatar}`}
                ></Image>
              </div>
              <div className="flex flex-col gap-4 justify-around ">
                <Button
                  radius="none"
                  className="px-5 text-base bg-primary text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
                >
                  嘗試創意生成
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
                </Button>
                <Button
                  radius="none"
                  className="px-5 text-base bg-primary text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
                  onPress={() => {
                    uploadRef.current.click()
                  }}
                >
                  上傳新大頭貼
                  <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
                </Button>

                <input
                  type="file"
                  ref={uploadRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0]
                    const formData = new FormData()
                    formData.append('avatar', file)
                    fetch('http://localhost:3001/user/avatar', {
                      method: 'POST',
                      headers: {
                        ...getAuthHeader(),
                      },
                      body: formData,
                    }).then(() => {
                      onReSend(true)
                    })
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between h-full p-4 ">
              {/* 讓 info 貼齊上方，與 dl 分開 */}
              <h3 className="text-6xl text-start font-bold pb-4">info</h3>

              {/* 讓 dl 的容器貼齊下方 */}
              <div className="flex flex-col gap-2">
                <dl className="text-base grid grid-cols-2 font-cn">
                  <dt>姓名：</dt>
                  <dd className="break-words w-full">
                    {data?.user_name || '暫無'}
                  </dd>
                </dl>
                <dl className="text-base grid grid-cols-2 font-cn">
                  <dt>暱稱：</dt>
                  <dd className="break-words w-full">{data?.nickname}</dd>
                </dl>
                <dl className="text-base grid grid-cols-2 font-cn">
                  <dt>生日：</dt>
                  <dd className="break-words w-full">{data?.birthday}</dd>
                </dl>
                <dl className="text-base grid grid-cols-2 font-cn">
                  <dt>性別：</dt>
                  <dd className="break-words w-full">{gender[data.gender]}</dd>
                </dl>
                <dl className="text-base grid grid-cols-2 font-cn">
                  <dt>email：</dt>
                  <dd className="break-words w-full">{data?.user_email}</dd>
                </dl>
              </div>
            </div>
          </div>
          {/* 左下方 */}
          <div className="relative h-1/4 p-4 flex items-center justify-between">
            <div className=" w-11/12 self-stretch justify-start items-center">
              <h5 className="font-cn font-semibold text-3xl">興趣</h5>
              <dl className="flex flex-col font-cn text-base">
                <dt className="font-bold">展覽：</dt>
                <dd className="text-12">{data.e_interest}</dd>
                <dt className="font-bold">課程：</dt>
                <dd className="text-12">{data.c_interest}</dd>
              </dl>
            </div>
            <div className=" w-1/12 absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
              <h5 className="text-3xl font-bold -rotate-90">habit</h5>
            </div>
          </div>
        </div>

        {/* 右邊 */}
        <div className=" w-1/5 flex flex-col">
          {/* 右上方*/}
          <div className="h-2/3 p-4 flex flex-col border-b-1 border-black">
            <div className="flex items-center justify-center gap-2 h-5/6">
              <div className="w-1/5">
                <h6 className="font-cn font-semibold text-3xl">個人簡介</h6>
              </div>
              <div className=" w-4/5 font-cn text-12">{data.profile}</div>
            </div>

            {/* 讓 about me 貼齊底部 */}
            <div className="h-1/6 flex justify-center items-end">
              <h6 className="text-3xl text-center font-bold">about me</h6>
            </div>
          </div>

          {/* 右下方 */}
          <div className="h-1/3 p-4 flex flex-col items-center justify-around">
            <svg
              width="160"
              height="96"
              viewBox="0 0 160 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M115.413 46.8267C115.413 46.8267 84.6721 48.3898 82.2381 57.3517C79.417 70.0875 78.0102 93.378 78.0102 93.378C78.0102 93.378 76.7895 70.08 73.9684 57.3517C71.5344 48.3898 40.793 46.8267 40.793 46.8267C40.793 46.8267 71.5344 44.9882 73.9684 36.0263C76.7895 23.2905 78.0102 0 78.0102 0C78.0102 0 79.417 23.298 82.2381 36.0263C84.6721 44.9882 115.413 46.8267 115.413 46.8267Z"
                fill="#231815"
              />
              <path
                d="M121.927 72.7374C121.927 72.7374 106.199 73.519 104.949 77.985C103.505 84.3343 102.79 95.9535 102.79 95.9535C102.79 95.9535 102.165 84.3343 100.721 77.985C99.4776 73.5115 83.7422 72.7374 83.7422 72.7374C83.7422 72.7374 99.4702 71.8219 100.721 67.3484C102.165 60.9991 102.79 49.3799 102.79 49.3799C102.79 49.3799 103.512 60.9991 104.949 67.3484C106.192 71.8219 121.927 72.7374 121.927 72.7374Z"
                fill="#231815"
              />
              <path
                d="M101.627 26.9823C99.1115 26.7367 170.717 15.3035 158.622 34.7532C149.183 49.923 117.995 58.3266 117.995 58.3266C117.995 58.3266 162.954 36.5099 148.551 29.6992C139.991 25.6499 106.726 27.481 101.627 26.9823Z"
                fill="#231815"
              />
              <path
                d="M62.5505 31.5008C65.1854 29.96 -19.253 51.0472 4.08222 65.7034C22.2889 77.1365 60.8459 70.3183 60.8459 70.3183C60.8459 70.3183 0.248846 69.7824 12.5082 55.2007C19.7953 46.5365 57.2209 34.6196 62.543 31.5008H62.5505Z"
                fill="#231815"
              />
            </svg>
            <Button
              radius="none"
              className="px-12 text-base bg-primary text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
              onPress={() => {
                onOpenChange()
              }}
            >
              編輯
              <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
            </Button>
          </div>
        </div>
      </div>
      <EditModal {...{ data, isOpen, onOpenChange, onReSend }} />
    </>
  )
}
