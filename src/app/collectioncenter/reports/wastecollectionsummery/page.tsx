"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wastecollectionsummery from "@/components/CollectionCenter/reports/WasteCollectionSummery";

const WastecollectionSummery = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Wastecollectionsummery />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WastecollectionSummery;