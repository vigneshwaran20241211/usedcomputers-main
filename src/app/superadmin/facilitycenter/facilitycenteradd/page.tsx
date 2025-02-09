import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddFacilityCenter from "@/components/SuperAdminSidebar/FacilityCenter/AddFacilityCenter";

const CollectionAgentAdd = () => {
  return (
    <DefaultLayout>
      <AddFacilityCenter />
    </DefaultLayout>
    );
}
 
export default CollectionAgentAdd;