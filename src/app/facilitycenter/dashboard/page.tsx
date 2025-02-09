"use client";
import { useState, useEffect } from 'react';
import FacilityCenter from "@/components/Dashboard/FacilityCenter";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/FacilityCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Modal from "@/components/Dashboard/PaymentModel"; // Import the Modal component

const FCDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Open the modal when the page loads
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Handle the form data (address and amount)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProtectedRoute allowedRoles={["FC"]}>
        <DefaultLayout>
          <FacilityCenter />
          
          {/* Modal component */}
          <Modal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleModalSubmit}
          />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FCDashboard;
