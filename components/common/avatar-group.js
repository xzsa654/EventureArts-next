'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  User,
  Image,
} from '@heroui/react'
import { CiUser, CiLogout, CiShoppingCart, CiStar } from 'react-icons/ci'

export default function AVatarGroup() {
  return (
    <div>
      <Dropdown
        placement="bottom-start"
        classNames={{
          NavbarItem: 'text-16',
        }}
      >
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            }}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection title={'nickname'} showDivider>
            <DropdownItem
              key="profile"
              href="/"
              startContent=<CiUser size={20} />
            >
              個人檔案
            </DropdownItem>

            <DropdownItem
              key="tickets"
              href="/"
              startContent=<CiShoppingCart size={20} />
            >
              我的訂單
            </DropdownItem>
            <DropdownItem
              key="liked"
              href="/"
              startContent=<CiStar size={20} />
            >
              收藏清單
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider title="我的品牌">
            <DropdownItem
              key="brand"
              href="/"
              startContent=<Image
                src="/Yao/user/brand.svg"
                width={23}
                alt="brand_svg"
                className="mr-3"
              ></Image>
            >
              Brand
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="logout"
            size={'small'}
            color="danger"
            startContent=<CiLogout size={20} />
          >
            登出
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
