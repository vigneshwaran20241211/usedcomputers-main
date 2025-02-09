"use client";
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!allowedRoles.includes(user?.userType)) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, allowedRoles, router]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
