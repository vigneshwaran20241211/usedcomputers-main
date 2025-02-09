"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Calendar from "@/components/FacilityCenter/collection/calendar";
import List from "@/components/FacilityCenter/collection/list";
import Link from "next/link";

interface ParamsInterface {
  page: number;
  limit: number;
}

const ViewCollection: React.FC<ParamsInterface> = ({ page, limit }) => {
  // State for data, current page, total pages, loading, and counts
  const accessToken = localStorage.getItem("accessToken");
  const [stateData, setStateData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [limitPerPage, setLimitPerPage] = useState<number>(limit || process.env.DEFAULT_PAGE_LIMIT || 10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [upcomingCount, setUpcomingCount] = useState<number>(0);
  const [receivedCount, setReceivedCount] = useState<number>(0);
  const [requestedCount, setRequestedCount] = useState<number>(0); // New state for "Requested"
  const [rejectedCount, setRejectedCount] = useState<number>(0); // New state for "Rejected"
  const [cancelledCount, setCancelledCount] = useState<number>(0); // New state for "Rejected"
  const router = useRouter();

  const fetchData = async (page: number) => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const result = await axios.get(`${process.env.API_URL}state/all?page=${page}&limit=${limitPerPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (result.data && Array.isArray(result.data.data)) {
        setStateData(result.data.data);
        setTotalPages(result.data.lastPage || 1);
      } else {
        console.error("Invalid data format:", result.data);
        setStateData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to fetch data.');
      toast.error("Failed to fetch data.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${process.env.API_URL}booking/search/FC`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("API Response:", response.data); // Log the entire response to check its structure
      if (response.data) {
        // Count bookings based on different statuses
        const upcoming = response.data.data.filter((booking: any) => booking.status === "INPROGRESS").length;
        const received = response.data.data.filter((booking: any) => booking.status === "CCACCEPTED").length;
        const requested = response.data.data.filter((booking: any) => booking.status === "REQUESTED").length; // Add this for Requested
        const rejected = response.data.data.filter((booking: any) => booking.status === "REJECTED").length; // Add this for Rejected
        const cancelled = response.data.data.filter((booking: any) => booking.status === "CANCELLED").length; // Add this for Rejected
        // Set the state for counts
        setUpcomingCount(upcoming);
        setReceivedCount(received);
        setRequestedCount(requested);  // Assuming you create this state variable
        setRejectedCount(rejected);    // Assuming you create this state variable
        setCancelledCount(cancelled);

        // Log the counts to verify they are being updated
        console.log("Upcoming Count:", upcoming);
        console.log("Received Count:", received);
        console.log("Requested Count:", requested);
        console.log("Rejected Count:", rejected);
        console.log("cancelled Count:", cancelled);
      }
    } catch (error) {
      console.error("Error fetching booking counts:", error);
      toast.error("Failed to fetch counts.", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    fetchCounts(); // Fetch the counts for Upcoming, Received, Requested, and Rejected on initial load
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatus = async (status: string, id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const changedStatus = status === "ACTIVE" ? "DELETED" : "ACTIVE";
      await axios.put(
        `${process.env.API_URL}state/status/${id}`,
        { status: changedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("State Status updated successfully 🎉", { position: "top-right" });
      fetchData(currentPage); // Refresh data after the update
    } catch (error) {
      console.error("Error updating state status:", error);
      toast.error("Failed to update state. Please try again.", { position: "top-right" });
    }
  };

  const handleDelete = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.API_URL}country/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success('Country deleted successfully.', { position: 'top-right' });
      fetchData(currentPage); // Refresh data after deletion
    } catch (err) {
      console.error('Error deleting item:', err);
      toast.error('Failed to delete item. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <button className="bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.856-1.105 2.856-2.571v-4c0-1.466-1.316-2.571-2.856-2.571h-13.856c-1.54 0-2.856 1.105-2.856 2.571v4c0 1.466 1.316 2.571 2.856 2.571z" />
        </svg>
        <span>Upcoming</span>
        <span className="ml-auto">{upcomingCount}</span>
      </button>

      <button className="bg-green-500 text-white rounded-lg py-2 px-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-4v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        </svg>
        <span>Received</span>
        <span className="ml-auto">{receivedCount}</span>
      </button>

      {/* <button className="bg-yellow-500 text-white rounded-lg py-2 px-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0" />
        </svg>
        <span>Requested</span>
        <span className="ml-auto">{requestedCount}</span>
      </button> */}

      <button className="bg-red-500 text-white rounded-lg py-2 px-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 1118 0z" />
        </svg>
        <span>Rejected</span>
        <span className="ml-auto">{rejectedCount}</span>
      </button>

      <button className="bg-gray-500 text-white rounded-lg py-2 px-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 1118 0z" />
        </svg>
        <span>Cancelled</span>
        <span className="ml-auto">{cancelledCount}</span>
      </button>

      <Calendar />
      {/* <List /> */}

      {/* Pagination (Example)
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
      </div> */}

      <ToastContainer />
    </div>
  );
};

export default ViewCollection;
