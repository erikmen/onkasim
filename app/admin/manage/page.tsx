import getProducts from "@/app/action/gertProducts";
import { getCurrentUser } from "@/app/action/getCurrentUser";
import WarningText from "@/app/components/WarningText"
import ManageClient from "@/app/components/admin/ManageClient";
import AuthContainers from "@/app/components/containers/AuthConteiners";


const Manage = async() => {
    const product = await getProducts({category:null});
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
        <WarningText text="Buraya girişin yasaklı..." />
    }
    return (
        <div>
            <div className="w-full m-2 first:">
                <ManageClient product={product}/>
            </div>
        </div>
    )
}

export default Manage