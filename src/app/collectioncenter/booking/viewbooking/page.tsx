import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ViewBooking from "@/components/collectioncenter/booking/ViewBooking";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewpageCategory = () => {
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
     
	  <ViewBooking/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCategory;