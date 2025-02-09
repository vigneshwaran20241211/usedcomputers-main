"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCity from "@/components/SuperAdminSidebar/City/AddCities";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";


const AddCities = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <DefaultLayout>
      <AddCity id={id} />
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default AddCities;