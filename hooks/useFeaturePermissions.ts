'use client';

import { useEffect, useState } from 'react';
import { getCurrentUserProfile, UserProfile } from '@/lib/supabase/auth';

export function useFeaturePermissions() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const role = profile?.role || 'user';
  const credits = profile?.credits ?? 0;

  return {
    profile,
    loading,
    role,
    credits,
    
    canUseCamera: profile?.can_use_camera ?? false,
    canRecordVoice: profile?.can_record_voice ?? false,
    canUploadFiles: profile?.can_upload_files ?? false,
    
    isOwner: role === 'owner',
    isAdmin: role === 'admin',
    isPro: role === 'pro',
    isRegularUser: role === 'user',
    isAdminOrOwner: role === 'owner' || role === 'admin',
    hasProPrivileges: role === 'owner' || role === 'admin' || role === 'pro',
    
    hasSufficientCredits: (requiredCredits: number) => credits >= requiredCredits,
  };
}
