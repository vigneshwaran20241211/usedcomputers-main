"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Addcollection from "@/components/collectioncenter/collection/AddCollection";

const ProductAdd = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Addcollection/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ProductAdd;