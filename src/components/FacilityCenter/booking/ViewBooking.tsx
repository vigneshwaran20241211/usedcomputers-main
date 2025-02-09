"use client";
import axios from "axios";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import * as XLSX from 'xlsx';
import Modal from 'react-modal';

interface Booking {
  id: string;
  bookingId: string;
  stateId: string;
  state: { title: string };
  category: { products: any[] };
  bookingType: string;
  bookingSession: string;
  bookingDate: string;
  status: string;
  total: number;
  totalPaid: number;
  totalQuantity: number;
  pickupCharge: number;
}

interface paramsInterface {
  page: number;
  limit: number;
}

const TableTwo: React.FC<paramsInterface> = ({ page, limit }) => {
  const accessToken = localStorage.getItem("accessToken");
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [stateData, setStateData] = useState<Booking[]>([]);
  const [stateNames, setStateNames] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [toggleData, setToggleData] = useState({
    id: "",
    state: [
      {
        id: "",
        buyPrice: "",
        sellPrice: "",
        ccCommission: "",
        fcCommission: ""
      }
    ]
  });

  const [data, setData] = useState({
    id: "",
    dateReceived:"",
    vehicleNo: "",
    cnNo: "",
    packingType: ""
  });

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

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

  const fetchData = async (page: number) => {
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const result = await axios.get(`${process.env.API_URL}booking/search/fc`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (Array.isArray(result.data.data)) {
        setStateData(result.data.data);
        setTotalPages(result.data.lastPage || 1);

        result.data.data.forEach((booking: Booking) => {
          if (booking.stateId && !stateNames[booking.stateId]) {
            fetchStateName(booking.stateId);
          }
        });
      } else {
        setStateData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setStateData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const exportToExcel = () => {
    const formattedData = stateData.map(booking => ({
      BookingId: booking.bookingId,
      State: booking.state.title || "No State",
      ProductDetails: Array.isArray(booking.category[0]?.products)
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

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  const toggleModal = (id: string) => {
    // //setSelectedProductId(id);
    // setData.id(id);
    // setIsOpen((prev) => !prev);
    setData((prevData) => ({
      ...prevData, // This ensures we keep other properties intact
      id: id, // Update the id
    }));
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
    if (!accessToken) {
      setError("No access token found. Please log in.");
      console.error("No access token found. Please log in.");
      return; // Exit early if no token
    }

    try {
      if (data.id) {
        const response = await axios.patch(
          `${process.env.API_URL}booking/${data.id}`,
          // { id:data.id, data: data.code, title: data.title },
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("Response:", response.data); // Optional logging
        toast.success("Consigment Details updated Successfully 🎉", {
          position: "top-right",
        });
      } else {
        const response = await axios.post(
          `${process.env.API_URL}parts`,
          { code: data.code, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.success("Parts Created Successfully 🎉", {
          position: "top-right",
        });
      }
      router.push("/collectioncenter/booking/viewbooking");
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred";

      setError(errorMessage);
      console.error("Error:", errorMessage);
    }
  };


  return (
    <>
      {isOpen && (
        <div id="authentication-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Consignment Details</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6L12 12M6 12L12 6" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <form  onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input type="text"  hidden name="id" value={data.id}></input>
                  <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-900 mb-2">
                    Date Reciveed
                  </label>
                  <input
                    type="date"
                    id="buyPrice"
                    name="dateReceived"
                    value={data.dateReceived}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-900 mb-2">
                    Vechicle Number
                  </label>
                  <input
                    type="text"
                    id="sellPrice"
                    value={data.vehicleNo}
                    name="vehicleNo"
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="ccCommission" className="block text-sm font-medium text-gray-900 mb-2">
                    CN Number
                  </label>
                  <input
                    type="text"
                    id="ccCommission"
                    value={data.cnNo}
                    name="cnNo"
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="fcCommission" className="block text-sm font-medium text-gray-900 mb-2">
                    Packing Type
                  </label>
                  <input
                    type="text"
                    id="fcCommission"
                    value={data.packingType}
                    name="packingType"
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2.5 px-5 rounded-lg hover:bg-blue-800"
                >
                  Submit Consignment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <ToastContainer />
        <div className="px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            View Customer Booking List
          </h4>
          {/* Export button */}
          <button
            onClick={exportToExcel}
            className="mt-4 mb-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
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
                  {/* <th scope="col" className="px-6 py-3">Consignment</th> */}
                  <th scope="col" className="px-6 py-3">Download Invoice</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((booking, index) => (
                  <tr
                    key={booking.id || index}
                    className={`border-b dark:border-gray-700 ${index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                      }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
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
                      <p>Total: {booking.total}</p>
                      <p>Total Paid: {booking.totalPaid}</p>
                      <p>Total Quantity: {booking.totalQuantity}</p>
                      <p>Pickup Charge: {booking.pickupCharge}</p>
                    </td>
                    <td className="px-6 py-4">{booking.bookingType}</td>
                    <td className="px-6 py-4">
                      {booking.bookingSession} <br /> {booking.bookingDate}
                    </td>
                    <td className="px-6 py-4">
                    <p>{booking.status}</p>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded px-2 py-1"
                      >
                       <option value="">Select Status</option>
                      <option value="FCACCEPTED">FC Accepted</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REQUESTED">Requested</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="REJECTED">Rejected</option>
                      </select>
                    </td>
                    {/* <td className="px-6 py-4">
                      <button
                        onClick={() => toggleModal(booking.id)}
                        className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Consignment
                      </button>
                    </td> */}
                    <td className="px-6 py-4">
                      <a
                        href={`http://dev.usedcomputer.com.my:3000/invoice/download/${booking.bookingId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination */}
        <nav aria-label="Page navigation example" className="py-4">
          <ul className="flex items-center -space-x-px h-8 text-sm justify-center">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === 1 ? "text-gray-400 bg-gray-200" : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                  }`}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border ${page === currentPage
                    ? "text-blue-600 bg-blue-50 border-blue-300"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === totalPages ? "text-gray-400 bg-gray-200" : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                  }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableTwo;
