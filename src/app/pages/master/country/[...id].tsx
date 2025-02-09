import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCountry from "@/components/SuperAdminSidebar/Country/AddCountry";
import ProtectedRoute from "@/components/ProtectedRoute";

const CollectionAgentAdd = () => {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <AddCountry />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default CollectionAgentAdd;