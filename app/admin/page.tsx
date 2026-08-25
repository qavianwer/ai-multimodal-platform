'use client';

import { useEffect, useState } from 'react';
import AdminRouteGuard from '@/components/AdminRouteGuard';
import { getAllUsersProfiles, updateUserPermissionsAndCredits, UserProfile } from '@/lib/supabase/auth';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsersProfiles();
      setUsers(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateCredits = async (userId: string, currentCredits: number) => {
    const newCreditsStr = prompt('Enter new credit balance:', currentCredits.toString());
    if (newCreditsStr === null) return;
    
    const credits = parseInt(newCreditsStr, 10);
    if (isNaN(credits)) {
      alert('Please enter a valid number.');
      return;
    }

    try {
      await updateUserPermissionsAndCredits(userId, { credits });
      alert('Credits updated successfully!');
      fetchUsers();
    } catch (err: any) {
      alert('Error updating credits: ' + err.message);
    }
  };

  const handleTogglePermission = async (userId: string, field: keyof UserProfile, currentValue: boolean) => {
    try {
      await updateUserPermissionsAndCredits(userId, { [field]: !currentValue });
      fetchUsers();
    } catch (err: any) {
      alert('Error updating permission: ' + err.message);
    }
  };

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Enterprise Owner & Admin Control Panel</h1>
          <p className="text-gray-400 mb-8">Manage all registered platform users, security roles, credits, and AI capabilities.</p>

          {errorMsg && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading user database...</div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-sm bg-gray-950/50">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Credits</th>
                    <th className="p-4">Camera</th>
                    <th className="p-4">Voice</th>
                    <th className="p-4">Files</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold">{user.full_name || 'No Name'}</div>
                        <div className="text-gray-400 text-xs">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          user.role === 'owner' ? 'bg-purple-900 text-purple-200 border border-purple-700' :
                          user.role === 'admin' ? 'bg-blue-900 text-blue-200 border border-blue-700' :
                          user.role === 'pro' ? 'bg-amber-900 text-amber-200 border border-amber-700' :
                          'bg-gray-800 text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">{user.credits}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleTogglePermission(user.id, 'can_use_camera', user.can_use_camera)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${user.can_use_camera ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-red-900/60 text-red-300 border border-red-700'}`}
                        >
                          {user.can_use_camera ? 'Allowed' : 'Blocked'}
                        </button>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleTogglePermission(user.id, 'can_record_voice', user.can_record_voice)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${user.can_record_voice ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-red-900/60 text-red-300 border border-red-700'}`}
                        >
                          {user.can_record_voice ? 'Allowed' : 'Blocked'}
                        </button>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleTogglePermission(user.id, 'can_upload_files', user.can_upload_files)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold ${user.can_upload_files ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-red-900/60 text-red-300 border border-red-700'}`}
                        >
                          {user.can_upload_files ? 'Allowed' : 'Blocked'}
                        </button>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleUpdateCredits(user.id, user.credits)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          Edit Credits
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminRouteGuard>
  );
                        }
