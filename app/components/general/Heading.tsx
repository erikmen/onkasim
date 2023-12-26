interface HeadingProps {
    center?: boolean
    text:String 
}

const Heading:React.FC<HeadingProps> = ({center,text}) => {
  return (
    <div  className={`text-slite-500 my-3 md:my-10 px-3 md:px-5 md:text-xl${center ? "text-center" : "text-start"} `}>{text}</div>

  )
}

export default Heading