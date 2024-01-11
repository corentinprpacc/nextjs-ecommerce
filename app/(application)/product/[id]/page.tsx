import ProductDetailsActions from "@/app/ui/components/ProductDetailsActions"
import { fetchProduct } from "@/lib/actions"
import { Product } from "@prisma/client"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ProductDetails({
  params,
}: {
  params: { id: string }
}) {
  const id: string = params.id
  const product: Product | null = await fetchProduct(id)
  if (!product) {
    notFound()
  } else {
    return (
      <div className="flex justify-around gap-4 w-full mt-10">
        <div className="image w-full">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={300}
          />
        </div>
        <div className="infos w-full flex-col flex">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <h2 className="text-gray-600 text-sm italic">
            Chaussures pour {product.category === "men" ? "Hommes" : "Femmes"}
          </h2>
          <p className="font-bold text-lg">{product.price}€</p>
          <ProductDetailsActions product={product} />
        </div>
      </div>
    )
  }
}
