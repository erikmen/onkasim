"use client"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { register } from "module"
import Heading from "../general/Heading"
import Input from "../general/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Checkbox from "../general/CheckBox"
import { FaComputer } from "react-icons/fa6";
import { FaTablet, FaMicrophoneAlt } from "react-icons/fa";
import { GiSonicShoes } from "react-icons/gi";
import { MdOutlinePhoneIphone } from "react-icons/md";
import ChoseInput from "../general/ChoseInput"
import { Button, selectClasses } from "@mui/material"
import { useState } from "react"
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import { error } from "console";
import axios from "axios";
import { useRouter } from "next/navigation";



const CreateForms = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);

  const categoryList = [
    {
      name: "Bilgisayar",
      icon: FaComputer
    },
    {
      name: "Ayakkabı2",
      icon: GiSonicShoes
    },
    {
      name: "Tablet",
      icon: FaTablet
    },
    {
      name: "Telefon",
      icon: MdOutlinePhoneIphone
    },
    {
      name: "Mikrofon",
      icon: FaMicrophoneAlt
    },
    {
      name: "Ayakkabı1",
      icon: FaComputer
    },

  ]
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      image: "",
      inStock: false
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const handleChange = async () => {
      toast.success("Yükleme işi başarılı")
      let uploadedImg:string | null ;

      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, 'images/shop.jpg');

        const uploadTask = uploadBytesResumable(storageRef, img);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              reject(error)
              
              },
            
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setUploadedImg(downloadURL);
                resolve()
              }).catch((error)=>{
                console.log(error)
              });
              

            }
          );
        })
      } catch (error) {
        console.log(error)
      }
    }
    await handleChange();

    let newData = {...data , image: uploadedImg}

    axios.post('/api/product', newData)
    .then(()=>{
      toast.success("Ürün ekleme başarılı ")
      router.refresh()
    }).catch(()=>{
      console.log(error,"error")
    })
  }

  const category = watch('category')
  const setCustonValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0])
    }
  }
  return (
    <div>
      <Heading text="Ürün Oluştur" center />

      <Input placeholder="Ad"
        type="text"
        id="name"
        register={register}
        errors={errors}
        required />

      <Input placeholder="Açıklama"
        type="text"
        id="description"
        register={register}
        errors={errors}
        required />

      <Input placeholder="Marka"
        type="text"
        id="brand"
        register={register}
        errors={errors}
        required />

      <Input placeholder="Fiyat"
        type="number"
        id="price"
        register={register}
        errors={errors}
        required />

      <Checkbox
        id="inStock"
        label="Ürün Stokta Mevcut mu? "
        register={register}
      />

      <div className="flex flex-wrap gap-3 ">
        {
          categoryList.map((cat, i) => (
            <ChoseInput key={i} icon={cat.icon} text={cat.name} onClick={(category) => setCustonValue("category", category)} selected={category == cat.name} />
          ))
        }
      </div>
      <input className="mb-2" type="file" onChange={onChangeFunc()} />
      <Button text="Ürün Oluştur " onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

export default CreateForms