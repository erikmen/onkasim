import Image from 'next/image'
import Category from './home/Category'
import Banner from './home/Banner'
import Products from './home/Products'

export default function Home() {

  
  return (
    <main className="">
      <div className=''>
        <Category/>
        <Banner/>
        <Products/>
      </div>
    </main>
  )
}
