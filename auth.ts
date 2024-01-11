import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import GithubProvider from "next-auth/providers/github"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } })
    return user
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}

export const {
  signIn,
  signOut,
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        console.log("Invalid credentials.")
        return null
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      //@ts-ignore
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
})
