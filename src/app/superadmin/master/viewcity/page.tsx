import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewCity from "@/components/SuperAdminSidebar/City/ViewCities";
import ProtectedRoute from "@/components/ProtectedRoute";

const CountryViewPage = () => {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewCity />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default CountryViewPage;