"use client";
import Image from 'next/image';
import '@/css/input.css';
import '@/css/output.css';
import Link from 'next/link';
import MyAutocomplete from './MyAutocomplete';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BannerSection: React.FC = () => {
  const [location, setLocation] = useState<string | null>(localStorage.getItem('state'));
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleLocationChange = (newLocation: string | null) => {
    console.log('Location selected:', newLocation); // Debugging
    setLocation(newLocation);
    if (newLocation) {
      localStorage.setItem('state', newLocation); // Update localStorage with valid location
      setErrorMessage(''); // Clear error message
    } else {
      localStorage.removeItem('state'); // Remove invalid or empty location
    }
  };

  const handleDisposeNowClick = () => {
    console.log('Location on click:', localStorage.getItem('state'));
    if (!localStorage.getItem('state')) {
      setErrorMessage('Please select a location first.');
    } else {
      setErrorMessage('');
      if (!localStorage.getItem('accessToken')) {
        router.push('/login');
      } else {
        router.push('/booking');
      }
    }
  };

  return (
    <section className="relative">
      <style jsx>{`
        .banner {
          display: none;
        }

        .drive {
          background-image: none;
        }
        .bck {
          background: linear-gradient(140deg, rgba(2, 0, 36, 1) 0%, rgb(50 115 77) 0%, rgba(92, 168, 69, 1) 100%);
        }
        .static {
          margin-bottom: -100px;
        }
        @media (min-width: 768px) {
          .banner {
            display: block;
          }
          .drive {
            background-image: url('/images/iphone.png');
          }
          .static {
            margin-bottom: 0px;
          }
          .bck {
            background: rgb(2, 0, 36);
            background: linear-gradient(140deg, rgba(2, 0, 36, 1) 0%, rgba(0, 52, 86, 1) 0%, rgba(92, 168, 69, 1) 100%);
            padding: -20px;
            border-radius: 25px;
          }
        }
      `}</style>

      <div className="banner" id="banner">
        <Image
          src="/images/banner.jpg"
          alt="Banner Image"
          width={1300}
          height={600}
          unoptimized
          layout="responsive"
        />
      </div>

      <div className="static lg:absolute bottom-[-370px] md:bottom-[-300px]">
        <div className="mobile-back">
          <div className="iphone-template">
            <div className="drive bg-no-repeat bg-contain lg:bg-cover">
            <div className="grid pho grid-cols-3 justify-around place-items-center">
                <div className="circle">
                  <Image
                    src="/images/i-1.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Computer Products
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-2.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  TV/LED Display
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-3.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Smart Phones & Gadgets
                  </h6>
                </div>
                <div className="">
                  <Image
                    src="/images/i-4.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Household Appliances
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-5.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  White Goods Appliances
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-6.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Small Electronics
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-7.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Air-Cond & Room Heater
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-8.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Gym Equipment
                  </h6>
                </div>
                <div className="circle">
                  <Image
                    src="/images/i-9.png"
                    alt="Computer"
                    className="h-auto max-w-full product-icon-mobile"
                    width={500} // Base width
                    height={300} // Base height
                    unoptimized
                    layout="intrinsic" // Adjusts size while maintaining aspect ratio
                  />
                  <h6 className="font-normal lg:font-semibold text-center text-xxs lg:text-sm text-white mb-1 lg:mb-2 product-name-mobile">
                  Network Equipment
                  </h6>
                </div>
                {/* Add other icons similarly */}
              </div>
              <div className="flex flex-wrap w-full px-4">
                <div className="search-bar w-full relative mx-14 lg:mx-0">
                  <MyAutocomplete onChange={handleLocationChange} />
                </div>

                {errorMessage && (
                  <div className="text-center w-full text-red mx-10 lg:mx-8 mt-2">
                    {errorMessage}
                  </div>
                )}

                <div className="button w-full mx-14 lg:mx-8">
                  <button
                    onClick={handleDisposeNowClick}
                    className="btn bg-secondary mt-4 text-white rounded font-extrabold p-2 py-3 lg:p-3 w-full lg:text-lg text-xs hover:bg-[#1B5651]"
                  >
                    DISPOSE E-WASTE NOW
                  </button>
                </div>

                {localStorage.getItem('accessToken') === null ? (
                  <div className="button w-full mx-14 lg:mx-8">
                    <Link href="/login">
                      <button className="btn bg-secondary text-white mt-4 rounded font-extrabold p-2 py-3 lg:p-3 w-full lg:text-lg text-xs hover:bg-[#1B5651]">
                        Login / Register
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="button w-full mx-14 lg:mx-8">
                    <Link href="/Logout">
                      <button className="btn bg-secondary text-white mt-4 rounded font-extrabold p-2 py-3 lg:p-3 w-full lg:text-lg text-xs hover:bg-[#1B5651]">
                        Logout
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
