"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCertificate from "@/components/SuperAdminSidebar/Certificate/AddCertificate";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";


const AddpageCertificate = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DefaultLayout>
        <AddCertificate id={id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddpageCertificate;
