"use client";
import { useState, useEffect } from 'react';
import CollectionCenter from "@/components/Dashboard/CollectionCenter";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/CollectionCenterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Modal from "@/components/Dashboard/CCPaymentModel"; // Import the Modal component

const CCDashboard = () => {
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
      <ProtectedRoute allowedRoles={["CC"]}>
        <DefaultLayout>
          <CollectionCenter />
          
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

export default CCDashboard;
