import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ViewCollection from "@/components/collectioncenter/collection/ViewCollection";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewpageCategory = () => {
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
     
	  <ViewCollection/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCategory;