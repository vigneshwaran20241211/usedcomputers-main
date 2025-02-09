// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works px-4 lg:px-0 py-5 lg:py-14 lg:pt-[174px]"id="howit">
        <div className="container mx-auto">
            <div>
                <div className="text-center font-semibold flex items-center justify-center flex-wrap flex-col">
                    <div className="badges text-center font-semibold bg-secondary text-white text-sm lg:text-xl py-0.5 uppercase rounded px-2.5 mb-4">
                        HOW IT WORKS
                    </div>
                    <h1 className="text-white font-semibold uppercase text-2xl lg:text-4xl pb-5 lg:pb-16">
                        SIMPLE STEPS ON E-WASTE DISPOSAL & COLLECTION
                    </h1>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 p-[40px]">
                    
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="card bg-white rounded drop-shadow-lg">
                            <div className="profile lg:h-60 overflow-hidden">
                                <Image src={`/images/how-${index + 1}.jpeg`} alt={`Step ${index + 1}`} 
                                className="rounded-t h-auto max-w-full"
                                width={424}
                                height={595}
                                />
                            </div>
                            <div className="profile-content p-4 lg:p-9">
                                <h3 className="font-extrabold text-secondary uppercase text-base lg:text-xl pb-3 lg:pb-4">
                                    Step {String(index + 1).padStart(2, '0')}
                                </h3>
                                <h2 className="font-extrabold text-primary text-lg lg:text-22 pb-4 border-b-2 border-dotted border-info">
                                    {getStepTitle(index + 1)}
                                </h2>
                                <p className="italic font-normal text-info pt-4 text-base">
                                    {getStepDescription(index + 1)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     </section>
  );
};

function getStepTitle(step) {
  const titles = [
    "Select category of items on our collection E-driver",
    "Choose your preferred location for disposal",
    "Login or Sign up to register",
    "Select your electronic items for disposal",
    "Complete your details and particulars",
    "Earn cash back rewards and our Carbon Credits"
  ];
  return titles[step - 1];
}

function getStepDescription(step) {
  const descriptions = [
    "Choose the preferred category of electronics that you wish to dispose",
    "Select the area of your location for arrangement for our collection team",
    "Enter your login credentials or register for new users",
    "Choose the particular items that you wish to dispose",
    "Fill up the required information on the form and submit",
    "Learn how much can you earn and discover your contribution to sustainability"
  ];
  return descriptions[step - 1];
}

export default HowItWorks; 
