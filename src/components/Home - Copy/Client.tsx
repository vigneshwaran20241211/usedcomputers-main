import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ClientProps = {};

const Client: React.FC<ClientProps> = () => {
  return (
    <section className="client py-14">
      <div className="">
        <div className="">
          <div className="flex items-center justify-center flex-wrap flex-col">
            <div className="badges text-center font-semibold bg-secondary text-white text-xl py-0.5 uppercase rounded px-2.5 mb-4">
              OUR Clients
            </div>
          </div>
          <div className="grid grid-cols-6 gap-12 client-list pt-16 pb-20 items-center place-items-center">
            {clients.map((client, index) => (
              <div key={index} className="">
                <Image src={client.src} alt={client.alt} width={100} height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const clients = [
  { src: '/images/client-1.svg', alt: 'Client 1' },
  { src: '/images/client-6.svg', alt: 'Client 6' },
  { src: '/images/client-3.svg', alt: 'Client 3' },
  { src: '/images/client-4.svg', alt: 'Client 4' },
  { src: '/images/client-5.svg', alt: 'Client 5' },
  { src: '/images/client-2.svg', alt: 'Client 2' },
];

export default Client;
