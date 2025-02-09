"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import DocumentPage from "@/components/CollectionCenter/ebilling/Document";

const Document = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <DocumentPage />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default Document;