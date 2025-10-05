'use client';

import { useAuthValue } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

export function withAuth<T extends object>(
  Component: ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const { user, loading } = useAuthValue();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}

export function withoutAuth<T extends object>(
  Component: ComponentType<T>
) {
  return function UnauthenticatedComponent(props: T) {
    const { user, loading } = useAuthValue();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.push('/dashboard');
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (user) {
      return null;
    }

    return <Component {...props} />;
  };
}