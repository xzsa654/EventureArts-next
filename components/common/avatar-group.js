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
import {
  CiUser,
  CiLogout,
  CiShoppingCart,
  CiStar,
  CiChat1,
} from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import MessageDrawer from './message-drawer.js/message'
import { useModal } from '@/contexts/modal-context'
import { useEffect, useState } from 'react'
import { MdShortcut } from 'react-icons/md'
export default function AVatarGroup() {
  const router = useRouter()
  const { auth, logOut, socket } = useAuth()
  const { isOpen, onOpenChange } = useModal().message
  const [unread, setUnread] = useState(0)
  const [rerender, setRerender] = useState(false)
  useEffect(() => {
    if (socket) {
      socket.emit('getUnReadCount', auth.user_id)
      socket.on('unreadCount', ({ unread }) => {
        setUnread(unread)
      })
      socket.on('newMessage', (data) => {
        setUnread((prev) => {
          prev + 1
        })
      })
    }
  }, [socket, rerender, unread, auth.user_id])
  useEffect(() => {
    socket?.on('reRender', () => {
      setRerender(!rerender)
    })
    return () => {
      socket?.off('reRender')
    }
  }, [socket, rerender])
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
            // as="button"
            avatarProps={{
              isBordered: true,
              key: auth.avatar, // 強制重新渲染
              src: `http://localhost:3001/uploads/avatar/${auth?.avatar}`,
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
              onPress={() => {
                router.push('/user/c/myticket')
              }}
              key="tickets"
              startContent=<CiShoppingCart size={20} />
            >
              我的訂單
            </DropdownItem>
            <DropdownItem
              key="message"
              onPress={onOpenChange}
              startContent=<CiChat1 size={20} />
              endContent={
                !!unread && (
                  <div className=" rounded-full w-6 h-6 flex justify-center items-center text-white text-center bg-red-400 ">
                    {unread}
                  </div>
                )
              }
            >
              我的訊息
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
      <MessageDrawer {...{ onOpenChange, isOpen }} />
    </div>
  )
}
