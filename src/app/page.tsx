import React from "react";
import Head from "next/head";
import Navbar from "@/components/Home/Navbar";
import BannerSection from "@/components/Home/BannerSection";
import WhoWeAreSection from "@/components/Home/WhoWeAreSection";
import HowItWorks from "@/components/Home/HowItWorks";
import Footer from "@/components/Home/Footer";
import CorporateWaste from "@/components/Home/CorporateWaste";
import Ad from "@/components/Home/Ad";
import News from "@/components/Home/News";
import Client from "@/components/Home/Client";
import CarbanCredit from "@/components/Home/CarbanCredit";
import ContactUs from "@/components/Home/Contactus";

export const metadata = {
  title: "Malaysia's No.1 E-Waste Solution Provider - UsedComputer.com.my",
  description:
    "TM Enviro Industries Sdn Bhd is Malaysia's No.1 E-Waste Solution Provider",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="font-montserrat">
        <Navbar />
        <BannerSection />
        <WhoWeAreSection />
        <HowItWorks />
        <Ad />
        <CorporateWaste />
        <Client />
        <CarbanCredit />
        <News />
        <Ad />
        <ContactUs/>
        <Footer />
      </div>
    </>
  );
}
