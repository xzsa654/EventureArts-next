"use client"

import { useSearchParams } from "next/navigation"

export default function ExhibitionDetail() {
  const searchParams = useSearchParams()
  const e_id = searchParams.get("e_id")

  // Use e_id to fetch exhibition detail
  // ...

  return (
    <div>
      <h1>Exhibition Detail</h1>
      <p>Showing details for exhibition: {e_id || "Default"}</p>
    </div>
  )
}

