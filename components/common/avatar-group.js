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
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
export default function AVatarGroup() {
  const router = useRouter()
  const { auth, logOut } = useAuth()

  return (
    <div>
      <Dropdown
        offset={17}
        classNames={{
          NavbarItem: 'text-16',
        }}
      >
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `http://localhost:3001/uploads/avatar/${auth.avatar}`,
            }}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection title={auth.nickname} showDivider>
            <DropdownItem
              onPress={() => {
                router.push('/user/c/profile')
              }}
              key="profile"
              startContent=<CiUser size={20} />
            >
              個人檔案
            </DropdownItem>

            <DropdownItem
              key="tickets"
              startContent=<CiShoppingCart size={20} />
            >
              我的訂單
            </DropdownItem>
            <DropdownItem key="liked" startContent=<CiStar size={20} />>
              收藏清單
            </DropdownItem>
          </DropdownSection>
          {/* 品牌方會員才會顯示 */}
          {auth.user_role == 'brand' ? (
            <DropdownSection showDivider title="我的品牌">
              <DropdownItem
                onPress={() => {
                  router.push('/user/b/profile')
                }}
                key="brand"
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
          ) : (
            ''
          )}

          <DropdownItem
            key="logout"
            size={'small'}
            onPress={logOut}
            color="warning"
            startContent=<CiLogout size={20} />
          >
            登出
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
