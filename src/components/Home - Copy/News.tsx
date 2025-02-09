import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

// NewsItem interface to define the structure for news cards
type NewsItem = {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  link: string;
};

const newsItems: NewsItem[] = [
  {
    category: 'SUSTAINABILITY',
    title: 'Why it is important to live sustainably?',
    description: 'Duty obligations of business frequently occur pleasures enjoy...',
    imageUrl: '/images/latest-update-1.jpeg',
    date: '6 Jul 2023',
    link: '#',
  },
  {
    category: 'BUSINESS',
    title: 'Why it is important to live sustainably?',
    description: 'Duty obligations of business frequently occur pleasures enjoy...',
    imageUrl: '/images/latest-update-2.jpeg',
    date: '6 Jul 2023',
    link: '#',
  },
  {
    category: 'BUSINESS',
    title: 'Why it is important to live sustainably?',
    description: 'Duty obligations of business frequently occur pleasures enjoy...',
    imageUrl: '/images/latest-update-3.jpeg',
    date: '6 Jul 2023',
    link: '#',
  },
];

const News: FC = () => {
  return (
    <section className="news bg-no-repeat bg-cover dots pt-14 pb-[164px]">
      <div className="container mx-auto pt-14">
        <div className="flex items-center justify-center flex-wrap flex-col">
          <div className="badges text-center font-semibold bg-secondary text-white text-xl py-0.5 uppercase rounded px-2.5 mb-4">
            News
          </div>
          <h1 className="text-center font-extrabold text-primary text-40 pb-12">
            Our Latest Updates
          </h1>
        </div>
        <div className="flex flex-wrap">
          {newsItems.map((item, index) => (
            <div key={index} className="w-1/3 px-6 pb-4">
              <div className="card bg-white drop-shadow-xl">
                <div className="profile h-56 overflow-hidden">
                  <Image src={item.imageUrl} alt={item.title} width={400} height={224} className="h-auto max-w-full" />
                </div>
                <div className="profile-content px-6 pt-6">
                  <span className="font-bold uppercase text-secondary text-sm pb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-primary text-2xl pb-4">{item.title}</h3>
                  <p className="font-normal text-info text-base pb-5">{item.description}</p>
                </div>
                <div className="flex flex-wrap justify-between border-t px-6 py-4">
                  <Link href={item.link} className="font-bold text-black uppercase">
                    Read More
                  </Link>
                  <div className="date font-normal text-info">{item.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
