import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ViewBooking from "@/components/FacilityCenter/booking/ViewBooking";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewpageCategory = () => {
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
     
	  <ViewBooking/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewpageCategory;