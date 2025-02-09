"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import AddCertificate from "@/components/facilitycenter/certificate/AddCertificate";

const ProductAdd = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <AddCertificate/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ProductAdd;