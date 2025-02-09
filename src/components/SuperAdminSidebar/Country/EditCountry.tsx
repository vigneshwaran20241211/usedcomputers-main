"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useState,  ChangeEvent, useEffect } from 'react';



const EditCountry = ({ params }: { params?: { id?: string } }) => {
  
  const [formData, setFormData] = useState({ code: "", title: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(formData);

 const router = useRouter();
 const pathname = usePathname();
 console.log(pathname);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Indicate that data fetching has started

      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
      if (!accessToken) {
        setError("No access token found. Please log in.");
        console.error("No access token found.");
        setIsLoading(false); // End loading
        return; // Exit early if no token
      }

      if (!params?.id) {
        setError("Invalid country ID.");
        setIsLoading(false); // End loading
        return; // Exit if params or params.id is undefined
      }

      try {
        const response = await fetch(`${process.env.API_URL}country/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch country with ID ${params.id}`);
        }
        console.log(response);
        const data = await response.json();
        setFormData({ code: data.code, title: data.title });
        setIsLoading(false); // End loading
      } catch (error) {
        setError("Failed to load Country.");
        console.error(error);
        setIsLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        {/* Breadcrumb Component */}
        <Breadcrumb pageName="Master / Country" />
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-9">
          <div className="flex flex-col gap-9">
            {/* Contact Form */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">Edit Country</h3>
                <Link href="/superadmin/master/viewcountry">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right"
                  >
                    Back
                  </button>
                </Link>
                <br></br>
                <br></br>
              </div>
              <form>
                <div className="p-6.5">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter a Country Code"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter a Country Name"
                      required
                    />
                  </div>
                  <br></br>
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
      </ProtectedRoute>
    </>
  );
};

export default EditCountry;

