import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import PaymentStatus from "@/components/collectioncenter/ebilling/PaymentStatus";
import ProtectedRoute from "@/components/ProtectedRoute";

const ViewPaymentStatus = () => {
  return (
    <ProtectedRoute allowedRoles={["CC"]}>
    <DefaultLayout>
     
	  <PaymentStatus/>
    </DefaultLayout>
    </ProtectedRoute>
    );
}
 
export default ViewPaymentStatus;