'use client';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewParts from "@/components/SuperAdminSidebar/Parts/ViewParts";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const ViewtheParts = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewParts page={page} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewtheParts;