'use client';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewCountry from "@/components/SuperAdminSidebar/Country/ViewCountry";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const CountryViewPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewCountry page={page} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default 
CountryViewPage;