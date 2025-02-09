"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wastecollection from "@/components/FacilityCenter/reports/WasteCollection";

const WasteCollection = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <Wastecollection />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteCollection;