"use client";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import AddCategory from "@/components/SuperAdminSidebar/Category/AddCategory";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter, useSearchParams } from "next/navigation";


const AddpageCategory = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DefaultLayout>
        <AddCategory id={id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddpageCategory;
