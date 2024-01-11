"use client"

import { ReactNode } from "react"
import { CartProvider as USCProvider } from "use-shopping-cart"

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey as string}
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000/error"
      currency="EUR"
      shouldPersist
      language="fr-FR"
    >
      {children}
    </USCProvider>
  )
}
