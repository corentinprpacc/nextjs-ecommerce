import { products } from "@/data/products"
import Banner from "./ui/components/Banner"
import ProductsCarousel from "./ui/components/ProductsCarousel"

export default function Home() {
  return (
    <section>
      <Banner />
      <div className="mt-10 ml-10">
        <h2 className="text-gray-900 text-2xl font-semibold">En ce moment</h2>
        <div className="mt-4">
          <ProductsCarousel products={products} />
        </div>
      </div>
      <div className="h-screen text-center text-7xl"></div>
    </section>
  )
}
