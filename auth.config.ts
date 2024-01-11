import type { NextAuthConfig } from "next-auth"
import { User } from "@prisma/client"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAuthPages =
        nextUrl.pathname.toString() === "/login" ||
        nextUrl.pathname.toString() === "/register"
      if (isLoggedIn && isOnAuthPages) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
    // async signIn({ user, account }) {
    //   if (user && account) {
    //     const { provider } = account
    //     if (provider === "github") {
    //       // user.username = "blabla51"
    //     }
    //     return true
    //   }
    //   return false
    // },
    jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },
    session({ token, session }) {
      session.user = token.user as User
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
