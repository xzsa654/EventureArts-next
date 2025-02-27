"use client"

import { Pagination } from "@heroui/react"

export default function PaginationAdapter({ totalPages, onPageChange, currentPage }) {
  return (
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={onPageChange}
      classNames={{
          cursor:
            'bg-transparent text-black outline outline-3 outline-primary ',
          item: 
          '[&[data-hover=true]:not([data-active=true])]:bg-transparent ',
        }}
      radius="none"      
      showControls
      variant="light"
    />
  )
}
