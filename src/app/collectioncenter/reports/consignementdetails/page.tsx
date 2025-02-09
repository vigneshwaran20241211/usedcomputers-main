"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import ConsignementDetails from "@/components/CollectionCenter/reports/ConsignementDetails";

const ConsignementDetail = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <ConsignementDetails/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ConsignementDetail;