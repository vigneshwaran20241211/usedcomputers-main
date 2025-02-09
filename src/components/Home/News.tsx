"use client";
import Image from "next/image";
import React from "react";

const NewsSection: React.FC = () => {
  return (
    <section className="news bg-no-repeat bg-cover dots pt-5 pb-5 px-4 lg:px-4 lg:pt-14 lg:pb-[164px]">
      <style jsx>{`
        .profile {
          height: 220px;
        }
        .pcx
        {
          height: 230px;
        }
        @media (min-width: 768px) {
          .profile {
            height: 220px;
          }
           .pcx
          {
            height: 230px;
          }
        }
      `}</style>
      <div className="container mx-auto lg:pt-14">
        <div className="">
          <div className="flex items-center justify-center flex-wrap flex-col">
            <div className="badges text-center font-semibold bg-secondary text-white text-sm lg:text-xl py-0.5 uppercase rounded px-2.5 mb-4">
              News
            </div>
            <h1 className="text-center font-extrabold text-primary text-22 lg:text-40 pb-5 lg:pb-12">
              Our Latest Updates
            </h1>
          </div>
          <div className="flex flex-wrap">
            {/* Card 1 */}
            <div className="w-full md:w-3/6 lg:w-1/3 lg:px-6 pb-4">
              <div className="card bg-white drop-shadow-xl">
                <div className="profile lg:h-56 overflow-hidden">
                  <Image
                    src="/images/latest-update-3.jpeg"
                    alt="Sustainability News"
                    className="h-auto max-w-full"
                    width={500}
                    height={300}
                  />
                </div>
                <div className="profile-content px-4 lg:px-6 pt-6 pcx">
                  <span className="font-bold uppercase text-secondary text-sm pb-2 block">
                    SUSTAINABILITY
                  </span>
                  <h3 className="font-extrabold text-primary text-lg lg:text-2xl pb-4">
                    Why it is important to live sustainably?
                  </h3>
                  <p className="font-normal text-info text-base pb-5">
                    Duty obligations of business frequently occur pleasures enjoy...
                  </p>
                </div>
                <div className="flex flex-wrap justify-between border-t px-6 py-4">
                  <a href="#" className="font-bold text-black uppercase">
                    Read More
                  </a>
                  <div className="date font-normal text-info">6 Jul 2023</div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="w-full md:w-3/6 lg:w-1/3 lg:px-6 pb-4">
              <div className="card bg-white drop-shadow-xl">
                <div className="profile lg:h-56 overflow-hidden">
                  <Image
                    src="/images/latest-update-2.jpeg"
                    alt="Business News"
                    className="h-auto max-w-full"
                    width={500}
                    height={300}
                  />
                </div>
                <div className="profile-content px-4 lg:px-6 pt-6 pcx">
                  <span className="font-bold uppercase text-secondary text-sm pb-2 block">
                    BUSINESS
                  </span>
                  <h3 className="font-extrabold text-primary text-lg lg:text-2xl pb-4">
                    Kota Kinabalu is a new hub for used computers in Malaysia
                  </h3>
                  <p className="font-normal text-info text-base pb-5">
                    Duty obligations of business frequently occur pleasures enjoy...
                  </p>
                </div>
                <div className="flex flex-wrap justify-between border-t px-6 py-4">
                  <a href="#" className="font-bold text-black uppercase">
                    Read More
                  </a>
                  <div className="date font-normal text-info">6 Jul 2023</div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="w-full md:w-3/6 lg:w-1/3 lg:px-6 pb-4">
              <div className="card bg-white drop-shadow-xl">
                <div className="profile lg:h-56 overflow-hidden">
                  <Image
                    src="/images/latest-update-1.jpeg"
                    alt="Maxis News"
                    className="h-auto max-w-full"
                    width={500}
                    height={300}
                  />
                </div>
                <div className="profile-content px-4 lg:px-6 pt-6 pcx">
                  <span className="font-bold uppercase text-secondary text-sm pb-2 block">
                    BUSINESS
                  </span>
                  <h3 className="font-extrabold text-primary text-lg lg:text-2xl pb-4">
                    Maxis Berhad is now an official partner
                  </h3>
                  <p className="font-normal text-info text-base pb-5">
                    Duty obligations of business frequently occur pleasures enjoy...
                  </p>
                </div>
                <div className="flex flex-wrap justify-between border-t px-6 py-4">
                  <a href="#" className="font-bold text-black uppercase">
                    Read More
                  </a>
                  <div className="date font-normal text-info">6 Jul 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
