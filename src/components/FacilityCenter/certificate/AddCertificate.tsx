import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const FormElements = ({ formData, onChange }) => {
  const accessToken = localStorage.getItem("accessToken");
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    mobile: "",
    address: "",
    ssmFile: "", // SSM document
    dicFile: "", // Director IC document
    mlFile: "",  // Municipal License document
  });
  const [ssmFile, setSsmFile] = useState(null);
  const [dicFile, setDicFile] = useState(null); // New state for dicFile
  const [mlFile, setMlFile] = useState(null); // New state for mlFile
  const [error, setError] = useState("");

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      setError("No access token found. Please log in.");
      console.error("No access token found. Please log in.");
      return;
    }

    try {
      const formData = new FormData();
      let imageUrl = user.ssmFile || ""; // Existing image URL (if any)
      let dicUrl = user.dicFile || ""; // Existing dicFile URL
      let mlUrl = user.mlFile || ""; // Existing mlFile URL

      // If image file is selected, upload it
      if (ssmFile) {
        const ssmFormData = new FormData();
        ssmFormData.append("file", ssmFile);
        const uploadResponse = await axios.post(`${process.env.API_URL}upload`, ssmFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            folder: "products", // Assuming this folder for user images
          },
        });
        imageUrl = uploadResponse.data.url;
        console.log("SSM file uploaded, URL: ", imageUrl);
      }

      // Upload dicFile if selected
      if (dicFile) {
        const dicFormData = new FormData();
        dicFormData.append("file", dicFile);
        const dicUploadResponse = await axios.post(`${process.env.API_URL}upload`, dicFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            folder: "products", // Assuming this folder for dicFile
          },
        });
        dicUrl = dicUploadResponse.data.url;
        console.log("Director IC file uploaded, URL: ", dicUrl);
      }

      // Upload mlFile if selected
      if (mlFile) {
        const mlFormData = new FormData();
        mlFormData.append("file", mlFile);
        const mlUploadResponse = await axios.post(`${process.env.API_URL}upload`, mlFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            folder: "products", // Assuming this folder for mlFile
          },
        });
        mlUrl = mlUploadResponse.data.url;
        console.log("Municipal License file uploaded, URL: ", mlUrl);
      }

      // Prepare updated user data with the new URLs for ssmFile, dicFile, and mlFile
      const updatedUser = { ...user, ssmFile: imageUrl, dicFile: dicUrl, mlFile: mlUrl };

      // If user._id exists, perform the update
      if (user._id) {
        const response = await axios.put(
          `${process.env.API_URL}user/${user._id}`,
          updatedUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Profile updated successfully!!", { position: "top-right" });
        console.log("Profile updated successfully!", response);
      } else {
        // If user._id is not present, create a new user profile
        const response = await axios.post(
          `${process.env.API_URL}user`,
          updatedUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Profile created successfully!!", { position: "top-right" });
        console.log("Profile created successfully!", response);
      }

      // Redirect to login after successful update/creation
      router.push("/collectioncenter/dashboard");

    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "An unknown error occurred");
      toast.error(error.response?.data?.message || "Error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "ssm") setSsmFile(file);
    if (fileType === "dic") setDicFile(file);
    if (fileType === "ml") setMlFile(file);
  };

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Certificate" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border bg-white shadow-1">
            <div className="border-b px-6.5 py-4">
              <h3 className="font-semibold text-dark">Add | Edit Certificate</h3>
              <Link href="/facilitycenter/dashboard">
                <button
                  type="button"
                  className="float-right mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-white"
                >
                  Back
                </button>
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="hidden"
                    name="id"
                    value={user?._id}
                  />
                  <input
                    type="text"
                    id="title"
                    name="name"
                    value={user?.name || ""}
                    onChange={handleInputChange}
                    placeholder="Enter a Name"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="lastname"
                    value={user?.lastname || ""}
                    onChange={handleInputChange}
                    placeholder="Enter a Last Name"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Id
                  </label>
                  <input
                    type="email"
                    id="title"
                    name="email"
                    value={user?.email || ""}
                    onChange={handleInputChange}
                    placeholder="Enter a Email Id"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mobile No
                  </label>
                  <input
                    type="number"
                    id="title"
                    name="mobile"
                    value={user?.mobile || ""}
                    onChange={handleInputChange}
                    placeholder="Enter a Mobile No"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <textarea
                    id="title"
                    name="address"
                    value={user?.address || ""}
                    onChange={handleInputChange}
                    placeholder="Enter an Address"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  ></textarea>
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    SSM Number
                  </label>
                  {/* <a href={user.ssmFile} target="_blank" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                   SSM
                  </a> */}
                  <input
                    type="text"
                    id="ssm_number"
                    name="ssm"
                    value={user?.ssm || ""}
                    onChange={handleInputChange}
                    placeholder="Enter SSM Number"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="w-full mb-4.5">
                  <label htmlFor="ssmFile" className="mb-2 block text-sm font-medium text-gray-900">SSM Document</label>
                  <input
                    type="file"
                    name="ssmFile"
                    onChange={(e) => handleFileChange(e, "ssm")}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                 <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Directer IC Number
                  </label>
                  <input
                    type="text"
                    id="ssm_number"
                    name="dic"
                    value={user?.dic || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Directer IC Number"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="w-full mb-4.5">
                  <label htmlFor="dicFile" className="mb-2 block text-sm font-medium text-gray-900">Director IC Document</label>
                  <input
                    type="file"
                    name="dicFile"
                    onChange={(e) => handleFileChange(e, "dic")}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Municipal License Number
                  </label>
                  <input
                    type="text"
                    id="ml"
                    name="ml"
                    value={user?.ml || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Municipal License Number"
                    className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm"
                    required
                  />
                </div>
                <div className="w-full mb-4.5">
                  <label htmlFor="mlFile" className="mb-2 block text-sm font-medium text-gray-900">Municipal License Document</label>
                  <input
                    type="file"
                    name="mlFile"
                    onChange={(e) => handleFileChange(e, "ml")}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] text-white"
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

export default FormElements;
