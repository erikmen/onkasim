import Image from "next/image"

const Banner = () => {
  return (
    <div className="h-[237px] bg-black items-center justify-center">
        <div className="h[137px] relative w-full">
            <Image src={"/audible-banner-ad-example.png"} fill alt="" className="object-cover"/>
        </div>
    </div>
  )
}

export default Banner