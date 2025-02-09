// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works py-14 pt-[174px]">
      <div className="container mx-auto">
        <div>
          <div className="text-center font-semibold flex items-center justify-center flex-wrap flex-col">
            <div className="badges text-center font-semibold bg-secondary text-white text-xl py-0.5 uppercase rounded px-2.5 mb-4">
              HOW IT WORKS
            </div>
            <h1 className="text-white font-semibold uppercase text-40 pb-16">
              SIMPLE STEPS ON E-WASTE DISPOSAL & COLLECTION
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
                <Image
        src="/images/how-1.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 01</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Select category of items on our collection E-driver
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Choose the preferred category of electronics that you wish to dispose
                </p>
              </div>
            </div>

            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
               <Image
        src="/images/how-2.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 02</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Choose your preferred location for disposal
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Select the area of your location for arrangement for our collection team
                </p>
              </div>
            </div>

            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
               <Image
        src="/images/how-3.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 03</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Login or Sign up to register
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Enter your login credentials or register for new users
                </p>
              </div>
            </div>

            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
               <Image
        src="/images/how-4.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 04</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Select your electronic items for disposal
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Choose the particular items that you wish to dispose
                </p>
              </div>
            </div>

            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
               <Image
        src="/images/how-5.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 05</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Complete your details and particulars
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Fill up the required information on the form and submit
                </p>
              </div>
            </div>

            <div className="card bg-white rounded drop-shadow-5xl">
              <div className="profile h-60 overflow-hidden">
             <Image
        src="/images/how-6.jpeg"
        alt="Step 01"
        className="rounded-t h-auto max-w-full"
        width={500}  // You can adjust the width as per your design
        height={300} // You can adjust the height as per your design
      />
              </div>
              <div className="profile-content p-9">
                <h3 className="font-extrabold text-secondary uppercase text-xl pb-4">Step 06</h3>
                <h2 className="font-extrabold text-primary text-22 pb-4 border-b-2 border-dotted border-info">
                  Earn cash back rewards and our Carbon Credits
                </h2>
                <p className="italic font-normal text-info pt-4 text-base">
                  Learn how much can you earn and discover your contribution to sustainability
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;