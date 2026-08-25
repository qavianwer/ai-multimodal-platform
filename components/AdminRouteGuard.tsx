'use client';

import { useEffect, useState } from 'react';
import { getCurrentUserProfile } from '@/lib/supabase/auth';
import { useRouter } from 'next/navigation';

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const profile = await getCurrentUserProfile();
      
      if (!profile || (profile.role !== 'owner' && profile.role !== 'admin')) {
        router.push('/dashboard');
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading Enterprise Security...
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
