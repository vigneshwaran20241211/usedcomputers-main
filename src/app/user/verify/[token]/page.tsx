'use client';

import { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  params: { token: string };
}
const Activate: React.FC = ({ params }: Props) => {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  useEffect(()=>{
    axios.put(process.env.API_URL+'user/activate/' + params.token)
    .then((response)=>{
      sessionStorage.setItem('verifystatus', "Success");
      sessionStorage.setItem('verifymessage', "Your Account Activated Successfully");
      router.push('/login');
    })
    .catch((error)=> {
      sessionStorage.setItem('verifystatus', "Error");
      sessionStorage.setItem('verifymessage', "Token Expired");
      router.push('/login');
    });
  },[])
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-15">
          </div>
        </div>
        <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
          <div
            className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none"
            style={{
              background:
                "linear-gradient(198.17deg, #1B1E56 9.75%, #003456 49.05%, #5CA845 110.17%)",
            }}
          >
            <Link className="mb-10 inline-block" href="/">
              <Image
                className="mx-auto hidden dark:block"
                src={"/images/logo/edriver.png"}
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/edriver.png"}
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
            <h3
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3"
              style={{ color: "#fff" }}
            >
              New Here
            </h3>
            <h3
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3"
              style={{ color: "#fff" }}
            >
              Sign up and discover the benefits of our Carbon Credit.
              <br />
              For you and our planet.
            </h3>
            <Link href="/signup">
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                style={{ background: "#52a447" }}
              >
                SIGN UP
              </button>
            </Link>
            <div className="mt-31">
              <Image
                src={"/images/grids/grid-02.svg"}
                alt="Logo"
                width={405}
                height={325}
                className="mx-auto dark:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
