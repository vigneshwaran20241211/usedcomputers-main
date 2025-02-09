import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ViewUsers from "@/components/SuperAdminSidebar/Users/ViewUsers";

const ViewUsersView = () => {
  return (
  <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewUsers />
    </DefaultLayout>
    </ProtectedRoute>
  );
};
export default ViewUsersView;
