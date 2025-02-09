"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddCategory = (params) => {
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");
  const [data, setData] = useState({
    id: "",
    image:"",
    title: "",
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]); // Ensure setImageFile is defined
    }
  };

  useEffect(() => {
    if (params.id !== "new") {
      axios
        .get(`${process.env.API_URL}category/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setData({ id: data.id, image: data.image, title: data.title });
        })
        .catch((err) => console.error("Error fetching category data:", err));
    }
  }, [params.id, accessToken]);
  const handleSubmit = async (e) => {
    console.log(imageFile);
    e.preventDefault();
    if (!accessToken) {
      setError("No access token found. Please log in.");
      return;
    }
  
    try {
      let imageUrl = data.image;
  
      if (imageFile) {
        // Create FormData object for file upload
        const formData = new FormData();
        formData.append("file", imageFile);
  
        // Debugging FormData (not strictly necessary but useful)
        console.log("FormData object:", formData);
  
        const uploadResponse = await axios.post(
          `${process.env.API_URL}upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
              folder: "products", // Assuming this is the correct header for folder
            },
          }
        );
  
        imageUrl = uploadResponse.data.url; // Assuming the response contains `filePath`
        console.log(imageUrl);
        console.log("Uploaded Image URL:", imageUrl);
      }
  
      // Check if updating or creating a new category
      if (data.id) {
        await axios.put(
          `${process.env.API_URL}category/${data.id}`,
          { id: data.id, image: imageUrl, title: data.title  },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Category Updated successfully");
        toast.success("Category Updated Successfully 🎉",
          { position: "top-right" },
        );
      } else {
        await axios.post(
          `${process.env.API_URL}category`,
          { image: imageUrl, title: data.title },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Category Created successfully");
        toast.success("Category Created Successfully 🎉",
          { position: "top-right" },
        );
      }
  
      router.push("/superadmin/master/viewcategory");
    } catch (error) {
      console.error("Error details:", error.response || error.message || error);
      const errorMessage =
        error.response?.data?.message || error.message || "An unknown error occurred";
      setError(errorMessage);
    }
  };
  return (
    <>
       <ToastContainer />
        <Breadcrumb pageName="Master / Category" />

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 lg:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Add Category
                </h3>
                <Link href="/superadmin/master/viewcategory">
                  <button
                    type="button"
                    className="float-right mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Back
                  </button>
                </Link>
                <br />
                <br />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="w-full">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category Name
                    </label>
                    <input
                      type="hidden"
                      name="id"
                      onChange={handleChange}
                      value={data.id}
                    />
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={data.title}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter a Category Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category Image
                    </label>
                    <input
                      type="file"
                      name="image" 
                      onChange={handleFileChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required={!data.id} // Make required for new entries
                    />
                  </div>
                  {error && (
                    <p className="mb-4.5 text-sm text-red-500">{error}</p>
                  )}
                  <br />
                  <button
                    type="submit"
                    className="mb-4.5 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddCategory;
