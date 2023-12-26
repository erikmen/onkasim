"use client"
import { usePathname } from "next/navigation";
import AdminSidebarItem from "./AdminSidebarItem"
import { MdOutlineDashboard,MdBorderInner,MdCreate } from "react-icons/md";



const AdminSideBar = () => {
    const pathName = usePathname();
    const adminPanel = [
        {
            name:"Özetler",
            icon:MdOutlineDashboard,
            url:"/admin",

        },
        {
            name:"Ürün Oluştur",
            icon:MdCreate,
            url:"/admin/create",

        },
        {
            name:"Ürünleri Yönet",
            icon:MdCreate,
            url:"/admin/manage",

        },
        {
            name:"Siparişlerim",
            icon:MdBorderInner,
            url:"/admin/order",

        },
    ] 
  return (
    <div className="w-1/5 border-r h-screen p-4 bg-orange-600 ">
        <div className="space-y-4 ">
            {
                adminPanel.map((admin,i)=>(
                    <AdminSidebarItem key={i} selected={pathName== admin.url} icon={admin.icon} name={admin.name} url={admin.url} />
                ))
            }
        </div>
    </div>
  )
}

export default AdminSideBar