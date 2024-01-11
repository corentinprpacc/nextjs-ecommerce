import ProductCard from "../../ui/components/ProductCard"
import { fetchProducts } from "@/lib/actions"

export default async function Home() {
  const productsMen = await fetchProducts("men")
  return (
    <section>
      <div className="mt-10 ml-10">
        <h2 className="text-gray-900 text-2xl font-semibold">
          Chaussures Hommes
        </h2>
        <ul className="mt-4 flex gap-2">
          {productsMen.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard key={product.id} product={product} />
              </li>
            )
          })}
        </ul>
      </div>
      <div className="h-screen text-center text-7xl"></div>
    </section>
  )
}
