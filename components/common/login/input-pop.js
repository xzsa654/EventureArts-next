'use client'

import React, { useState, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  useDisclosure,
  Alert,
} from '@heroui/react'
// 預設 pop 內容
const InitialPop = ({ popTitle, popContent }) => {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <Alert
      className="w-full text-blue-400"
      isVisible={isVisible}
      title={popTitle}
      variant="faded"
    >
      <div>{popContent}</div>
    </Alert>
  )
}

export default function InputPop({
  label = '',
  className = '',
  isPop = true,
  type = '',
  name = '',
  popContent = '',
  popTitle = '',
  validateItem = () => {},
  realTimeValid = false,
  onChange = () => {},
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const errors = []
  const [password, setPassword] = React.useState('')
  if (realTimeValid) {
    if (password.length < 8) {
      errors.push('密碼至少需要八位元')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('密碼至少需要包含一個大寫英文字母')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('密碼至少需要包含一個小寫英文字母')
    }
  }

  return (
    <>
      <div className={className}>
        {realTimeValid ? (
          <Input
            isInvalid={errors.length > 0}
            label={label}
            type={type}
            name={name}
            value={password}
            onValueChange={setPassword}
            onChange={onChange}
            onClick={onOpen}
            errorMessage={() => (
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
            variant="underlined"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white ',
              errorMessage: 'text-red-500',
            }}
          />
        ) : (
          <Input
            label={label}
            type={type}
            validate={(value) => validateItem(value)}
            name={name}
            value={password}
            onValueChange={setPassword}
            onChange={onChange}
            onClick={onOpen}
            variant="underlined"
            classNames={{
              label:
                'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
              input:
                'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white ',
              errorMessage: 'text-red-500',
            }}
          />
        )}
        {isPop && (
          <Popover
            showArrow
            placement="bottom"
            isOpen={isOpen}
            classNames={{ content: 'px-0 py-0' }}
            onOpenChange={onOpenChange}
          >
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
            <PopoverContent>
              <InitialPop popTitle={popTitle} popContent={popContent} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  )
}
