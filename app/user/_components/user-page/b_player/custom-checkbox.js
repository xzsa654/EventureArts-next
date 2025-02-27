'use client'

import React, { useState, useEffect } from 'react'
import {
  useCheckbox,
  CheckboxGroup,
  Chip,
  VisuallyHidden,
  tv,
} from '@heroui/react'
import { CheckIcon } from '@/public/Yao/icons'

export const CustomCheckbox = (props) => {
  const checkbox = tv({
    slots: {
      base: 'border-black py-5 bg-#F7F5F1 text-black hover:bg-default-200',
      content: 'text-black',
    },
    variants: {
      isSelected: {
        true: {
          base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
          content: 'text-primary-foreground pl-1',
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
        },
      },
    },
  })

  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  )
}
