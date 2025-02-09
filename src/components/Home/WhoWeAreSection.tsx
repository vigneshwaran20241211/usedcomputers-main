// components/WhoWeAreSection.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';

const WhoWeAreSection: React.FC = () => {
  return (
    <section className="who-we-are bg-no-repeat bg-cover dots pt-5 pb-5 px-4 lg:px-0 lg:pt-[50px] lg:pb-[140px]" id="aboutus">
       <style jsx>{`
        @media (min-width: 768px) {
          .whoare {
          float:right;
          margin-left:auto;
        }
        }
      `}</style>
      <div className="container mx-auto" id="whmob">
        <div className="ml-[30px]">
          <div className="provider lg:pl-[540px]">
            <h1 className="font-extrabold text-primary text-22 lg:text-38 pb-2">
              Malaysia’s Leading <span className="text-secondary">E-Waste</span> Solution Provider
            </h1>
            <p className="italic text-info text-lg lg:text-2xl">
              Your green solution to an efficient and reliable disposal of your electronic waste management system.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 pt-5 lg:pt-[124px]">
            <div className="who-left">
              <div className="text-center font-semibold inline-flex flex-wrap flex-col">
                <div className="badges text-center font-semibold bg-secondary text-white text-sm lg:text-xl py-0.5 uppercase rounded px-2.5 mb-4">
                  WHO WE ARE
                </div>
              </div>

              <h1 className="font-extrabold text-primary text-22 lg:text-38 pb-6">
                Your <span className="text-secondary">green</span> partner, anyplace, at your own convenience.
              </h1>
              <div className="quote">
                <p className="italic text-info text-sm lg:text-xl border-l-2 pl-4 border-secondary mb-4">
                  With over <span className="font-bold">10 years</span> experience in E-Waste collection and
                  processing management.
                </p>
              </div>
              <div className="learn-more py-4 lg:py-7">
                <Link href="#" legacyBehavior>
                  <a className="font-extrabold text-primary flex flex-wrap items-center text-xl">
                    Learn more
                    <span className="pl-4">
                      <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M41.4588 21.5C41.4588 32.8416 32.4598 42 21.4026 42C10.3455 42 1.34644 32.8416 1.34644 21.5C1.34644 10.1584 10.3455 1 21.4026 1C32.4598 1 41.4588 10.1584 41.4588 21.5Z"
                          stroke="#5CA845"
                          strokeWidth="2"
                        />
                        <path
                          d="M32.7465 22.0607C33.3323 21.4749 33.3323 20.5251 32.7465 19.9393L23.2006 10.3934C22.6148 9.80761 21.6651 9.80761 21.0793 10.3934C20.4935 10.9792 20.4935 11.9289 21.0793 12.5147L29.5646 21L21.0793 29.4853C20.4935 30.0711 20.4935 31.0208 21.0793 31.6066C21.6651 32.1924 22.6148 32.1924 23.2006 31.6066L32.7465 22.0607ZM9.16064 22.5L31.6859 22.5L31.6859 19.5L9.16064 19.5L9.16064 22.5Z"
                          fill="#5CA845"
                        />
                      </svg>
                    </span>
                  </a>
                </Link>
              </div>
              <h6 className="font-black uppercase text-secondary text-sm lg:text-xl mb-3 flex items-center">
                <span>
                  <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.5001 38.3C16.0001 33.6334 4.50004 21.8 21.5001 7.80005M21.5001 38.3V31.3V7.80005M21.5001 38.3C38 22.8 27.0002 13.4667 21.5001 7.80005"
                      stroke="#5CA845"
                      strokeWidth="2"
                    />
                    <path d="M29 17.3L21.5 22.8L13.5 17.3" stroke="#5CA845" strokeWidth="2" />
                    <path d="M30 26.3L21.5 30.8L13 26.8" stroke="#5CA845" strokeWidth="2" />
                  </svg>
                </span>
                GREEN TIPS:
              </h6>
              <h5 className="font-extrabold text-primary text-sm lg:text-xl">
                Don’t just simply throw them away. Let us pay you in cash for your E-Waste and collect your{' '}
                <span className="font-black text-secondary">Carbon Credits.</span>
              </h5>
            </div>
            <div className="who-right whoare">
              <Image
                src="/images/waste.jpeg"
                alt="E-Waste"
                width={500} // Adjust the width as needed
                height={500} // Adjust the height as needed
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
