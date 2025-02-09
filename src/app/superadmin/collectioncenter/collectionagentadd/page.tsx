import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCollectionAgent from "@/components/SuperAdminSidebar/CollectionAgent/AddCollectionAgent";

const CollectionAgentAdd = () => {
  return (
    <DefaultLayout>
      <AddCollectionAgent />
    </DefaultLayout>
    );
}
 
export default CollectionAgentAdd;