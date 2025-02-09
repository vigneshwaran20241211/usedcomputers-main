"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Layouts/Header";
import CustomerProfileComponent from "@/components/Layouts/Profile";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

interface ParamsInterface {
    page: number;
    limit: number;
}

const BookingHistory: React.FC<ParamsInterface> = (params: ParamsInterface) => {
    const accessToken = localStorage.getItem("accessToken");
    const router = useRouter();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [stateData, setStateData] = useState([]);
    const [stateNames, setStateNames] = useState<{ [key: string]: string }>({}); // Store state names here

    const [currentPage, setCurrentPage] = useState(Number(params.page) || 1);
    const [limit, setLimit] = useState(Number(params.limit) || process.env.DEFAULT_PAGE_LIMIT);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

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
            console.log("State name fetched:", response.data); // Log the fetched state name
            setStateNames((prevState) => ({
                ...prevState,
                [stateId]: response.data.title,
            }));
        } catch (error) {
            console.error(`Error fetching state name for ${stateId}:`, error);
        }
    };

    // Fetch data for bookings
    const fetchData = async (page: number) => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error("No access token found");
            setLoading(false);
            return;
        }

        try {
            const result = await axios.get(`${process.env.API_URL}booking/all?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (Array.isArray(result.data.data)) {
                setStateData(result.data.data);
                setTotalPages(result.data.lastPage || 1);

                // Fetch state names for each booking's stateId
                result.data.data.forEach((booking: any) => {
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
                        <h3 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8 text-center">Booking History</h3>
                            <h1 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8">
                                HELLO {user?.name}!
                            </h1>
                            <CustomerProfileComponent />
                        </div>
                    </fieldset>

                    <div className="pt-4 pb-4">
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
                                            <th scope="col" className="px-6 py-3">Product</th>
                                            <th scope="col" className="px-6 py-3">Booking Type</th>
                                            <th scope="col" className="px-6 py-3">Booking Session</th>
                                            <th scope="col" className="px-6 py-3">Booking Date</th>
                                            <th scope="col" className="px-6 py-3">Status</th>
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
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">{booking.bookingId}</td>
                                                <td className="px-6 py-4">
                                                    {stateNames[booking.stateId] || "No State..."} {/* Show state name or loading message */}
                                                </td>
                                                
                                                <td>
                                                    {booking.category[0]?.products?.map((product, i) => (
                                                        <div key={i}>
                                                            {product.title} - Quantity: {product.quantity} - Price: RM{product.price}
                                                        </div>
                                                    ))}
                                                </td>
                                                
                                                <td className="px-6 py-4">{booking.bookingType}</td>
                                                <td className="px-6 py-4">{booking.bookingDate}</td>
                                                <td className="px-6 py-4">{booking.bookingSession}</td>
                                                <td className="px-6 py-4">{booking.status}</td>
                                                <td className="px-6 py-4">
                                                    <Link href={`http://apidev.usedcomputer.com.my:3000/invoice/${booking.bookingId}.pdf`} target="blank"
                                                    className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >Document</Link>
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
                </div>
            </section>
        </div>
    );
};

export default BookingHistory;
