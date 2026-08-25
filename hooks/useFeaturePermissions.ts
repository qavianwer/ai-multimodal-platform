'use client';

import { useEffect, useState } from 'react';

export function useFeaturePermissions() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const role = profile?.role || 'admin';
  const credits = profile?.credits ?? 150;

  return {
    profile,
    loading,
    role,
    credits,
    canUseCamera: profile?.can_use_camera ?? true,
    canRecordVoice: profile?.can_record_voice ?? true,
    canUploadFiles: profile?.can_upload_files ?? true,
    isOwner: role === 'owner',
    isAdmin: role === 'admin',
    isPro: role === 'pro',
    isRegularUser: role === 'user',
    isAdminOrOwner: role === 'owner' || role === 'admin',
    hasProPrivileges: role === 'owner' || role === 'admin' || role === 'pro',
    hasSufficientCredits: (requiredCredits: number) => credits >= requiredCredits
  };
}
