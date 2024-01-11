"use client"

import { Input } from "@/components/ui/input"
import { products } from "@/data/products"
import { Product } from "@/lib/types"
import { DeleteIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export default function SearchBar() {
  const [productsSearch, setProductsSearch] = useState<Product[]>()
  const router = useRouter()
  const inputRef = useRef<any>(null)
  const handleChange = useDebouncedCallback((term: string) => {
    // Search For Nike Shoes
    if (term.length >= 3) {
      const filteredProducts = products.filter(
        (p) => p.name.includes(term) || p.category.includes(term),
      )
      setProductsSearch(filteredProducts)
    } else {
      setProductsSearch([])
    }
    return
  }, 300)
  const handleClearSearch = () => {
    setProductsSearch([])
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.value = ""
    }
  }
  const handleClinkOnLink = (event: any, productId: string) => {
    event.preventDefault()
    router.push(`/product/${productId}`)
    handleClearSearch()
  }
  return (
    <div>
      <div className="relative">
        <Input
          ref={inputRef}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Rechercher une paire"
        />
        {productsSearch && productsSearch?.length > 0 ? (
          <DeleteIcon
            className="absolute top-2 text-gray-500 right-2 cursor-pointer"
            onClick={() => handleClearSearch()}
          />
        ) : null}
      </div>
      <div className="absolute top-14 bg-white p-2 z-[100] w-full left-0">
        <ul className="flex flex-col gap-2">
          {productsSearch?.map((product) => {
            return (
              <li
                key={product.id}
                className="flex gap-4 hover:bg-gray-50 transition-all p-2 cursor-pointer"
                onClick={(e) => handleClinkOnLink(e, product.id)}
              >
                <div className="image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="infos flex flex-col">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <span className="text-sm text-gray-600 italic">
                    Chaussures pour{" "}
                    {product.category === "men" ? "Hommes" : "Femmes"}
                  </span>
                  <span className="font-bold">{product.price}€</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
