import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()
  if (session?.user && (session.user as any).role !== "admin") {
    redirect("/")
  }
  return <div>Admin Page</div>
}
