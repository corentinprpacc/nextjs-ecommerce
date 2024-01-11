import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./ProductCard"
import { Product } from "@/lib/types"

type Props = {
  products: Product[]
}

export default function ProductsCarousel({ products }: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => {
          return (
            <CarouselItem
              key={product.name}
              className="basis-2/6 cursor-pointer"
            >
              <ProductCard product={product} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0" />
      <CarouselNext className="absolute right-0" />
    </Carousel>
  )
}
