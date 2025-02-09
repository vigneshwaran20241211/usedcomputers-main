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

const TableTwo: React.FC<paramsInterface> = (params) => {
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
  const fetchData = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const result = await axios.get(`${process.env.API_URL}booking/search/CC`, {
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

  // Filter data based on the search query
  const filterData = (query: string) => {
    if (!query) {
      setFilteredData(stateData); // If no search query, display all data
    } else {
      const filtered = stateData.filter((booking) => {
        const searchLower = query.toLowerCase();

        // Search across different fields
        return (
          booking.bookingId.toLowerCase().includes(searchLower) ||
          (booking.state.title && booking.state.title.toLowerCase().includes(searchLower)) ||
          (Array.isArray(booking.category) && booking.category[0]?.products.some((product: any) =>
            `${product.title} - Quantity: ${product.quantity} - Price: RM${product.price}`.toLowerCase().includes(searchLower)
          )) ||
          booking.bookingType.toLowerCase().includes(searchLower) ||
          booking.bookingSession.toLowerCase().includes(searchLower) ||
          booking.bookingDate.toLowerCase().includes(searchLower) ||
          booking.status.toLowerCase().includes(searchLower)
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
      State: booking.state.title || "No State",
      ProductDetails: Array.isArray(booking.category) && booking.category[0]?.products
        ? booking.category[0].products.map((product: any) => `${product.title} - Quantity: ${product.quantity} - Price: RM${product.price}`).join(', ')
        : "No Products",
      BookingType: booking.bookingType,
      BookingSession: booking.bookingSession,
      BookingDate: booking.bookingDate,
      Status: booking.status,
      Total: booking.total,
      TotalPaid: booking.totalPaid,
      TotalQuantity: booking.totalQuantity,
      PickupCharge: booking.pickupCharge,
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
          View Booking List - Search
        </h4>
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Booking ID, State, Product, Booking Type, Date, or Status..."
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
                <th scope="col" className="px-6 py-3">State</th>
                <th scope="col" className="px-6 py-3">Product Details</th>
                <th scope="col" className="px-6 py-3">Booking Type</th>
                <th scope="col" className="px-6 py-3">Booking Session / Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Download Invoice</th>
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
                  <td className="px-6 py-4">{booking.state.title || "No State"}</td>
                  <td className="px-6 py-4">
                    {Array.isArray(booking.category) && booking.category[0]?.products ? (
                      booking.category[0].products.map((product, i) => (
                        <div key={i}>
                          {product.title} - Quantity: {product.quantity} - Price: RM{product.price}
                        </div>
                      ))
                    ) : (
                      "No Products"
                    )}
                    <p className="">Total : {booking.total}</p>
                    <p className="">Total Paid : {booking.totalPaid}</p>
                    <p className="">Total Quantity : {booking.totalQuantity}</p>
                    <p className="">Pickup Charge : {booking.pickupCharge}</p>
                  </td>
                  <td className="px-6 py-4">{booking.bookingType}</td>
                  <td className="px-6 py-4">{booking.bookingSession} <br /> {booking.bookingDate}</td>
                    
                  <td className="px-6 py-4">
                    <p>{booking.status}</p>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="bg-white border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="CCACCEPTED">CC Accepted</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REQUESTED">Requested</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`http://apidev.usedcomputer.com.my:3000/invoice/${booking.bookingId}.pdf`}
                      target="blank"
                      className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Document
                    </Link>
                  </td>
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

export default TableTwo;
