"use client";
import axios from "axios";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx'; // Import xlsx library

interface paramsInterface {
  page: Number,
  limit: Number,
}

const ConsignementDetails: React.FC<paramsInterface> = (params) => {
  const accessToken = localStorage.getItem("accessToken");
  const [stateData, setStateData] = useState<any[]>([]); // All data
  const [filteredData, setFilteredData] = useState<any[]>([]); // Filtered data
  const [stateNames, setStateNames] = useState<{ [key: string]: string }>({}); // Store state names here
  const [searchQuery, setSearchQuery] = useState(""); // Search input query

  const [currentPage, setCurrentPage] = useState(Number(params.page) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage] = useState(10); // Items per page

  useEffect(() => {
    fetchData(); // Fetch data once when the component is mounted
  }, []);

  // Fetch all data once when the component is mounted

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad it with leading zero if needed
  //   const day = String(date.getDate()).padStart(2, '0'); // Get day and pad it with leading zero if needed
  //   return `${year}/${month}/${day}`; // Return formatted date
  // };

  // Custom date format function
const formatDate = (date: string | undefined) => {
  if (!date) {
    return ""; // Return blank if the date is empty or undefined
  }

  // Parse the date string and create a Date object
  const parsedDate = new Date(date);
  
  // Check if it's a valid date
  if (isNaN(parsedDate.getTime())) {
    return ""; // Return blank if the date is invalid
  }

  // Format the date as YYYY/MM/DD
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


  
  const fetchData = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const result = await axios.get(`${process.env.API_URL}booking/search/FC`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (Array.isArray(result.data.data)) {
        setStateData(result.data.data);
        setFilteredData(result.data.data); // Initially show all data
        setTotalPages(Math.ceil(result.data.data.length / itemsPerPage));

        // Fetch state names for each booking's stateId
        result.data.data.forEach((booking: any) => {
          if (booking.stateId && !stateNames[booking.stateId]) {
            fetchStateName(booking.stateId);
          }
        });
      } else {
        setStateData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setStateData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch state name
  const fetchStateName = async (stateId: string) => {
    if (stateNames[stateId]) return; // Skip if state is already fetched

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
    try {
      const response = await axios.get(`${process.env.API_URL}state/${stateId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStateNames((prevState) => ({
        ...prevState,
        [stateId]: response.data.title,
      }));
    } catch (error) {
      console.error(`Error fetching state name for ${stateId}:`, error);
    }
  };

  const filterData = (query: string) => {
    if (!query) {
      setFilteredData(stateData); // If no search query, display all data
    } else {
      const filtered = stateData.filter((booking) => {
        const searchLower = query.toLowerCase();
  
        // Ensure the fields being accessed are not undefined or null before comparing
        return (
          (booking.bookingId && booking.bookingId.toLowerCase().includes(searchLower)) ||
          (booking.packingType && booking.packingType.toLowerCase().includes(searchLower)) ||
          (booking.vehicleNo && booking.vehicleNo.toLowerCase().includes(searchLower)) ||
          (booking.dateReceived && booking.dateReceived.toLowerCase().includes(searchLower)) ||
          (booking.cnNo && booking.cnNo.toLowerCase().includes(searchLower))
        );
      });
      setFilteredData(filtered); // Set the filtered data to state
      setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // Update total pages after filter
    }
  };
  

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value); // Filter data on each change
  };

  // Handle status change (assuming you need to update status for a booking)
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `${process.env.API_URL}booking/status/${id}/${newStatus}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      toast.success("Status updated successfully!");

      // Update the local state with the new status
      setStateData((prevState) =>
        prevState.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  // Export to Excel functionality
  const exportToExcel = () => {
    const formattedData = filteredData.map(booking => ({
      BookingId: booking.bookingId,
      ConsignementNumber:booking.cnNo,
      DateOfRecived: booking.dateReceived,
      PackingType: booking.packingType,
      VechicleNo: booking.vehicleNo
    }));

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    // Write to file
    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  // Paginate filtered data
  const paginateData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <ToastContainer />
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          View Consignment - Booking Details
        </h4>
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Booking ID, Consignement No, Date, Vechicle No or PackingType..."
          className="mt-4 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
        />
        {/* Export button */}
        <button
          onClick={exportToExcel}
          className="mt-4 mb-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Export to Excel
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Booking Id</th>
				<th scope="col" className="px-6 py-3">Consignement No</th>
				<th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Pickup Type</th>
                <th scope="col" className="px-6 py-3">Vehicle No</th>
              </tr>
            </thead>
            <tbody>
              {paginateData().map((booking, index) => (
                <tr
                  key={booking.id || index}
                  className={`border-b dark:border-gray-700 ${index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                    }`}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}.
                  </th>
                  <td className="px-6 py-4">{booking.bookingId}</td>
				  <td className="px-6 py-4">{booking.cnNo}</td>
				  <td className="px-6 py-4">{formatDate(booking.dateReceived)}</td>
                  <td className="px-6 py-4">{booking.packingType}</td>
                  <td className="px-6 py-4">{booking.vehicleNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
<div className="flex justify-center items-center mt-4">
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* Page number display */}
  <span className="mx-4 text-sm text-gray-700 dark:text-gray-400">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
<br></br>
<br></br>
    </div>
  );
};

export default ConsignementDetails;
