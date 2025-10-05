'use client';

import { useAuthValue } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = (redirectTo = '/login') => {
  const { user, loading } = useAuthValue();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
};

export const useRedirectIfAuthenticated = (redirectTo = '/dashboard') => {
  const { user, loading } = useAuthValue();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
};