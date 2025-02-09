
"use clients";
import React, { useState } from "react";
import Image from "next/image";

const Productstwo = () => {
    const [value, setValue] = useState(0);
    
        const handleIncrement = () => setValue((prev) => prev + 1);
        const handleDecrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));
    
        const handleChange = (e) => {
            const newValue = parseInt(e.target.value, 10);
            setValue(isNaN(newValue) ? 0 : newValue);
        };
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-2 md:gap-5 xl:gap-10 border-b mb-4 md:mb-8 lg:mb-16 border-dashed border-primary">
            <div className="pb-5 md:pb-10 xl:pb-20">
                <img src="/images/i-4.png" alt="icon" className="w-48 mx-auto" />
                <h6 className="uppercase font-extrabold text-primary text-sm md:text-base xl:text-22 px-3">HOUSEHOLD APPLIANCES</h6>
                <div className="">
                    <p className="text-end px-4">Qty</p>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                MICROWAVE
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                TOASTER
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                ELECTRIC KETTLE
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                IRON
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                BLENDER/MIXER
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-5 md:pb-10 xl:pb-20">
                <img src="/images/i-5.png" alt="icon" className="w-48 mx-auto" />
                <h6 className="uppercase font-extrabold text-primary text-sm md:text-base xl:text-22 px-3">WHITE GOODS APPLIANCES</h6>
                <div className="">
                    <p className="text-end px-4">Qty</p>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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

                                FRIDGE
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                               <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                WASHING MACHINE
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                DISHWASHER
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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

                                FREEZER
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-5 md:pb-10 xl:pb-20">
                <img src="/images/i-6.png" alt="icon" className="w-48 mx-auto" />
                <h6 className="uppercase font-extrabold text-primary text-sm md:text-base xl:text-22 px-3">SMALL ELECTRONICS</h6>
                <div className="">
                    <p className="text-end px-4">Qty</p>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="inline-flex items-center">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="ripple-two"
                                data-ripple-dark="true"
                            >
                                <Image src="http://dev.usedcomputer.com.my:3000/uploads/products/0f27e01a-e714-4a69-9d32-3f7dad8e68d4.png" alt="Product Image" width={30} height={30}></Image>
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
                                GAME CONSOLE
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={value}
                                onChange={handleChange}
                                className="w-16 h-7 bg-light-gray p-1 text-sm text-primary font-bold text-center"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-7 h-7 bg-gray-300 text-primary font-bold rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productstwo;