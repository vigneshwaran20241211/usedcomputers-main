import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';

const Footer = () => {
  return (
    <footer className="text-white bg-primary-100 pt-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="news-letter w-3/12 pr-4">
            <Image 
              src="/images/logo-white.png" 
              className="h-auto max-w-full pb-4" 
              alt="Logo" 
              width={200}  // Specify the width (adjust as needed)
              height={100} // Specify the height (adjust as needed)
            />
            <p className="text-base pb-6">Begin your journey in contributing towards a greener planet and our future.</p>
            <div className="subscribe pb-8 relative">
              <input 
                type="text" 
                className="w-full text-primary placeholder:text-gray-400 py-3.5 px-6 rounded focus:outline focus:outline-0 sm:text-sm/6" 
                placeholder="Subscribe with us" 
              />
              <i className="absolute right-3.5 top-2.5">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M23.3125 0.847656C24.1094 0.378906 25.1406 1.03516 24.9531 1.97266L21.5781 22.2227C21.4844 22.9727 20.6875 23.3945 20.0312 23.1133L14.2188 20.6289L11.2188 24.2852C10.5625 25.082 9.25 24.6602 9.25 23.5352V19.7383L20.5 6.00391C20.7344 5.72266 20.3594 5.39453 20.125 5.62891L6.67188 17.4883L1.65625 15.3789C0.8125 15.0508 0.71875 13.832 1.5625 13.3633L23.3125 0.847656Z" 
                    fill="#5CA845"
                  />
                </svg>
              </i>
            </div>
            <div className="quote pb-3">
              <Image 
                src="/images/quote.svg" 
                alt="quote" 
                width={200}  // Specify the width (adjust as needed)
                height={200} // Specify the height (adjust as needed)
                className="h-auto max-w-full"
              />
            </div>
          </div>
          <div className="links w-2/4 flex flex-wrap">
            <div className="px-5 w-2/4">
              <h6 className="font-extrabold text-secondary pb-6 text-xl">About</h6>
              <ul>
                <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <a href="#" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> About Us
                  </a>
                </li>
                <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <a href="#" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> Carbon Credit
                  </a>
                </li>
				<li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <a href="#" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> Contact Us
                  </a>
                </li>
                {/* Add other links similarly */}
              </ul>
            </div>
            <div className="w-2/4 px-7">
              <h6 className="font-extrabold text-secondary pb-6 text-xl">Quick Links</h6>
              <ul>
                <li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <a href="#" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> Lorem Ipsum
                  </a>
                </li>
				<li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <a href="#" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> News
                  </a>
                </li>
				<li className="pb-3.5 pt-3 border-b-2 border-dotted border-secondary">
                  <Link href="/login" className="flex items-center text-base">
                    <span className="pr-2.5">
                      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M6.38989 6.13184L2.13989 10.3818C1.82739 10.6943 1.35864 10.6943 1.07739 10.3818L0.358643 9.69434C0.0773926 9.38184 0.0773926 8.91309 0.358643 8.63184L3.38989 5.63184L0.358643 2.60059C0.0773926 2.31934 0.0773926 1.85059 0.358643 1.53809L1.07739 0.819336C1.35864 0.538086 1.82739 0.538086 2.13989 0.819336L6.38989 5.06934C6.67114 5.38184 6.67114 5.85059 6.38989 6.13184Z" 
                          fill="white"
                        />
                      </svg>
                    </span> Sign In / Sign Up
                  </Link>
                </li>
                {/* Add other quick links similarly */}
              </ul>
            </div>
          </div>
          <div className="channel w-1/4">
            <h6 className="font-extrabold text-secondary pb-6 text-xl">Watch Our Channel</h6>
            <div className="flex py-7 pt-0 border-b-2 border-dotted border-secondary">
              <div className="me-3">
                <Image 
      src="/images/watch-channel.jpeg" 
      alt="Channel" 
      width={100} 
      height={100} 
      className="h-auto max-w-full rounded-md" 
    />
              </div>
              <div>
                <h6 className="font-extrabold text-base pb-3">Carbon Credit. The currency of the Future</h6>
                <p className="text-sm text-white">Mar. 30, 2023</p>
              </div>
            </div>
            {/* Add more channel sections similarly */}
          </div>
          <div className="copyright py-5 border-t-2 border-info border-dotted w-full">
            <ul className="font-medium flex text-center mx-auto justify-center text-base">
              <li className="px-2">© 2023 Usedcomputer</li>
              <li className="px-2 border-s-2">All rights reserved</li>
              <li className="px-2 border-s-2">Designed by <a href="#" className="text-secondary">PlenitudeIT</a></li>
              <li className="px-2 border-s-2">Powered by <a href="#" className="text-secondary">Usedcomputer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;