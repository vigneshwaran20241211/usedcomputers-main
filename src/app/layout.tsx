"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Provider } from 'react-redux';
import store from '../redux/store';
import Link from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating loading with a timeout
    setTimeout(() => setLoading(false), 100);
  }, []);

  return (
    <Provider store={store}> 
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body suppressHydrationWarning={true} className="font-montserrat">
          {loading ? <Loader /> : children}
        </body>
      </html>
    </Provider>
  );
}
