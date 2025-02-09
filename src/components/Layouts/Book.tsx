

"use client";
import ProductsThree from "@/components/Layouts/Productsthree";
import Header from "@/components/Layouts/Header";
import Partb from "@/components/Layouts/Partb"
import Partc from "@/components/Layouts/Partc"
import Steps from "@/components/Layouts/Steps";
import CustomerProfile from "@/components/Layouts/Profile";
import { useEffect, useState } from "react";

const Book = ({ formData, onChange }) => {
    const [user, setUser] = useState({});
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('userDetails')));
        console.log(user)
    },[])
    return (
        <div>
            {/* Header Section */}
            <header className="flex items-center flex-wrap pb-6">
                <Header></Header>
            </header>
            {/* Multi-Step Section */}
            <section>
                <Steps></Steps>

                {/* User Details Section */}

                <div className="container mx-auto">
                    <fieldset className="px-4 lg:px-0">
                        <div className="basic-detail">
                            <h1 className="text-primary uppercase text-22 lg:text-64 xl:text-64 pb-4 lg:pb-8 hellouser">
                                HELLO {user.name} !
                            </h1>
                            <CustomerProfile/>
                        </div>
                        <div className="question">
                            <div className="flex items-center my-8 space-x-4">
                                <span className="font-semibold text-primary text-30 md:text-34 xl:text-64 hellouser">
                                    A.
                                </span>
                                <h6 className="active-linear-gradient rounded-full p-3 lg:p-4 text-white font-bold uppercase text-base lg:text-22 xl:text-28 flex-grow ainside">
                                    PLEASE CHOOSE THE ITEMS THAT REQUIRE DISPOSAL FROM THE LIST BELOW
                                </h6>
                            </div>
                        </div>
                        <ProductsThree></ProductsThree>
                        <Partb></Partb>
                        <Partc></Partc>
                    </fieldset>
                </div>
            </section>
        </div>

    );
}

export default Book;