"use client";
import React from "react";
import '@/css/input1.css';
import '@/css/output1.css';
import '@/css/input1.css';
import '@/css/output.css';
import  CusProfile from"@/components/CustomerProfile/CustomerProfile";
import ProtectedRoute from "@/components/ProtectedRoute";


const CustomerProfile = () => {
  return (
      <>
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div>
          < CusProfile/>
      </div>
      </ProtectedRoute>
     </>
  );
}
 
export default CustomerProfile;