"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Consignmentstatus from "@/components/FacilityCenter/reports/ConsignmentStatus";

const ConsignmentStatus = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <Consignmentstatus />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ConsignmentStatus;