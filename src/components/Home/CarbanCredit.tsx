import Image from 'next/image';
import Link from 'next/link';

const CarbonCredit: React.FC = () => {
  return (
    <section className="carbon-credit py-5 px-5 lg:px-0 lg:py-14">
      <div className="container mx-auto">
        <div>
          <div className="pb-5 lg:pb-[120px]">
            <h1 className="text-center font-extrabold text-primary text-2xl lg:text-4xl">
              Usedcomputer <span className="text-secondary"> Carbon Credit</span>.
              The currency of the Future.
            </h1>
          </div>
          <div className="flex flex-wrap relative pb-5 lg:pb-[120px]">
            <div className="profile flex-none w-full lg:w-6/12 relative">
              <Image
                src="/images/credit.jpeg"
                alt="Carbon Credit Image"
                className="h-auto max-w-full rounded"
                width={600}
                height={400}
              />
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center absolute bottom-0 left-0 right-0 mx-auto top-2/4 transform -translate-y-2/4">
                <svg
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3501 7.87891C14.3188 8.47266 14.3188 9.87891 13.3501 10.4727L2.3501 16.9727C1.3501 17.5664 0.100098 16.8477 0.100098 15.6602V2.66016C0.100098 1.37891 1.44385 0.847656 2.3501 1.37891L13.3501 7.87891Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="cards flex-none w-full lg:w-6/12 bg-white px-5 lg:px-10 py-3 lg:py-12 drop-shadow-2xl rounded my-5 lg:my-[60px] lg:ml-[-60px]">
              <h2 className="font-extrabold text-secondary text-2xl lg:text-4xl mb-2">
                What is Carbon Credit?
              </h2>
              <p className="font-normal text-info text-base">
                Watch our video to learn more about what makes our Carbon Credit the currency of the future.
              </p>
              <div className="box py-5 lg:py-7 border-b-2 border-dotted border-secondary lg:pl-12">
                <h4 className="font-bold text-primary text-xl">Lorem Ipsum</h4>
                <p className="font-normal text-info text-base">
                  A getting to know gadgets based totally on formalised coaching but with the help of digital resources.
                </p>
              </div>
              <div className="box py-5 lg:py-7 border-b-2 border-dotted border-secondary lg:pl-12">
                <h4 className="font-bold text-primary text-xl">Lorem Ipsum</h4>
                <p className="font-normal text-info text-base">
                  A getting to know gadgets based totally on formalised coaching but with the help of digital resources.
                </p>
              </div>
              <div className="box py-5 lg:py-7 border-b-2 border-dotted border-secondary lg:pl-12">
                <h4 className="font-bold text-primary text-xl">Lorem Ipsum</h4>
                <p className="font-normal text-info text-base">
                  A getting to know gadgets based totally on formalised coaching but with the help of digital resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarbonCredit;
