"use client"; 
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

SwiperCore.use([Autoplay]);
const Clients: React.FC = () => {
  return (
    <section className="client py-5 lg:py-14">
      <div>
        <div className="flex items-center justify-center flex-wrap flex-col">
          <div className="badges text-center font-semibold bg-secondary text-white text-sm lg:text-xl py-0.5 uppercase rounded px-2.5 mb-4">
            OUR Clients
          </div>
        </div>

        <div className="client-list pt-5 lg:pt-16 pb-5 lg:pb-20 px-5 lg:px-0">
          <Swiper slidesPerView={4}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}>
            <SwiperSlide><Image src="/images/client-1.svg" alt="Client 1" className="Client1log" width={150} height={150} /></SwiperSlide>
            <SwiperSlide><Image src="/images/client-6.svg" alt="Client 6" className="Client1log" width={150} height={150} /></SwiperSlide>
            <SwiperSlide><Image src="/images/client-3.svg" alt="Client 3" className="Client1log" width={150} height={150} /></SwiperSlide>
            <SwiperSlide><Image src="/images/client-4.svg" alt="Client 4" className="Client1log" width={150} height={150} /></SwiperSlide>
            <SwiperSlide><Image src="/images/client-5.svg" alt="Client 5" className="Client1log" width={150} height={150} /></SwiperSlide>
            <SwiperSlide><Image src="/images/client-2.svg" alt="Client 2" className="Client1log" width={150} height={150} /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Clients;
