"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddProduct from "@/components/SuperAdminSidebar/product/AddProduct";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";

const ProductAdd = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <AddProduct id={id} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ProductAdd;