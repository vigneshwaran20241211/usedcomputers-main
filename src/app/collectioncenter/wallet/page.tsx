"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";
import Wallet from "@/components/CollectionCenter/wallet/Wallet";

const WasteDisposal = () => {
   const searchParams = useSearchParams();
    const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
    <Wallet />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default WasteDisposal;