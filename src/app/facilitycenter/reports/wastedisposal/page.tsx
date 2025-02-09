"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wasteddisposal from "@/components/FacilityCenter/reports/WasteDisposal";

const WasteDisposal = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <Wasteddisposal />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteDisposal;