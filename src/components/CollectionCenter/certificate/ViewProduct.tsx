"use client";
import axios from "axios";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Modal from 'react-modal';
import toggleModal from "./toggleModel";


interface paramsInterface {
  page: Number,
  limit: Number,
}

const TableTwo: React.FC = (params: paramsInterface) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedState, setSelectedOptions] = useState(null);

  const toggleModal = (id) => {
    console.log(`Toggling modal for product ID: ${id}`);
    setSelectedProductId(id); // Set the selected product ID
    setIsOpen((prev) => !prev); // Toggle modal visibility
  };

  const [toggleData, setToggleData] = useState({
    id: "", // Will store the ID, you can modify this based on your logic
    state: [
      {
        id: "", // Correct way to define an ID within the object
        buyPrice: "",
        sellPrice: "",
        ccCommission: "",
        fcCommission: ""
      }
    ]
  });

  console.log("Toggle Data" + toggleData);
  const [data, setData] = useState({
    id: "",
    title: "",
    categoryId: "",
    image_url: "",
    logo_url: "",
    parts: [],
  });

  // State for data, current page, total pages, and loading
  const [stateData, setStateData] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(params.page) || 1);
  const [limit, setLimit] = useState(Number(params.limit) || process.env.DEFAULT_PAGE_LIMIT);
  const [totalPages, setTotalPages] = useState(1);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  console.log(limit);


  const handleStatus = (status, id) => {
    const accessToken = localStorage.getItem('accessToken');
    //alert(status + id);
    try {
      // Determine the new status based on the current status
      const changedStatus = status === "ACTIVE" ? "DELETED" : "ACTIVE";

      // Make the API call to update the category status
      axios.put(
        `${process.env.API_URL}product/status/${id}`, // Ensure URL is correct and consistent
        { "status": changedStatus }, // Payload with the updated status
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Ensure `accessToken` is valid
          },
        }
      );

      // Notify the user about the success
      //alert("Category updated successfully!");
      toast.success("Product Status updated successfully 🎉", {
        position: "top-right",
      });
      fetchData();
    } catch (error) {
      // Handle errors gracefully
      console.error("Error updating product status:", error);
      toast.error("Failed to update product. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Parts?");

    if (!isConfirmed) {
      return; // Exit if the user cancels the deletion
    }
    console.log("Delete function calling", id);
    const accessToken = localStorage.getItem('accessToken');
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.API_URL}product/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Update the state after deletion (remove the deleted item)
      // (country.filter(country => country.id !== id));
      //toast.e('Product deleted:', response.data);
      toast.error("Product deleted successfully 🎉",
        { position: "top-right" },
      );
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
      const result = await axios.get(`${process.env.API_URL}product/all?page=${currentPage}&limit=${limit}`, {
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

  // Fetch data when the component mounts or currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      toast.error("Access token missing, please log in.");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (accessToken) {
      axios.get(`${process.env.API_URL}state/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(result => setStates(result.data.data))
        .catch(error => console.error(error));
    }
  }, [accessToken]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setData((prevData) => ({ ...prevData, ids: selectedOptions }));
  };

  const handletoggleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      // Handle multiple state selections
      setToggleData((prevData) => ({
        ...prevData,
        [name]: Array.from(e.target.selectedOptions, (option) => option.value),
      }));
    } else {
      setToggleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleToggleSubmit = async (e) => {
    e.preventDefault();

    // Check if the access token exists
    if (!accessToken) {
      setError("No access token found. Please log in.");
      return;
    }

    // Ensure toggleData has the required properties
    const { state, buyPrice, sellPrice, ccCommission, fcCommission } = toggleData;

    if (!state || state.length === 0 || !buyPrice || !sellPrice || !ccCommission || !fcCommission) {
      setError("Please fill in all fields.");
      return;
    }

    // Prepare the payload with the correct structure
    const payload = {
      state: state.map((stateId) => ({
        id: stateId, // Use the state ID from the selected options
        buyPrice,    // Use the inputted buyPrice
        sellPrice,   // Use the inputted sellPrice
        ccCommission, // Use the inputted ccCommission
        fcCommission, // Use the inputted fcCommission
      })),
    };

    try {
      // Make the API request
      const response = await fetch(`${process.env.API_URL}product/${selectedProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Assuming Bearer token for authentication
        },
        body: JSON.stringify(payload), // Send the formatted payload
      });

      // Handle the response
      if (response.ok) {
        toast.success("Payment settings have been updated!");
      } else {
        const errorData = await response.json(); // Get the response error details
        toast.error(`Failed to update payment settings: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Error submitting form. Please try again.");
    }
  };
  return (
    <>
      {isOpen && (
        <div id="authentication-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 mt-25">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <br></br>
              <br></br>
              <h3 className="text-xl font-semibold text-gray-900 mt-10">Price Details</h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-900 mt-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6L12 12M6 12L12 6M12 12L6 6" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleToggleSubmit} className="space-y-4">
                <div className="max-w-md mx-auto">
                  <label htmlFor="multi-select" className="block text-sm font-medium text-gray-700">Select Options:</label>
                  <input type="text" name="id" value={selectedProductId} onChange={handletoggleChange} />
                  <select
                    id="multi-select"
                    name="state" // Name should be consistent with toggleData
                    multiple
                    value={toggleData.state} // This should be an array of selected state IDs
                    onChange={handletoggleChange}
                    className="block w-full px-4 py-2 border rounded-md"
                  >
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.title}
                      </option>
                    ))}
                  </select>


                </div>


                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Price's
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="buyPrice"
                      id="collection_center_commission"
                      value={toggleData.buyPrice} onChange={handletoggleChange}
                      placeholder="Enter Selling Price"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="sellPrice"
                      id="facility_center_commission"
                      value={toggleData.sellPrice} onChange={handletoggleChange}
                      placeholder="Enter Buying Price"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Commission's
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="ccCommission"
                      id="collection_center_commission"
                      placeholder="CC Commission"
                      value={toggleData.ccCommission} onChange={handletoggleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="fcCommission"
                      id="facility_center_commission"
                      placeholder="FC Commission"
                      value={toggleData.fcCommission} onChange={handletoggleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2.5 px-5 rounded-lg hover:bg-blue-800 focus:outline-none"
                >
                  Set Payment
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
            View Product
          </h4>
          <Link href="/superadmin/product/addproduct">
            <button
              type="button"
              className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </Link>
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
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Product Logo</th>
                  <th scope="col" className="px-6 py-3">Parts</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((product, index) => (
                  <tr
                    key={product.id || index} // Prefer country.id if available, fallback to index
                    className={`border-b dark:border-gray-700 ${index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                      }`}
                  >
                    <td className="px-6 py-4">{index + 1}. </td>
                    <td className="px-6 py-4">{product.title}</td>
                    <td className="px-6 py-4">{product?.category?.title}
                      <br></br>
                      <Image
                        src={product?.category?.image || "/images/default-image"} // Use default-image from the root
                        alt="Category Image"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />

                    </td>
                    <td className="px-6 py-4">
                      <Image
                        src={product.logo_url || "/images/default-image"} // Use default-image from the root
                        alt="Category Image"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />

                    </td>
                    <td className="px-6 py-4">
                      {product.parts.map((part, i) => (
                        <div key={i}>
                          {part?.id?.code} - {part.name || part.quantity || 'No Data'}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={() => handleStatus(product.status, product.id)}
                          className="sr-only peer"
                          defaultChecked={product.status === "ACTIVE"} // Set defaultChecked based on status
                        />
                        <div
                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white 
    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
    after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
    peer-checked:bg-blue-500"
                        ></div>
                        {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {category.status === "ACTIVE" ? "Enabled" : "Disabled"} Reflects current status
                      </span> */}
                      </label>

                    </td>
                    <td>

                      <button onClick={() => toggleModal(product.id)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Set Price
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/superadmin/master/addproduct?id=${product.id}`}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </Link>
                      <br></br>
                      <br></br>
                      <button onClick={() => handleDelete(product.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                        Delete
                      </button>
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
    </>
  );
};
export default TableTwo;
