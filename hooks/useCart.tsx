"use client"
import { cardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps{
    productCartQty: number 
    cartPrdcts:cardProductProps[] | null
    addToBasket: (product: cardProductProps) => void
    removeFromCart: (product: cardProductProps) => void
    addToBasketIncrease: (product: cardProductProps) => void
    addToBasketDecrease: (product: cardProductProps) => void
    removeCart: () => void
}

useEffect(() => {
    let getItem: any = localStorage.getItem('cart')
    let  getItemParse: cardProductProps[] | null = JSON.parse(getItem)
    setCartPrdcts(getItemParse)
}, [])

const CartContext = createContext<CartContextProps | null>(null)


interface Props{
    [propname: string] : any
}

export const CartContextProvider = (props : Props) => {

    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<cardProductProps[] | null>(null)

    const addToBasketIncrease = useCallback((product: cardProductProps ) => {
        let updatedCart;
        if (product.quantity == 10) {
            return toast.error("Daha fazla ürün ekleyemezsin!")
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts]
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)
            if (existingItem > -1) {
                updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    },[cartPrdcts])

    const addToBasketDecrease = useCallback((product: cardProductProps ) => {
        let updatedCart;
        if (product.quantity == 1) {
            return toast.error("Daha az ürün ekleyemezsin!")
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts]
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)
            if (existingItem > -1) {
                updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    },[cartPrdcts])
    
    const removeCart = useCallback(() =>{
        setCartPrdcts(null)
        toast.success('Sepet Temizlendi!')
        localStorage.setItem('cart', JSON.stringify(null))
    },[])

    const addToBasket = useCallback((product: cardProductProps ) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if(prev){
                updatedCart = [...prev,product]

            }else{
                updatedCart
            }
            toast.success('Ürün Sepete Eklendi!')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
    },[cartPrdcts])

    const removeFromCart = useCallback((product: cardProductProps ) => {
        if (cartPrdcts) {
            const filtredProducts = cartPrdcts.filter(cart => cart.id !== product.id )
            setCartPrdcts(filtredProducts)

            toast.success('Ürün Sepeten Silindi...')
            localStorage.setItem('cart', JSON.stringify(filtredProducts))
        }
    },[cartPrdcts])

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return(
        <CartContext.Provider value={value} {...props} />
    )
}



const useCart = () => {
    const context = useContext(CartContext)

  if(context == null){
    throw new Error("Bir hata durumu mevcut")
    }
  return context
}

export default useCart