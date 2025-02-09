"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  // Create refs for the button and menu
  const buttonRef = useRef<SVGSVGElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure that buttonRef and menuRef are not null
    const button = buttonRef.current;
    const menu = menuRef.current;

    // Check if both button and menu are available before adding event listeners
    if (button && menu) {
      const toggleMenu = () => {
        menu.classList.toggle('hidden');
      };

      // Add the event listener to the button
      button.addEventListener('click', toggleMenu);

      // Cleanup the event listener on component unmount
      return () => {
        button.removeEventListener('click', toggleMenu);
      };
    }

    // If button or menu is not found, log an error to help with debugging
    if (!button) {
      console.error('Menu button not found!');
    }

    if (!menu) {
      console.error('Menu element not found!');
    }
  }, []);

  return (
    <header className="absolute top-0 z-50 w-full">
      <nav className="flex flex-wrap items-center justify-between w-full md:py-0 lg:px-4 text-lg text-white mobile-nav-back">
        <div className="ps-3 lg:ps-0">
          <a href="#">
            <Image
              unoptimized
              src="/images/logo.png"
              alt="Logo"
              width={310}  // Define the width of the image
              height={100} // Define the height of the image
            />
          </a>
        </div>

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          ref={buttonRef} // Use ref for the button
          className="me-4 lg:me-0 h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg> */}
        <svg
  xmlns="http://www.w3.org/2000/svg"
  ref={buttonRef} // Use ref for the button
  className="me-4 lg:me-0 h-6 w-6 cursor-pointer md:hidden block"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  style={{ color: '#000', backgroundColor: 'var(--bg-primary)', marginRight: 'auto' }}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>

        <div className="hidden w-full md:flex md:items-center md:w-auto bg-primary lg:bg-transparent"
          ref={menuRef} // Use ref for the menu
        >
          <ul className="uppercase pt-4 text-xs xl:text-sm text-white font-bold md:flex md:justify-between md:pt-0 px-5 lg:px-0">
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#banner">Home</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#aboutus">ABOUT US 12</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#howit">HOW IT WORKS</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#corporatewaste">CORPORATE E-WASTE</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#carbancredit">CARBON CREDIT</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#">Event Booking</a></li>
            <li><a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#contactus">Contact</a></li>
            <li>
              <a className="md:p-1 xl:p-3.5 py-5 lg:py-2 block text-xs xl:text-sm" href="#">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.4055 15.1673C17.7043 15.4994 17.7043 15.9974 17.3723 16.2962L16.4426 17.2259C16.1438 17.5579 15.6458 17.5579 15.3137 17.2259L12.0266 13.9388C11.8606 13.7728 11.7942 13.5736 11.7942 13.3744V12.8099C10.5989 13.7396 9.13794 14.2708 7.54419 14.2708C3.72583 14.2708 0.637939 11.1829 0.637939 7.36459C0.637939 3.57943 3.72583 0.458336 7.54419 0.458336C11.3293 0.458336 14.4504 3.57943 14.4504 7.36459C14.4504 8.99154 13.886 10.4525 12.9895 11.6146H13.5208C13.72 11.6146 13.9192 11.7142 14.0852 11.847L17.4055 15.1673ZM7.54419 11.6146C9.86841 11.6146 11.7942 9.72201 11.7942 7.36459C11.7942 5.04037 9.86841 3.11459 7.54419 3.11459C5.18677 3.11459 3.29419 5.04037 3.29419 7.36459C3.29419 9.72201 5.18677 11.6146 7.54419 11.6146Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
