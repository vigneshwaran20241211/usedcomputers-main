import Superadmin from "@/components/Dashboard/Superadmin";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ProtectedRoute from "@/components/ProtectedRoute";
const SuperAdminDashboard = () => {
    return ( 
        <>
      <ProtectedRoute allowedRoles={["CC"]}>
      <DefaultLayout>
        <h1>Collection Agent</h1>
      </DefaultLayout>
      </ProtectedRoute>
    </>
     );
}
 
export default SuperAdminDashboard;