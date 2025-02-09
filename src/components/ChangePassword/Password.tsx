"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Layouts/Header";
import CustomerProfile from "@/components/Layouts/Profile";
import axios from "axios";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

const ChangePassword = () => {
    const [user, setUser] = useState<any>({});
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");  // To show success or error message
    const router = useRouter(); // Initialize useRouter hook

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.oldPassword) newErrors.oldPassword = "Old password is required.";
        if (!formData.newPassword) newErrors.newPassword = "New password is required.";
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setMessage("Access token is missing.");
                setIsLoading(false);
                return;
            }

            const apiUrl = `${process.env.API_URL}user/change-password`;
            console.log("API URL:", apiUrl);  // Check the URL in the console

            // Make the API call to update the password
            const updateResponse = await axios.post(
                apiUrl,
                {
                    id: user._id, // Ensure the user ID is correctly passed
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            console.log("Server Response:", updateResponse.data); // Log the response from the server

            if (updateResponse.data.status==="success") {
                setMessage("Password updated successfully!");
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                // Clear localStorage and redirect to login
                //localStorage.clear();
                router.push('/Logout');
            } else {
                setMessage("Failed to update password.");
            }
        } catch (error) {
            console.error("Error updating password:", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setMessage('Unauthorized: Access token is invalid or expired.');
                } else if (error.response?.status === 404) {
                    setMessage('Endpoint not found (404). Check your API URL and route.');
                } else {
                    setMessage(`An error occurred: ${error.message}`);
                }
            } else {
                setMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
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
                            <h3 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8 text-center">Change Password</h3>
                            <h1 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8">
                                HELLO {user?.name}!
                            </h1>
                            <CustomerProfile />
                        </div>
                    </fieldset>

                    <div className="pt-4 pb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="w-4/5 mx-auto">
                                <div className="mb-5">
                                    <input type="hidden" value={user?._id} readOnly />
                                </div>
                                {/* Old Password */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Old Password"
                                        style={{ width: "85%" }}
                                    />
                                    <br />
                                    {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
                                </div>

                                {/* New Password */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="New Password"
                                        style={{ width: "85%" }}
                                    />
                                    <br />
                                    {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-5 flex">
                                    <label className="mr-4 mt-2" style={{ width: "15%" }}>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="bg-light-gray w-full py-2 px-4 border-none placeholder:text-info"
                                        placeholder="Confirm Password"
                                        style={{ width: "85%" }}
                                    />
                                    <br />
                                    {errors.confirmPassword && <p className="text-red-500" style={{ width: "100%" }}>{errors.confirmPassword}</p>}
                                </div>

                                {message && <p className={`text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

                                <div className="text-center pt-10 mb-15 mx-auto">
                                    <button
                                        type="submit"
                                        className="rounded uppercase bg-secondary text-white py-1.5 px-12 font-extrabold text-24 hover:bg-[#1B5651]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Updating..." : "Update Password"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChangePassword;
