"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ParamsInterface {
    page: number;
    limit: number;
}

const Products = (params: ParamsInterface) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const fetchData = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Authentication error. Please log in.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${process.env.API_URL || ""}product/all?page=1&limit=100`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
               
            } else {
                setError("Failed to fetch products. Please try again.");
            }
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleQuantityChange = (productId: string, increment: boolean) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] || 0) + (increment ? 1 : -1)),
        }));
    };

    // Group products by category
    const groupedData = data.reduce((acc: Record<string, any[]>, product) => {
        const categoryTitle = product?.category?.title || "Unknown Category";
        if (!acc[categoryTitle]) acc[categoryTitle] = [];
        acc[categoryTitle].push(product);
        return acc;
    }, {});

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3 sm:grid-cols-1">
            {Object.entries(groupedData).map(([category, products]) => {
                const categoryImage = products[0]?.category?.image || "/images/default-image.jpg";

                return (
                    <div key={category} className="flex-4 border p-4 w-full md:w-1/4 sm:grid sm:grid-cols-1">
                        {/* Category Header */}
                        <div className="text-center mb-4">
                            <Image
                                src={categoryImage}
                                alt={`${category} Icon`}
                                height={100}
                                width={100}
                                className="mx-auto"
                            />
                            <h3 className="text-lg font-bold text-primary mt-2">{category}</h3>
                        </div>
                        {/* Product List */}
                        <div className="grid grid-cols-1 gap-4">
                        <p className="text-end px-4">Qty</p>
                            {products.map((product) => (
                                <div key={product.id} className="pb-5">
                                    
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="inline-flex items-center">
                                            <label
                                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                                htmlFor="ripple-two"
                                                data-ripple-dark="true"
                                            >
                                                <Image
                                                    src={product.logo_url || "/images/default-product.jpg"}
                                                    alt={product.title || "Unnamed Product"}
                                                    width={30}
                                                    height={30}
                                                />
                                                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </label>
                                            <label className="text-sm md:text-base xl:text-20" htmlFor="ripple-two">
                                            {product.title || "Unnamed Product"}
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                 onClick={() => handleQuantityChange(product.id, false)}
                                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                                            >
                                                -
                                            </button>
                                            <input
                                                 type="number"
                                                 value={quantities[product.id] || 0}
                                                 readOnly
                                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                                            />
                                            <button
                                                 onClick={() => handleQuantityChange(product.id, true)}
                                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>

    );
};

export default Products;
