"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import AddCertificate from "@/components/collectioncenter/certificate/AddCertificate";

const ProductAdd = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <AddCertificate/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ProductAdd;