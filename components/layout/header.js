'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from '@/public/Yao/header'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar'
import { Button, Link } from '@heroui/react'
export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <Navbar
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
        className="w-full h-[80] flex justify-between px-16 py-4"
        height={'5rem'}
        maxWidth="full"
      >
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-4 font-cn gap-8 "
          justify="center"
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarItem
            isActive
            className={` hover:border-b-2 border-primary  w-auto h-auto p-2`}
          >
            <Link color="primary" href="#" className=" text-xl ">
              Exhibit
            </Link>
          </NavbarItem>
          <NavbarItem className="hover:border-b-2 border-primary  w-auto h-auto p-2">
            <Link
              color="primary"
              aria-current="page"
              className=" text-xl "
              href="#"
            >
              Course
            </Link>
          </NavbarItem>
          <NavbarItem className="hover:border-b-2 border-primary  w-auto h-auto p-2">
            <Link color="primary" className=" text-xl" href="#">
              Map
            </Link>
          </NavbarItem>
          <NavbarItem className="hover:border-b-2 border-primary  w-auto h-auto p-2">
            <Link color="primary" href="#" className="text-xl">
              Event
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarMenu>
            <Link>123</Link>
          </NavbarMenu>
        </NavbarContent>
      </Navbar>
    </>
  )
}
