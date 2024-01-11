"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ShoppingCart from "./ShoppingCart"
import SearchBar from "./SearchBar"
import { useSession } from "next-auth/react"
import { UserIcon } from "lucide-react"
import Image from "next/image"
import { User } from "@prisma/client"
import UserDropdown from "./UserDropdown"
import AuthDropdown from "./AuthDropdown"

export default function Navbar() {
  const links = [
    { href: "/", title: "Home" },
    { href: "/men", title: "Men" },
    { href: "/women", title: "Women" },
  ]
  const pathname = usePathname()
  const { data: session } = useSession()
  return (
    <nav className="flex justify-around items-center text-gray-900 py-2 relative">
      <p className="text-3xl">
        Next<span className="text-violet-600">JS</span>
      </p>
      <ul className="flex items-center gap-10 text-xl">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === link.href
              : pathname.startsWith(link.href)
          return (
            <li key={link.title}>
              <Link
                href={link.href}
                className={`${
                  isActive
                    ? "text-violet-600 hover:text-violet-800 transition duration-300 block"
                    : "hover:text-violet-600 transition duration-300 block"
                } `}
              >
                {link.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <SearchBar />
      <div className="flex items-center gap-10">
        <div className="flex items-center">
          {session?.user ? (
            <UserDropdown user={session.user as User} />
          ) : (
            <AuthDropdown />
          )}
        </div>
        <ShoppingCart />
      </div>
    </nav>
  )
}
