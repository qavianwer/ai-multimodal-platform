import { createClient } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'owner' | 'admin' | 'pro' | 'user';
  can_use_camera: boolean;
  can_record_voice: boolean;
  can_upload_files: boolean;
  credits: number;
  is_active: boolean;
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !data) return null;

  return data as UserProfile;
}

export async function getAllUsersProfiles(): Promise<UserProfile[]> {
  const supabase = createClient();
  
  const currentUser = await getCurrentUserProfile();
  if (!currentUser || (currentUser.role !== 'owner' && currentUser.role !== 'admin')) {
    throw new Error('Unauthorized: Only Owner or Admin can view all users.');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data as UserProfile[];
}

export async function updateUserPermissionsAndCredits(
  targetUserId: string, 
  updates: Partial<UserProfile>
) {
  const supabase = createClient();
  
  const currentUser = await getCurrentUserProfile();
  if (!currentUser || (currentUser.role !== 'owner' && currentUser.role !== 'admin')) {
    throw new Error('Unauthorized: Only Owner or Admin can modify user permissions.');
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', targetUserId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
