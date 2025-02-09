'use client';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import StatesView from "@/components/SuperAdminSidebar/States/ViewStates";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";

const CollectionAgentAdd = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DefaultLayout>
        <StatesView page={page} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CollectionAgentAdd;
