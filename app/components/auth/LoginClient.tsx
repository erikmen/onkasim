"use client"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import AuthContainers from "../containers/AuthConteiners"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { User } from "@prisma/client"
import { useEffect } from "react"

interface LoginClientProps {
  currentUser: User | null | undefined
}

const LoginClient:React.FC<LoginClientProps> = ({currentUser}) => {

  const router = useRouter();
 
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        signIn('credentials',{
          ...data, 
          redirect:false
        }).then((callback) => {
          if(callback?.ok){
            router.push('/cart')
            router.refresh();
            toast.success('Login işlemi başarılı')
          }

          if (callback?.error) {
            toast.error(callback.error)
            
          }
        })
    }
  
      useEffect(() =>{
        if(currentUser){
          router.push('/cart')
            router.refresh();
        }
      },[])
  
  return (
    <AuthContainers>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md  ">
            <Heading text="Login"  />
            <Input placeholder="Email" type="email"  id="email" register={register} errors={errors} required/>
            <Input placeholder="Password" type="password"  id="password" register={register} errors={errors} required/>
            <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)}/>
            <div className="text-center my-2 text-sm text-red-500">Daha önce Kayıt olmaydıysan <Link className="underline" href="/register">buraya tıkla</Link></div>
            <div className="text-center my-2 font-bold text-lg ">OR</div>
            <Button text="Google ile Giriş Yap" icon={FaGoogle} outline onClick={() => signIn('google')}/>

      </div>
    </AuthContainers>
  )
}

export default LoginClient