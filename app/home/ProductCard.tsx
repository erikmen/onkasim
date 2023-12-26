"use client"
import { Rating } from "@mui/material"
import Image from "next/image"
import textClips from "@/utils/TextClips"
import { useRouter } from "next/navigation"



const ProductCard = ({product}:{ product:any}) => {
  const router = useRouter()
  // const productRating = product.review?.reduce((acc : number, item: any) => acc+ item.rating,0) / product?.reviews?.length ratingleri değenlendirme satırı
  return (
    <div onClick={() => router.push(`product/${product.id}`)} className=" w-[240px] cursor-pointer flex flex-col flex-1 shadow-lg p-2 rounded-lg">
        <div className="">
          {/* <Image src={product.image} fill alt="" className="object-contain h-[150px]"/> */}
          eve
        </div>
        <div className="text-center mt-2 space-y-1">
          {/* <div>{textClips(product.name)}</div> */} <div> {textClips("name")} </div>
          <Rating name="read-only" value={4} readOnly />
          {/* <div>{product.price}</div> */}<div className="text-orange-600 font-bold text-lg md:text-xl">price</div>

        </div>
    </div>
  )
}

export default ProductCard