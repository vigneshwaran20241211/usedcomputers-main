"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSearch from "@/components/CollectionCenter/reports/BookingSearch";

const WasteDisposal = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <BookingSearch />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteDisposal;