"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CorporateWaste: React.FC = () => {
  return (
    <section className="corporate-e-waste bg-no-repeat bg-cover dots px-4 lg:px-0 py-5 lg:py-14">
      <div className="container mx-auto">
        <div>
          <div className="flex items-center justify-center flex-wrap flex-col">
            <div className="badges text-center font-semibold bg-secondary text-white text-sm lg:text-xl py-0.5 uppercase rounded px-2.5 mb-4">
              CORPORATE E-WASTE
            </div>
            <h1 className="text-center font-extrabold text-primary text-22 lg:text-40 pb-5 lg:pb-16">
              Be Part of our Partnership for a <span className="text-secondary">Greener</span> Future
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="profile rounded h-80 md:h-96 overflow-hidden relative lg:mb-14 mb-3">
                <Image
                  src="/images/corporate-1.jpeg"
                  alt="Corporate 1"
                  layout="fill"
                  className="h-full object-cover w-full max-w-full rounded"
                />
                <div className="profile-above-content text-center text-white absolute w-full bottom-4 px-3.5">
                  <div className="bg-secondary bg-opacity-75 py-6 px-7 rounded">
                    <h3 className="uppercase font-extrabold text-lg lg:text-2xl pb-1">ENVIRONMENTAL</h3>
                    <p className="lg:font-extrabold text-sm lg:text-base">Together We Protect Our Planet Earth</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="profile rounded h-80 md:h-96 overflow-hidden relative lg:mb-14 mb-3">
                <Image
                  src="/images/corporate-2.jpeg"
                  alt="Corporate 2"
                  layout="fill"
                  className="w-full object-cover h-full max-w-full rounded"
                />
                <div className="profile-above-content text-center text-white absolute w-full bottom-4 px-3.5">
                  <div className="bg-secondary bg-opacity-75 py-6 px-7 rounded">
                    <h3 className="uppercase font-extrabold text-lg lg:text-2xl pb-1">SOCIAL</h3>
                    <p className="lg:font-extrabold text-sm lg:text-base">We believe in reward for Each Disposal</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="profile rounded h-80 md:h-96 overflow-hidden relative lg:mb-14 mb-3">
                <Image
                  src="/images/corporate-3.jpeg"
                  alt="Corporate 3"
                  layout="fill"
                  className="w-full object-cover h-full max-w-full rounded"
                />
                <div className="profile-above-content text-center text-white absolute w-full bottom-4 px-3.5">
                  <div className="bg-secondary bg-opacity-75 py-6 px-7 rounded">
                    <h3 className="uppercase font-extrabold text-lg lg:text-2xl pb-1">GOVERNANCE</h3>
                    <p className="lg:font-extrabold text-sm lg:text-base">Ethical in Achieving A Greener Future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-primary text-22 lg:text-40 pb-3 p-[40px]">
              Improve your corporate ESG with us. Discover how your company can benefit from our <span className="text-secondary">Carbon Credit System.</span>
            </h3>
            <p className="font-normal italic text-info text-lg lg:text-3xl pb-4 lg:pb-11 p-[40px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="learn-more p-[40px]">
            <a href="#" className="font-extrabold text-primary flex flex-wrap items-center text-xl">
              Learn more
              <span className="pl-4">
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.4588 21.5C41.4588 32.8416 32.4598 42 21.4026 42C10.3455 42 1.34644 32.8416 1.34644 21.5C1.34644 10.1584 10.3455 1 21.4026 1C32.4598 1 41.4588 10.1584 41.4588 21.5Z" stroke="#5CA845" strokeWidth="2" />
                  <path d="M32.7465 22.0607C33.3323 21.4749 33.3323 20.5251 32.7465 19.9393L23.2006 10.3934C22.6148 9.80761 21.6651 9.80761 21.0793 10.3934C20.4935 10.9792 20.4935 11.9289 21.0793 12.5147L29.5646 21L21.0793 29.4853C20.4935 30.0711 20.4935 31.0208 21.0793 31.6066C21.6651 32.1924 22.6148 32.1924 23.2006 31.6066L32.7465 22.0607ZM9.16064 22.5L31.6859 22.5L31.6859 19.5L9.16064 19.5L9.16064 22.5Z" fill="#5CA845" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateWaste;
