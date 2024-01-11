"use client"

import Image from "next/image"
import ShoppingCartButton from "./ShoppingCartButton"
import { useToast } from "@/components/ui/use-toast"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "@/components/ui/button"
import { BadgeEuroIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { Product } from "@prisma/client"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem, checkoutSingleItem } = useShoppingCart()
  const { toast } = useToast()
  const handleAddToCart = (event: any, product: Product) => {
    event.preventDefault()
    const storeProduct = {
      name: product.name,
      price: product.price,
      currency: "EUR",
      image: product.image,
      price_id: product.price_id ?? "",
    }
    addItem(storeProduct)
    toast({
      description: `${product.name} has been added to shopping cart!`,
      variant: "success",
    })
  }
  const buyNow = (event: any) => {
    event.preventDefault()
    checkoutSingleItem(product.price_id ?? "")
  }
  return (
    <Link className="w-full relative" href={`product/${product.id}`}>
      <div className="w-full relative h-[300px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col mt-1">
          <span className="font-semibold text-lg">{product.name}</span>
          <span className="text-gray-400 text-sm">
            Chaussures pour {product.category === "men" ? "Hommes" : "Femmes"}
          </span>
          <span className="font-bold mt-1">{product.price}€</span>
        </div>
        <div className="m-4 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(event) => buyNow(event)}
                >
                  <BadgeEuroIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Checkout directly</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ShoppingCartButton
                  onClick={(event: any) => handleAddToCart(event, product)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Link>
  )
}
