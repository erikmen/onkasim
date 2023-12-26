import Heading from "../components/general/Heading"
import ProductCard from "./ProductCard"


const Products = () => {
  return (
    <div>
        <Heading text={"Tüm Ürünler"}/>
        <div className="flex items-center gap-3  px-3 md:px-10 md:gap-10 flex-wrap">
          {/*//products.map(product => ())*/}
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
    </div>
  )
}

export default Products