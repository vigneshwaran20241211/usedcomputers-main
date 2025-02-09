import SuperAdmin from "@/components/Dashboard/Superadmin";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ProtectedRoute from "@/components/ProtectedRoute";
const SuperAdminDashboard = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <DefaultLayout>
          <SuperAdmin />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default SuperAdminDashboard;
