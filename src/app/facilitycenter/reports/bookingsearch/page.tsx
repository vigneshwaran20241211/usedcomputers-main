"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSearch from "@/components/FacilityCenter/reports/BookingSearch";

const WasteDisposal = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
    <BookingSearch />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteDisposal;