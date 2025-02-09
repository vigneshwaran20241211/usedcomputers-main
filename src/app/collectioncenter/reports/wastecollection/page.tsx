"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wastecollection from "@/components/CollectionCenter/reports/WasteCollection";

const WasteCollection = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Wastecollection />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteCollection;