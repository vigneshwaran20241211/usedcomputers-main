// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';
import '@/css/input.css';
import '@/css/output.css';

const BannerSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="relative w-full h-auto">
    <Image 
      src="/images/banner.jpg" 
      alt="Banner Image" 
      width={1300}  // Base width of the image (used for aspect ratio calculation)
      height={600}  // Base height of the image (used for aspect ratio calculation)
      layout="responsive"  // Makes the image responsive and adjusts according to container width
    />
  </div>
      <div className="absolute bottom-[-294px]">
        <div>
          <div className="iphone-template">
            <div className="drive bg-no-repeat bg-cover">
              <div className="grid grid-cols-3 justify-around place-items-center">
                <div className="circle w-24">
<Image 
    src="/images/i-1.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Computer Products</h6>
                </div>
                <div className="circle w-24">
                  <Image 
    src="/images/i-2.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">TV/LED Display</h6>
                </div>
                <div className="circle w-24">
                  <Image 
    src="/images/i-3.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Smart Phones & Gadgets</h6>
                </div>
                <div className="circle w-24">
                 <Image 
    src="/images/i-4.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Household Appliances</h6>
                </div>
                <div className="circle w-24">
                 <Image 
    src="/images/i-5.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">White Goods Appliances</h6>
                </div>
                <div className="circle w-24">
                 <Image 
    src="/images/i-6.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Small Electronics</h6>
                </div>
                <div className="circle w-24">
                  <Image 
    src="/images/i-7.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />                  <h6 className="font-semibold text-center text-sm text-white mb-2">Air-Cond & Room Heater</h6>
                </div>
                <div className="circle w-24">
                  <Image 
    src="/images/i-8.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Gym Equipment</h6>
                </div>
                <div className="circle w-24">
                  <Image 
    src="/images/i-9.png" 
    alt="Computer" 
    className="h-auto max-w-full" 
    width={500} // Add the base width
    height={300} // Add the base height
    layout="intrinsic" // Automatically adjusts the size while maintaining aspect ratio
  />
                  <h6 className="font-semibold text-center text-sm text-white mb-2">Network Equipment</h6>
                </div>
              </div>
              <div className="flex flex-wrap w-full px-4">
                <div className="search-bar w-full mb-9 mt-7 relative">
                  <input
                    type="text"
                    className="text-sm form-control w-full h-7 rounded px-2 text-primary"
                    placeholder="Enter Your Location"
                  />
                  <span className="absolute right-2 top-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.7676 14.834C17.0664 15.166 17.0664 15.6641 16.7344 15.9629L15.8047 16.8926C15.5059 17.2246 15.0078 17.2246 14.6758 16.8926L11.3887 13.6055C11.2227 13.4395 11.1562 13.2402 11.1562 13.041V12.4766C9.96094 13.4062 8.5 13.9375 6.90625 13.9375C3.08789 13.9375 0 10.8496 0 7.03125C0 3.24609 3.08789 0.125 6.90625 0.125C10.6914 0.125 13.8125 3.24609 13.8125 7.03125C13.8125 8.6582 13.248 10.1191 12.3516 11.2812H12.8828C13.082 11.2812 13.2812 11.3809 13.4473 11.5137L16.7676 14.834ZM6.90625 11.2812C9.23047 11.2812 11.1562 9.38867 11.1562 7.03125C11.1562 4.70703 9.23047 2.78125 6.90625 2.78125C4.54883 2.78125 2.65625 4.70703 2.65625 7.03125C2.65625 9.38867 4.54883 11.2812 6.90625 11.2812Z"
                        fill="#9199AB"
                      />
                    </svg>
                  </span>
                </div>
                <div className="button w-full mx-8">
                  <Link href="/login"><button className="btn bg-secondary text-white rounded font-extrabold p-3 w-full">
                    DISPOSE E-WASTE NOW
                  </button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
