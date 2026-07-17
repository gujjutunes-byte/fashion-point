'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

/** Returns { isAdmin, checking } based on the signed-in user's `admin` custom claim. */
export function useIsAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    async function check() {
      if (loading) return;
      if (!user) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }
      const tokenResult = await user.getIdTokenResult();
      if (active) {
        setIsAdmin(!!tokenResult.claims.admin);
        setChecking(false);
      }
    }
    check();
    return () => {
      active = false;
    };
  }, [user, loading]);

  return { isAdmin, checking };
}
