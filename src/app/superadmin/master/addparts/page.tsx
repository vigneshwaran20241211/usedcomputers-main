"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddParts from "@/components/SuperAdminSidebar/Parts/AddParts";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";


const AddtheParts = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DefaultLayout>
        <AddParts id={id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddtheParts;
