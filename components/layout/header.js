'use client'

import React, { useState, useEffect } from 'react'
import { HiMenuAlt4, HiOutlineX, HiUser } from 'react-icons/hi'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'
import { Image } from '@heroui/react'
import Link from 'next/link'
import AVatarGroup from '../common/avatar-group'
import { usePathname } from 'next/navigation'
import { useModal } from '@/contexts/modal-context'
import LoginModal from '@/components/common/login/login'
import RegisterStep1 from '@/components/common/login/register'
import RegisterStep2 from '@/components/common/login/register2'
import RegisterStep3 from '@/components/common/login/register3'
import RegisterStep4 from '@/components/common/login/register4'
import VerifyEmail from '../common/login/verify'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { auth } = useAuth()

  const menuVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: '100vh',
      opacity: 1,
      transition: {
        height: {
          duration: 0.1,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.3,
          delay: 0.2,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  // 處理開啟/關閉選單
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // 處理滾動鎖定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const pathName = usePathname()
  const { login } = useModal()
  const { onOpen } = login

  const menuItems = [
    { title: 'Exhibit', href: '/exhibit' },
    { title: 'Course', href: '/course' },
    { title: 'Map', href: '/map' },
    { title: 'Event', href: '/event' },
  ]

  const qa = [
    { title: '常見問題', href: '' },
    { title: '上架規範', href: '' },
    { title: '了解EventureArts', href: '' },
    { title: '隱私權政策', href: '' },
  ]

  // const pathName = usePathname();

  // **黑名單路徑**（這些頁面不渲染 Header）
  const noHeaderPages = ['/exhibit/online-detail/']
  const isHidden = noHeaderPages.some((path) => pathName.startsWith(path))

  // 🚀 **這樣確保 hooks 不會在條件語句內**
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // **先確保 hooks 都執行完，然後 return null**
  if (isHidden) {
    return null
  }

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <Navbar
          shouldHideOnScroll
          classNames={{
            brand: 'justify-between rounded-none',
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
          className={` overflow-hidden fixed w-full h-[80] flex justify-between  max-lg:px-0 px-16 py-4 bg-white/30   `}
          height="5rem"
          maxWidth="full"
        >
          <NavbarBrand className="rounded-none">
            <Link href="/">
              {isOpen ? (
                <Image
                  src="/Yao/white-logo.svg"
                  width={200}
                  alt="logo"
                  radius="none"
                />
              ) : (
                <Image
                  src="/Yao/logo.svg"
                  width={200}
                  alt="logo"
                  radius="none"
                />
              )}
            </Link>
          </NavbarBrand>
          {isOpen ? (
            ''
          ) : (
            <NavbarContent
              className="max-md:hidden gap-4 font-cn gap-8"
              justify="center"
            >
              {menuItems.map((item, i) => {
                if (pathName === item.href) {
                  return (
                    <NavbarItem key={i} isActive className="w-auto h-auto p-2">
                      <Link
                        color="primary"
                        href={item.href}
                        className="text-xl"
                      >
                        {item.title}
                      </Link>
                    </NavbarItem>
                  )
                } else {
                  return (
                    <NavbarItem
                      key={i}
                      className="after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300 w-auto h-auto p-2"
                    >
                      {isOpen ? (
                        <Link
                          color="danger"
                          href={item.href}
                          className="text-xl"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <Link
                          color="primary"
                          href={item.href}
                          className="text-xl"
                        >
                          {item.title}
                        </Link>
                      )}
                    </NavbarItem>
                  )
                }
              })}
            </NavbarContent>
          )}

          <NavbarContent justify="end">
            <NavbarItem
              className={` ${
                isOpen ? 'flex' : 'hidden'
              } lg:flex  justify-center text-small `}
            >
              <Link href="#" onClick={onOpen}>
                {/* 已登入的 component */}
                {auth?.user_id !== 0 ? (
                  <AVatarGroup />
                ) : isOpen ? (
                  // 未登入狀態下的 icon
                  <HiUser size={35} color="white" />
                ) : (
                  <HiUser size={35} />
                )}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" onClick={toggleMenu}>
                {isOpen ? (
                  <HiOutlineX size={35} color="white" />
                ) : (
                  <HiMenuAlt4 size={35} />
                )}
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 left-0 z-30   w-full bg-[url('/Yao/1.jpg')] bg-cover lg:px-16 flex justify-between flex-col overflow-hidden"
            >
              <motion.div
                variants={contentVariants}
                className="flex-auto flex justify-between"
              >
                <div className="font-serif flex flex-col justify-center gap-10">
                  <ul className="text-secondary text-16 max-sm:text-12">
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
                  <ul className="text-secondary max-sm:text-12 text-16">
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
                  <ul className="text-secondary text-16 max-sm:text-12">
                    聯絡我們
                    <li className="text-white text-12">
                      eventurearts@gmail.com
                    </li>
                  </ul>
                </div>

                <ul className="flex flex-col justify-center gap-[50]">
                  {menuItems.map((item, i) => (
                    <li key={i} className="p-2">
                      <Link
                        className="text-white relative sm:text-xl lg:text-4xl font-serif after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={contentVariants}
                className="w-full sm:text-end max-sm:text-center"
              >
                <p className="text-white">
                  © 2025 EventureArts.
                  <br className="md:hidden" />
                  All Rights Reserved.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 未登入才有註冊登入modal */}
        {!auth?.token && (
          <>
            <LoginModal />
            <RegisterStep1 />
            <RegisterStep2 />
            <RegisterStep3 />
            <RegisterStep4 />
            <VerifyEmail />
          </>
        )}
      </div>
    </>
  )
}
