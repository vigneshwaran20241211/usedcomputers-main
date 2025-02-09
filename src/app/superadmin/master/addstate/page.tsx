"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddStates from "@/components/SuperAdminSidebar/States/AddStates";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";

const AddState = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <AddStates id={id} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
export default  AddState;