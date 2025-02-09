import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import PaymentStatus from "@/components/facilitycenter/ebilling/PaymentStatus";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewPaymentStatus = () => {
  return (
    <ProtectedRoute allowedRoles={["FC"]}>
    <DefaultLayout>
     
	  <PaymentStatus/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewPaymentStatus;