"use client";
import React from "react";
import '@/css/input1.css';
import '@/css/output1.css';
import '@/css/input1.css';
import '@/css/output.css';
import Password from"@/components/ChangePassword/Password";
import ProtectedRoute from "@/components/ProtectedRoute";


const ChangePassword = () => {
  return (
      <>
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div>
          <Password/>
      </div>
      </ProtectedRoute>
     </>
  );
}
 
export default ChangePassword;