/** @type {import("next").NextConfig} */
import dotenv from 'dotenv';
dotenv.config(); 
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost",'dev.usedcomputer.com.my'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: ""
      },
    ]
  },
  env: {
    // Access custom environment variables if needed
    API_URL: process.env.API_URL || 'http://apidev.usedcomputer.com.my:3001/',
  },
};
export default nextConfig;
