"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCountry from "@/components/SuperAdminSidebar/Country/AddCountry";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";


const CollectionAgentAdd = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DefaultLayout>
        <AddCountry id={id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CollectionAgentAdd;
