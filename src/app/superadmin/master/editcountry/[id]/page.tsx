import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import EditCountry from "@/components/SuperAdminSidebar/Country/EditCountry";
import ProtectedRoute from "@/components/ProtectedRoute";

const CollectionAgentAdd = () => {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <EditCountry />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default CollectionAgentAdd;