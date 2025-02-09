import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/SuperAdminLaout";
import ViewCollectionAgent from "@/components/SuperAdminSidebar/CollectionAgent/ViewCollectionAgent";

const CollectionAgentView = () => {
  return (
    <DefaultLayout>
      <ViewCollectionAgent />
    </DefaultLayout>
  );
};

export default CollectionAgentView;
