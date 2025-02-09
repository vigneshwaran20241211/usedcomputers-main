import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewProduct from "@/components/SuperAdminSidebar/product/ViewProduct";
import ProtectedRoute from "@/components/ProtectedRoute";

const CountryViewPage = () => {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewProduct />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default CountryViewPage;