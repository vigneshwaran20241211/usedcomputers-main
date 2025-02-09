'use client';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewCategory from "@/components/SuperAdminSidebar/Category/ViewCategory";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const ViewpageCategory = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewCategory page={page} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCategory;