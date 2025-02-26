'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input, Button, Image, button } from '@heroui/react'
import { PiUploadSimple } from 'react-icons/pi'
export default function BPlayerJoinUsFiles({
  logoImg,
  setLogoImg,
  errorMessage,
}) {
  const [bdImg, setBdImg] = useState('')

  const logoRef = useRef()
  const imgRef = useRef()
  const uploadsHandle = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader(file)
      reader.onload = () => {
        if (e.target.name == 'bd_logo') {
          setLogoImg(reader.result)
        } else {
          setBdImg(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      <div className="text-16 text-yellow mb-3">‼️限制(JPG/各檔案最大1mb )</div>
      <div
        className={`mb-2 text-white   ${
          errorMessage
            ? "after:content-['*請上傳品牌LOGO']"
            : "after:content-['*']"
        } after:text-red `}
      >
        品牌LOGO
      </div>
      <span className="text-red mb-2">{errorMessage}</span>
      <div className=" w-full h-1/2 flex items-center gap-5  ">
        <div className=" w-[100px] flex justify-center items-center aspect-square ">
          {logoImg ? (
            <Button
              radius="none"
              className="w-full h-full p-0"
              onPress={() => {
                logoRef.current.click()
              }}
            >
              <Image
                src={logoImg}
                alt="logo"
                width={100}
                height={100}
                radius="none"
              />
            </Button>
          ) : (
            <Button
              isIconOnly
              className="w-full h-full"
              radius="none"
              onPress={() => {
                logoRef?.current?.click()
              }}
            >
              <PiUploadSimple size={20} />
              上傳照片
            </Button>
          )}
          <Input
            isRequired
            name="bd_logo"
            type="file"
            className="hidden"
            onChange={uploadsHandle}
            ref={logoRef}
          ></Input>
        </div>
      </div>
      <div className="text-white my-4">品牌圖片</div>
      <div className=" w-full h-[100px]">
        <Input
          name="bd_img"
          type="file"
          className="hidden"
          onChange={uploadsHandle}
          ref={imgRef}
        ></Input>
        {bdImg ? (
          <Button
            onPress={() => {
              imgRef.current.click()
            }}
            className="w-full h-full p-0 flex-none"
            radius="none"
          >
            <Image
              src={bdImg}
              radius="none"
              alt="bd_img"
              className="w-full h-full"
            />
          </Button>
        ) : (
          <Button
            radius="none"
            onPress={() => {
              imgRef.current.click()
            }}
            isIconOnly
            className="h-full w-full"
          >
            <PiUploadSimple size={20} />
            上傳照片
          </Button>
        )}
      </div>
    </>
  )
}
