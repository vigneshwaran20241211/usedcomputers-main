import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export function useAuth() {
  const [user, setUser] = useState<any | null>(null); // Initialize user state to null
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state to handle async operation
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoading(false);
      router.push('/login');
      return;
    }
    
    // Async function inside useEffect for handling token verification
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.API_URL}user/verifytoken`,
          { token: accessToken, },
          { headers: { Authorization: `Bearer ${accessToken}` },}
        );
        setUser(response.data.data); // Set the user data from response
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error('Invalid token', err);
        setLoading(false);
        router.push('/login'); // Redirect to login if error occurs
      }
    };

    verifyToken(); // Call the async function
  }, [router]);

  // Return user and loading state
  return { user, loading };
}
