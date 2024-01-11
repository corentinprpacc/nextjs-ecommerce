import type { Metadata, Viewport } from "next"
import "./globals.css"
import { inter } from "./ui/fonts"
import Navbar from "./ui/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import CartProvider from "./ui/components/Providers"

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Next E-Commerce App",
  description: "E-commerce project training",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
