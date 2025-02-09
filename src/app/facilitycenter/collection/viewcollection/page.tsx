import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ViewCollection from "@/components/facilitycenter/collection/ViewCollection";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewpageCategory = () => {
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
     
	  <ViewCollection/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCategory;