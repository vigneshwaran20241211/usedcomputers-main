"use client";
import axios from "axios";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface paramsInterface {
  page: Number,
  limit: Number,
}

const AllUsers: React.FC = (params: paramsInterface) => {

  // State for data, current page, total pages, and loading
  const [stateData, setStateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(params.page) || 1);
  const [limit, setLimit] = useState(Number(params.limit) || process.env.DEFAULT_PAGE_LIMIT);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  console.log(limit);

  const handleDelete = async (id) => {
    console.log("Delete function calling", id);
    const accessToken = localStorage.getItem('accessToken');
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.API_URL}user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Update the state after deletion (remove the deleted item)
      // (country.filter(country => country.id !== id));
      alert('user deleted:', response.data);
      fetchData();
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (page: number) => {
    setLoading(true); // Start loading
    const accessToken = localStorage.getItem('accessToken');
    try {
      const result = await axios.get(`${process.env.API_URL}user?page=${currentPage}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (Array.isArray(result.data.data)) {
        console.log(result.data.lastPage)
        setStateData(result.data.data);
        setTotalPages(result.data.lastPage || 1); // Adjust total pages based on the response
      } else {
        console.error("Invalid data format:", result.data);
        setStateData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setStateData([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleStatus = async (approvalStatus, _id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Determine the new status based on the current status
      const changedStatus = approvalStatus === "ACCEPTED" ? "PENDING" : "ACCEPTED";

      // Construct the URL using the base URL, user ID, and status
      const url = `${process.env.API_URL}user/approve/${_id}/${changedStatus}`;

      // Make the API call to update the status
      await axios.put(url, {}, {  // No need to send the status in the body now
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Ensure `accessToken` is valid
        },
      });

      // Notify the user about the success
      toast.success("User Status updated successfully 🎉", {
        position: "top-right",
      });
      fetchData(); // Fetch updated data after status change
    } catch (error) {
      // Handle errors gracefully
      console.error("Error updating user status:", error);
      toast.error("Failed to update user. Please try again.", {
        position: "top-right",
      });
    }
  };


  const handleUserStatus = async (status, _id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Determine the new status based on the current status
      const changedStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      // Construct the URL using the base URL, user ID, and status
      const url = `${process.env.API_URL}user/status/${_id}/${changedStatus}`;

      // Make the API call to update the status
      await axios.put(url, {}, {  // No need to send the status in the body now
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Ensure `accessToken` is valid
        },
      });

      // Notify the user about the success
      toast.success("User Status successfully 🎉", {
        position: "top-right",
      });
      fetchData(); // Fetch updated data after status change
    } catch (error) {
      // Handle errors gracefully
      console.error("Error updating user status:", error);
      toast.error("Failed to update user. Please try again.", {
        position: "top-right",
      });
    }
  };

  // Fetch data when the component mounts or currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <ToastContainer />
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          View All User List
        </h4>
        {/* <Link href="#">
          <button
            type="button"
            className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add
          </button>
        </Link> */}
      </div>
      <br></br>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Mobile</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">User Type</th>
                <th scope="col" className="px-6 py-3">Approval Status</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stateData.map((user, index) => (
                <tr
                  key={user.id || index} // Prefer country.id if available, fallback to index
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

                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">+60{user.mobile}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.userType}</td>
                  {/* <td className="px-6 py-4">
                    {user.status}
                  </td> */}
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => handleStatus(user.approalStatus, user._id)}
                        className="sr-only peer"
                        checked={user.approalStatus === "ACCEPTED"} // Use `checked` instead of `defaultChecked`
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white 
    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
    after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
    peer-checked:bg-blue-500"
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    {/* <button onClick={() => handleDelete(user.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                      Delete
                    </button> */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => handleUserStatus(user.status, user._id)}
                        className="sr-only peer"
                        checked={user.status === "ACTIVE"} // Use `checked` instead of `defaultChecked`
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white 
    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
    after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
    peer-checked:bg-blue-500"
                      ></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
    </div>
  );
};

export default AllUsers;
