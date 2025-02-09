"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wasteddisposal from "@/components/CollectionCenter/reports/WasteDisposal";

const WasteDisposal = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Wasteddisposal />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteDisposal;