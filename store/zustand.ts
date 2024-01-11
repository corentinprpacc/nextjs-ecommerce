import { Product } from "@/lib/types"
import { create } from "zustand"

type ProductCard = Product & {
  quantity: number
}

type CartStore = {
  cart: ProductCard[]
  add: (product: Product) => void
  remove: (productTitle: string) => void
  //   removeAll: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]") as ProductCard[],
  add: (product: Product) => {
    const productCard = { ...product }
    set((state) => {
      const productExistsIndex = state.cart.findIndex(
        (p) => p.title === productCard.title,
      )
      if (productExistsIndex >= 0) {
        const cart = [...state.cart]
        cart[productExistsIndex].quantity += 1
        localStorage.setItem("cart", JSON.stringify(cart))
        return { cart }
      } else {
        const cartLocalStorage = [
          ...state.cart,
          { ...productCard, quantity: 1 },
        ]
        localStorage.setItem("cart", JSON.stringify(cartLocalStorage))
        return {
          cart: [...state.cart, { ...productCard, quantity: 1 }],
        }
      }
    })
  },
  remove(productTitle: string) {
    set((state) => {
      const cart = [...state.cart].filter((p) => p.title !== productTitle)
      localStorage.setItem("cart", JSON.stringify(cart))
      return {
        cart,
      }
    })
  },
}))
