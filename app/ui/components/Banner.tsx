import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Banner() {
  return (
    <div className="relative w-full h-[550px]">
      <div className="z-50 absolute top-0 bottom-0 p-2 w-full">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-white font-bold text-7xl">NIKE IT AIR</h1>
          <p className="text-2xl text-white font-semibold">
            Nouvelle collection, foncez !
          </p>
          <Button variant="outline" className="text-lg w-fit mt-4">
            Achetez
          </Button>
        </div>
      </div>
      <Image
        alt="Banner"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/h_1358,c_limit/8abbba21-df3f-4bd7-92d0-06a52f913e20/nike-just-do-it.jpg"
      />
    </div>
  )
}
