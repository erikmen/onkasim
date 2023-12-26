"use client"

import Image from "next/image"
import PageContainers from "../containers/PageContainers"
import Counter from "../general/Counter"
import { useEffect, useState } from "react"
import { Rating } from "@mui/material"
import Button from "../general/Button"
import Comment from "./Comment"
import Heading from "../general/Heading"
import useCart from "@/hooks/useCart"

export type cardProductProps = {
    id:number
    name:string
    description:string
    price:number
    quantity:number
    image:string
    inStock:boolean

}

const DetailClient = ({product} : {product:any}) => {
  const {productCartQty, addToBasket, cartPrdcts} = useCart() ; 
  const [displayButton, setDisplayButton] = useState(false);


  const [cardProduct, setCardProduct] = useState<cardProductProps>({
    id:product.id,
    name:product.name,
    description:product.description,
    price:product.price,
    quantity:1,
    image:product.image,
    inStock:product.inStock,
  });

  useEffect(() =>{
    setDisplayButton(false)
    let controlDisplay:any = cartPrdcts?.findIndex(cart => cart.id == product.id)
    if (controlDisplay > -1) {
      setDisplayButton(true)
    }
  },[])
  const decreaseFunc =  () =>{
    if(cardProduct.quantity == 1)return

    setCardProduct(prev => ({...prev, quantity:prev.quantity  - 1 })) 

  }

  const increaseFunc = () =>{
    if(cardProduct.quantity == 10)return

    setCardProduct(prev => ({...prev, quantity:prev.quantity +1 })) 
  }
  return (

    <div className="my-10">
        <PageContainers>
            <div className="block md:flex gap-10 justify-center">
                <div className="relative h-[200px] md:h-[400px] w-[200px] md:w-[400px] mb-3 md:mb-0">
                    <Image src={product?.image }  fill alt=""/>
                </div>
                <div className="w-1/2">
                  <div className="text-xl md:text-2xl">{product?.name}  Ürünün Adı </div> 
                  <Rating name="read-only" value={4} readOnly />
                  <div className="text-slate-500">{product?.description} Ürünün açıklaması</div> 
                </div>
                <div className="flex items-center gap-2">
                  <div>Stok Durumu : </div>
                  {/* {
                    product.inStock ? <div className=" text-green-500">Ürün Vardır</div> : <div className="text-red-500">Ürün Yoktur</div>
                  } */}
                  <div className=" text-green-500">Ürün stokta mevcut</div>
                </div><div className="text-lg md:text-2xl text-orange-600 font-bold">{product.price} Ürünün Fiyatı </div>
                {
                  displayButton ? <>
                    <Button text="Ürün Sepete Ekli" small  onClick={() => {}}/>
                          
                  </> : <>
                  <Counter decreaseFunc={decreaseFunc()} increaseFunc={increaseFunc()} cardProduct={cardProduct}/>
                    
                    <Button text="Sepete Ekle" small  onClick={() => addToBasket(cardProduct)}/>
                  </>
                }
                    
                <div>

                </div>
            </div>
                  <Heading text={"Yorumlarw"}/>
            <div>
              {
                product?.reviews?.map((prd:any) =>(
                  <Comment key={prd.id} prd={prd}/>
                ))
              }
            </div>
        </PageContainers>
    </div>
  )
}

export default DetailClient