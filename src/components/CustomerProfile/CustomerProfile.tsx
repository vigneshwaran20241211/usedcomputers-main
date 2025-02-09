"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Layouts/Header";
import CustomerProfileComponent from "@/components/Layouts/Profile";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const CustomerProfile = ({ formData, onChange }) => {
    //const [user, setUser] = useState({}); // Initialize user state with an empty object.
    const accessToken = localStorage.getItem("accessToken");
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        mobile: "",
        address: "",
    });
    const [error, setError] = useState("");
    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic (for now you can log or send a request to an API)
        if (!accessToken) {
            setError("No access token found. Please log in.");
            console.error("No access token found. Please log in.");
            return; // Exit early if no token
        }

        console.log("Updated user data: ", user);
        // Add logic to send updated user data to server, e.g. using axios
        try {
            const response = axios.put(
                `${process.env.API_URL}user/${user._id}`,
                 user,
                 {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                  },
            );
            //alert("Customer Profile Updated")
            toast.success("Profile updated successfully!!", { position: "top-right" });
            router.push("/login");
            console.log('Profile updated successfully!', response);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            {/* Header Section */}
            <header className="flex items-center flex-wrap pb-6">
                <Header />
            </header>
            {/* Multi-Step Section */}
            <section className="m-5">
                <div className="container mx-auto">
                    <fieldset className="px-4 lg:px-0">
                        <div className="basic-detail">
                            <h1 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8">
                                HELLO {user?.name}!
                            </h1>
                            {/* Assuming CustomerProfileComponent is another component */}
                            <CustomerProfileComponent />
                        </div>
                    </fieldset>

                    <div className="pt-4 pb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="w-4/5 mx-auto">
                                {/* Hidden input for user ID */}
                                <div className="mb-5">
                                    <input type="hidden" value={user?._id} readOnly />
                                </div>
                                {/* First Name Input */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>First Name</label>
                                    <input
                                        type="text"
                                        name="name" // Corrected name
                                        value={user?.name || ''}
                                        onChange={handleInputChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="First Name"
                                        style={{ width: "85%" }}
                                    />
                                </div>
                                 {/* First Name Input */}
                                 <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname" // Corrected name
                                        value={user?.lastname || ''}
                                        onChange={handleInputChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Last Name"
                                        style={{ width: "85%" }}
                                    />
                                </div>

                               
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email" // Corrected name
                                        value={user?.email || ''}
                                        readOnly
                                        onChange={handleInputChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Email"
                                        style={{ width: "85%" }}
                                    />
                                </div>

                                {/* Mobile No Input */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Mobile No</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={user?.mobile || ''}
                                        onChange={handleInputChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Mobile No"
                                        style={{ width: "85%" }}
                                    />
                                </div>

                                {/* Address Input */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Address</label>
                                    <textarea
                                        name="address"
                                        value={user?.address || ''}
                                        onChange={handleInputChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Address"
                                        style={{ width: "85%" }}
                                    />
                                </div>

                                {/* Add more fields for other profile information as needed */}

                                <div className="text-center pt-10 mb-15">
                                    <button
                                        type="submit"
                                        className="rounded uppercase bg-secondary text-white py-1.5 px-12 font-extrabold text-24 hover:bg-[#1B5651]mx-auto"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerProfile;
