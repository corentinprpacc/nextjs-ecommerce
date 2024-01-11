"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/lib/types"
import { useShoppingCart } from "use-shopping-cart"

export default function ProductDetailsActions({
  product,
}: {
  product: Product
}) {
  const { addItem, checkoutSingleItem } = useShoppingCart()
  const { toast } = useToast()
  const handleAddToCart = (product: Product) => {
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
  const buyNow = () => {
    checkoutSingleItem(product.price_id ?? "")
  }
  return (
    <div className="actions mt-8 flex gap-2">
      <Button variant="outline" onClick={() => handleAddToCart(product)}>
        Add to cart
      </Button>
      <Button onClick={() => buyNow()}>Checkout Now</Button>
    </div>
  )
}
