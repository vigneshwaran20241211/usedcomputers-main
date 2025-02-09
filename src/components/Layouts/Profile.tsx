"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const CustomerProfile = ({ formData, onChange }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userDetails')));
        console.log(user)
    }, [])

    return (

        <>
            <h3 className="text-primary font-bold text-base lg:text-24 xl:text-34 pb-4 lg:pb-8 userdetails">USER DETAILS</h3>
            <div className="border border-dashed border-primary"></div>
            <div className="user-information py-4 lg:py-8 grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <div className="flex flex-wrap mt-3">
                        <label className="text-secondary text-sm lg:text-22 userproinfo">Name: {user.name}</label>
                    </div>
                    <div className="flex flex-wrap mt-3">
                        <label className="text-secondary text-sm lg:text-22 userproinfo">Email: {user.email}</label>
                    </div>
                    {/* <div className="flex flex-wrap mt-3">
                        <label className="text-secondary text-sm lg:text-22 userproinfo">Company:</label>
                    </div> */}
                </div>
                <div>
                    <div className="flex flex-wrap mt-3">
                        <label className="text-secondary text-sm lg:text-22 mt-2 userproinfo">Contact Number: {user.mobile}</label>
                    </div>
                    <div className="flex flex-wrap mt-3">
                        <label className="text-secondary text-sm lg:text-22 mt-2 userproinfo">Address: {user.address}</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfile;