"use client"
import firebaseApp from "@/libs/firebase"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "@prisma/client"
import axios from "axios"
import firebase from "firebase/compat/app"
import { deleteObject, getStorage, ref } from "firebase/storage"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import toast from "react-hot-toast"

interface ManageClientProps {
    products: Product[]
}
const ManageClient: React.FC<ManageClientProps> = ({ product }) => {
    const router = useRouter();
    const stroge = getStorage(firebaseApp)
    let rows: any = []

    if (product) {
        rows = product.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                image: product.image,

            }
        })


    }
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "price", headerName: "Price", width: 100 },
        { field: "category", headerName: "Category", width: 100 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock",
            headerName: "inStock"
            , width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.inStock == true ? "Stokta Mevcut" : "Stockta Mevcut Değil"}
                    </div>
                )
            }
        },
        {
            field: "action",
            headerName: "Action"
            , width: 100,
            renderCell: (params) => {
                return (
                    <button onClick={()=> handleDelete(params.row.id,params.row.image)} className="mx-4 text-red-500 cursor-pointer ">
                        Sil
                    </button>
                )
            }
        },
    ]

    const handleDelete = useCallback(async(id:string, image: any ) =>{
        toast.success("Sildirme işlemi için bekleyin")
        const handleDeleteImg = async() => {
            try {
                const imageRef = ref(stroge, "buraya silinmesi istenilendosya gelmeli ")
                await deleteObject(imageRef)
            } catch (error) {
                return console.log("bir hata mevcut",error)
            }
        }
        await handleDeleteImg();
        axios.delete(`api/product/${@id}`)
        .then(()=>{
            toast.success("sildirme işlemi başarılı ")
            router.refresh();
        }).catch((error: any)=>{
            console.log(error)
        })
    },[])
    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default ManageClient