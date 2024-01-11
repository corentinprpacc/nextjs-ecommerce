import { auth } from "@/auth"
import Provider from "../ui/components/SessionProvider"
import Navbar from "../ui/components/Navbar"

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <Provider session={session}>
      <Navbar />
      {children}
    </Provider>
  )
}
