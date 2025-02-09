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
    const [user, setUser] = useState<any>({});  // Use any for user if it's not strongly typed
    const [error, setError] = useState<string>("");
    const [stateData, setStateData] = useState<any[]>([]); // Specify the data type for stateData
    const [stateOriginal, setStateOriginal] = useState([]); // Specify the data type for stateData

    const [currentPage, setCurrentPage] = useState<number>(Number(params.page) || 1);
    const [limit, setLimit] = useState<number>(Number(params.limit) || process.env.DEFAULT_PAGE_LIMIT);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

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
            const result = await axios.get(`${process.env.API_URL}wallet`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log(result.data.ORIGINAL);
            setStateOriginal(result.data.ORIGINAL);
            if (Array.isArray(result.data.data)) {
                setStateData(result.data.data);

                setTotalPages(result.data.lastPage || 1);
            } else {
                setStateData([]);
            }
            console.log(result);
            console.log(stateData);
            console.log(stateOriginal);
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
                            <h3 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8 text-center">Wallet</h3>
                            <h1 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8">
                                HELLO {user?.name || "Guest"}!
                            </h1>
                            <CustomerProfileComponent />
                        </div>
                    </fieldset>

                    <div className="pt-4 pb-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                                
                                <div className="p-4">
                                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                        Credit
                                    </h5>
                                    <p className="text-slate-600 leading-normal font-light">
                                        Total Credit
                                    </p>
                                </div>
                                <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                                    <span className="text-sm text-slate-600 font-medium">{stateOriginal.totalCredit}</span>
                                </div>
                            </div>

                            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                                
                                <div className="p-4">
                                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                        Debit
                                    </h5>
                                    <p className="text-slate-600 leading-normal font-light">
                                        Total Debit
                                    </p>
                                </div>
                                <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                                    <span className="text-sm text-slate-600 font-medium">{stateOriginal.totalDebit}</span>
                                </div>
                            </div>

                            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                               
                                <div className="p-4">
                                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                        Balance
                                    </h5>
                                    <p className="text-slate-600 leading-normal font-light">
                                        Total Balance
                                    </p>
                                </div>
                                <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                                    <span className="text-sm text-slate-600 font-medium">{stateOriginal.balance}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            {/* <h1>Total Credit - {stateOriginal.totalCredit}</h1>
                            <p>Total Debit - {stateOriginal.totalDebit}</p>
                            <p>Total Balance - {stateOriginal.balance}</p> */}
                            {loading ? (
                                <div className="text-center py-4">Loading...</div>
                            ) : (
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">TransactionId</th>
                                            <th scope="col" className="px-6 py-3">Debit</th>
                                            <th scope="col" className="px-6 py-3">Credit</th>
                                            <th scope="col" className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stateData.map((wallet, index) => (
                                            <tr
                                                key={wallet.id || index}
                                                className={`border-b dark:border-gray-700 ${index % 2 === 0
                                                    ? "bg-gray-50 dark:bg-gray-800"
                                                    : "bg-white dark:bg-gray-900"
                                                    }`}
                                            >
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">{wallet.transactionId}</td>
                                                <td className="px-6 py-4">{wallet.debit}</td>
                                                <td className="px-6 py-4">{wallet.credit}</td>
                                                <td className="px-6 py-4">{wallet.status}</td>
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
