"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCartIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import RemoveProductFromCartButton from "./RemoveProductFromCartButton"
import { useToast } from "@/components/ui/use-toast"
import { useShoppingCart } from "use-shopping-cart"

export default function ShoppingCart() {
  //   const { cart, remove } = useCartStore()
  const { removeItem, cartCount, cartDetails, redirectToCheckout, clearCart } =
    useShoppingCart()
  const { toast } = useToast()
  const handleRemoveProduct = (entry: any) => {
    removeItem(entry.id)
    toast({
      description: `${entry.name} has been removed!`,
      variant: "destructive",
    })
  }
  const handleCheckoutPage = async (event: any) => {
    event.preventDefault()
    try {
      const result = await redirectToCheckout()
    } catch (err) {
      console.error("Error redirecting stripe checkout")
      console.log(cartDetails)
      console.error(err)
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full absolute -right-3 -top-3">
            {cartCount}
          </span>
          <ShoppingCartIcon className="cursor-pointer w-7 h-7" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
          <SheetDescription>
            {cartCount && cartCount > 0
              ? "Consultez vos articles ajoutés ici"
              : "Panier vide..."}
          </SheetDescription>
          {cartCount && cartCount > 0 ? (
            <div>
              <ul className="flex flex-col">
                {Object.values(cartDetails ?? {}).map((entry) => {
                  return (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between first:mt-0 mt-4"
                    >
                      <div className="flex flex-col">
                        <Image
                          src={entry.image as string}
                          width={100}
                          height={50}
                          alt={entry.name}
                          className="rounded-md"
                        />
                        <span>
                          {entry.name}{" "}
                          <span className="text-sm font-semibold">
                            (x{entry.quantity})
                          </span>
                        </span>
                        <span className="font-semibold">{entry.price}€</span>
                      </div>
                      <div>
                        <RemoveProductFromCartButton
                          onClick={() => handleRemoveProduct(entry)}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
          {cartCount && cartCount > 0 ? (
            <div className="flex flex-col justify-center w-full pt-6 gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => handleCheckoutPage(e)}
              >
                Commander ces articles
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => clearCart()}
              >
                Vider mon panier
              </Button>
            </div>
          ) : null}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
