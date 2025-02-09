"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import ConsignementDetails from "@/components/CollectionCenter/reports/ConsignementDetails";

const ConsignementDetail = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <ConsignementDetails/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ConsignementDetail;