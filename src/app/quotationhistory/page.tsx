"use client";
import React from "react";
import '@/css/input1.css';
import '@/css/output1.css';
import '@/css/input1.css';
import '@/css/output.css';
import  QuotationHistory from"@/components/QuotationHistory/QuotationHistory";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const CustomerProfile = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  
  return (
      <>
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div>
          <QuotationHistory  page={page}/>
      </div>
      </ProtectedRoute>
     </>
  );
}
 
export default CustomerProfile;