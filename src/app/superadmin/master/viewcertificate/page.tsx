'use client';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewCertificate from "@/components/SuperAdminSidebar/Certificate/ViewCertificate";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const ViewpageCertificate = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <ViewCertificate page={page} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCertificate;