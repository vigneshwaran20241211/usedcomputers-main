"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Consignmentstatus from "@/components/collectioncenter/reports/ConsignmentStatus";

const ConsignmentStatus = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Consignmentstatus />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ConsignmentStatus;