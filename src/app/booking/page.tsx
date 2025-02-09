import Superadmin from "@/components/Dashboard/Superadmin";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import SteperForm from "@/components/Layouts/SteperForm";
import ProtectedRoute from "@/components/ProtectedRoute";
const SuperAdminDashboard = () => {
    return ( 
        <>
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
        <SteperForm/>
      </ProtectedRoute>
    </>
     );
}
 
export default SuperAdminDashboard;