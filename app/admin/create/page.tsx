import { getCurrentUser } from "@/app/action/getCurrentUser"
import WarningText from "@/app/components/WarningText";
import CreateForms from "@/app/components/admin/CreateForms";
import AuthContainers from "@/app/components/containers/AuthConteiners";


const CreateProduct = async() => {
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN"){
    <WarningText text="Buraya girişin yasaklı..."/>
  }
  return (
    <AuthContainers>
      <CreateForms/>
    </AuthContainers>
  )
}

export default CreateProduct