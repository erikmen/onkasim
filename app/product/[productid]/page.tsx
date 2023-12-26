import DetailClient from '@/app/components/detail/DetailClient';
import React from 'react'

type DetailProps = {
    productId? : string
}
const Detail= ({params} : {params : DetailProps}) => {
    
    const {productId} = params;
   // const product = prodcut.find(product => product.id == productId)
    console.log("params", params)
  return (
    <div>
        <DetailClient/>
    </div>
  )
}

export default Detail