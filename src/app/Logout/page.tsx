"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const logout = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Remove the access token (from localStorage or cookies)
    localStorage.clear();
    // Optionally, remove other session data if needed
    // sessionStorage.removeItem('someKey'); // or clear cookies if used
    
    // Redirect to the home page
    router.push('/login'); // Redirect to the homepage (can be adjusted to any route)
  }, [router]);

  return null;
};

export default logout;

