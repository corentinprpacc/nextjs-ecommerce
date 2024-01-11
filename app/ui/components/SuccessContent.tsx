"use client"

import { buttonVariants } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function SucessContent() {
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <span className="text-4xl">Payment Succeed!</span>
      <CheckIcon className="p-2 bg-green-500 rounded-full text-white h-16 w-16 mt-10" />
      <div className="mt-5">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Go back to home page
        </Link>
      </div>
    </div>
  )
}
