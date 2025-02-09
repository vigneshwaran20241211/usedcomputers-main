"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wastecollectionsummery from "@/components/FacilityCenter/reports/WasteCollectionSummery";

const WastecollectionSummery = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <Wastecollectionsummery />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WastecollectionSummery;