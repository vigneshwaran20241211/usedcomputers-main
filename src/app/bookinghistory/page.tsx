"use client";
import React from "react";
import '@/css/input1.css';
import '@/css/output1.css';
import '@/css/input1.css';
import '@/css/output.css';
import  BookingHis from"@/components/BookingHistory/BookingHistory";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";


const BookingHistory = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  
  return (
      <>
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <div>
         <BookingHis  page={page}/>
      </div>
      </ProtectedRoute>
     </>
  );
}
 
export default BookingHistory;