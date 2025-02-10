'use client'

import React, { useState, useEffect } from 'react'
import {
  DefaultLogo,
  WhiteLogo,
  UserIcon,
  RainbowBG,
} from '@/public/Yao/header'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from '@heroui/navbar'
import { Link } from '@heroui/react'
import { usePathname } from 'next/navigation'
export default function Header(props) {
  // 控制menu 開關
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()

  const menuItems = [
    { title: 'Exhibit', href: '' },
    { title: 'Course', href: '' },
    { title: 'Map', href: '' },
    { title: 'Event', href: '' },
  ]
  const qa = [
    { title: '常見問題', href: '' },
    { title: '上架規範', href: '' },
    { title: '了解EventureArts', href: '' },
    { title: '隱私權政策', href: '' },
  ]
  return (
    <>
      {/*開啟 menu 後背景色 */}
      {isMenuOpen && <RainbowBG />}
      <Navbar
        // 滾動收起
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          brand: 'justify-between',
          item: [
            'flex',
            'relative',
            'h-full',
            'items-center',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-primary',
          ],
        }}
        className={`absolute w-full h-[80]  flex justify-between max-lg:px-0 px-16 py-4 bg-white/30 ${
          isMenuOpen ? 'bg-[#3B4163]/50 ' : ''
        }  `}
        height={'5rem'}
        maxWidth="full"
      >
        <NavbarBrand>
          {isMenuOpen ? <WhiteLogo /> : <DefaultLogo />}
        </NavbarBrand>
        <NavbarContent
          className=" max-md:hidden gap-4 font-cn gap-8 "
          justify="center"
        >
          {isMenuOpen ? (
            ''
          ) : (
            <>
              {' '}
              {menuItems.map((item, i) => {
                // 路徑下的 item 保持 active
                if (pathName == item.href) {
                  return (
                    <NavbarItem
                      key={i}
                      isActive
                      className={`w-auto  h-auto p-2`}
                    >
                      <Link
                        color="primary"
                        href={item.href}
                        className=" text-xl "
                      >
                        {item.title}
                      </Link>
                    </NavbarItem>
                  )
                } else {
                  return (
                    <NavbarItem
                      key={i}
                      className={`after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300 w-auto h-auto p-2`}
                    >
                      <Link
                        color="primary"
                        href={item.href}
                        className=" text-xl "
                      >
                        {item.title}
                      </Link>
                    </NavbarItem>
                  )
                }
              })}
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">
              {isMenuOpen ? <UserIcon color="#ffffff" /> : <UserIcon />}
            </Link>
          </NavbarItem>
          {/* navbar */}
          <NavbarMenuToggle
            className={`${isMenuOpen && 'text-white '} overflow-hidden`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
          <NavbarMenu className=" overflow-hidden  w-screen bg-[#3B4163]/50 flex justify-center gap   items-center">
            <div className=" w-full   h-3/5 lg:px-16 flex justify-between flex-auto ">
              <div className=" font-serif flex flex-col justify-center  gap-10">
                <ul className=" text-secondary text-16 max-sm:text-12 ">
                  舉辦活動
                  {qa.map((item, i) => {
                    if (i <= 1) {
                      return (
                        <li key={i}>
                          <Link
                            href={item.href}
                            size="sm"
                            className="text-white"
                          >
                            {item.title}
                          </Link>
                        </li>
                      )
                    }
                  })}
                </ul>
                <ul className=" text-secondary  max-sm:text-12 text-16 ">
                  關於我們
                  {qa.map((item, i) => {
                    if (i > 1) {
                      return (
                        <li key={i}>
                          <Link
                            href={item.href}
                            size="sm"
                            className="text-white"
                          >
                            {item.title}
                          </Link>
                        </li>
                      )
                    }
                  })}
                </ul>
                <ul className=" text-secondary text-16 max-sm:text-12  ">
                  聯絡我們
                  <li className="text-white text-12">eventurearts@gmail.com</li>
                </ul>
              </div>
              <ul className="flex flex-col justify-center  gap-[50]">
                {menuItems.map((item, i) => {
                  return (
                    <li key={i} className="p-2 ">
                      <Link
                        className=" text-white sm:text-xl lg:text-4xl font-serif after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* copyright */}
            <p className="  text-white max-sm:text-12 w-full md:text-end">
              © 2025 EventureArts. All Rights Reserved.
            </p>
          </NavbarMenu>
        </NavbarContent>
      </Navbar>
    </>
  )
}
