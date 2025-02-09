import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewFacilityCenter from "@/components/SuperAdminSidebar/FacilityCenter/ViewFacilityCenter";

const CollectionAgentView = () => {
  return (
    <DefaultLayout>
      <ViewFacilityCenter />
    </DefaultLayout>
  );
};

export default CollectionAgentView;
