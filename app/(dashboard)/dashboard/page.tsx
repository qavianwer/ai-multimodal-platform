'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFeaturePermissions } from '@/hooks/useFeaturePermissions';

export default function UserDashboardPage() {
  const { 
    profile, 
    loading: permissionsLoading, 
    credits, 
    role, 
    canUseCamera, 
    canRecordVoice, 
    canUploadFiles, 
    isAdminOrOwner,
    hasProPrivileges 
  } = useFeaturePermissions();

  const [userId, setUserId] = useState('');
  const [modelSlug, setModelSlug] = useState('gpt-4o');
  const [category, setCategory] = useState('chat');
  const [prompt, setPrompt] = useState('');
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [dynamicCredits, setDynamicCredits] = useState<number | null>(null);

  const availableModels = [
    { slug: 'gpt-4o', name: 'GPT-4o (OpenAI)', category: 'chat', provider: 'openai' },
    { slug: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet (Anthropic)', category: 'chat', provider: 'anthropic' },
    { slug: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro (Google)', category: 'chat', provider: 'google' },
    { slug: 'grok-2', name: 'Grok 2 (xAI)', category: 'chat', provider: 'xai' },
    { slug: 'deepseek-chat', name: 'DeepSeek V3 (DeepSeek)', category: 'coding', provider: 'deepseek' },
    { slug: 'llama-3-70b', name: 'Llama 3.3 70B (Meta)', category: 'chat', provider: 'meta' },
    { slug: 'qwen-max', name: 'Qwen Max (Alibaba)', category: 'chat', provider: 'alibaba' },
    { slug: 'mistral-large', name: 'Mistral Large (Mistral AI)', category: 'chat', provider: 'mistral' },
    { slug: 'flux-schnell', name: 'FLUX.1 Schnell (Flux/Image)', category: 'image', provider: 'flux' },
    { slug: 'midjourney-v6', name: 'Midjourney V6 (Midjourney)', category: 'image', provider: 'midjourney' },
    { slug: 'sora-cinematic', name: 'Sora Video (OpenAI)', category: 'video', provider: 'sora' },
    { slug: 'veo-ultra', name: 'Veo 3.1 Ultra (Google)', category: 'video', provider: 'veo' },
    { slug: 'runway-gen3', name: 'Runway Gen-3 Alpha (Runway)', category: 'video', provider: 'runway' },
    { slug: 'elevenlabs-voice', name: 'Prime Voice (ElevenLabs)', category: 'audio', provider: 'elevenlabs' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('Please enter your Supabase User ID.');
      return;
    }

    setExecuting(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          modelSlug,
          prompt,
          options: { category }
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Multi-model generation failed');

      setResult(data.data);
      if (data.remaining_credits !== undefined) {
        setDynamicCredits(data.remaining_credits);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExecuting(false);
    }
  };

  if (permissionsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950 text-white font-sans">
        Loading AI Studio Dashboard...
      </div>
    );
  }

  const activeCredits = dynamicCredits !== null ? dynamicCredits : credits;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Creative Studio Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, <span className="text-white font-semibold">{profile?.full_name || profile?.email || 'Creator'}</span></p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-950/60 border border-emerald-700 px-4 py-2 rounded-xl">
              <div className="text-xs text-emerald-400 uppercase font-bold">Available Credits</div>
              <div className="text-2xl font-mono font-extrabold text-emerald-200">{activeCredits}</div>
            </div>

            {isAdminOrOwner && (
              <Link 
                href="/admin" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-purple-900/35"
              >
                Admin Panel ⚡
              </Link>
            )}
          </div>
        </div>

        {/* Role & Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Role Card */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="text-gray-400 text-sm mb-1">Account Role</div>
            <div className="text-xl font-bold uppercase tracking-wider text-indigo-400">{role || 'Standard'}</div>
            <p className="text-gray-500 text-xs mt-2">
              {hasProPrivileges ? 'You have elevated platform privileges.' : 'Standard user account level.'}
            </p>
          </div>

          {/* Feature Permissions Card */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl md:col-span-2">
            <div className="text-gray-400 text-sm mb-3">Feature Access Permissions</div>
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-xl border text-center ${canUseCamera ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-red-950/40 border-red-800 text-red-300'}`}>
                <div className="text-xs font-semibold">Camera</div>
                <div className="text-sm font-bold mt-1">{canUseCamera ? 'Enabled' : 'Restricted'}</div>
              </div>
              <div className={`p-3 rounded-xl border text-center ${canRecordVoice ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-red-950/40 border-red-800 text-red-300'}`}>
                <div className="text-xs font-semibold">Voice Recording</div>
                <div className="text-sm font-bold mt-1">{canRecordVoice ? 'Enabled' : 'Restricted'}</div>
              </div>
              <div className={`p-3 rounded-xl border text-center ${canUploadFiles ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-red-950/40 border-red-800 text-red-300'}`}>
                <div className="text-xs font-semibold">File Uploads</div>
                <div className="text-sm font-bold mt-1">{canUploadFiles ? 'Enabled' : 'Restricted'}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Multimodal AI Generation Form Section */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-xl font-bold mb-2">Multimodal AI Generation Engine</h2>
          <p className="text-gray-400 text-sm mb-6">Configure parameters, select a high-performance model ecosystem, and execute generation.</p>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Supabase User UUID:</label>
              <input 
                type="text" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="Paste your user UUID from Supabase profiles table"
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Select AI Model / Engine:</label>
                <select 
                  value={modelSlug} 
                  onChange={(e) => setModelSlug(e.target.value)}
                  className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  {availableModels.map((m) => (
                    <option key={m.slug} value={m.slug}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Modality Category:</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="chat">Chat / Reasoning</option>
                  <option value="coding">Coding & Math</option>
                  <option value="image">Image Generation</option>
                  <option value="video">Cinematic Video</option>
                  <option value="audio">Voice / Audio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Prompt / Production Script / Cinematic Instructions:</label>
              <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                rows={4} 
                className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Enter prompt, code requirements, or camera movement tags..."
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={executing} 
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg ${executing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'}`}
            >
              {executing ? 'Executing Multi-Model Router...' : 'Execute AI Generation'}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-950/60 border border-red-800 text-red-300 p-4 rounded-xl text-sm">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="mt-8 bg-gray-950 border border-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-3">Generated Output Result:</h3>
              
              {result.output && (
                <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed text-gray-200">
                  {result.output}
                </div>
              )}

              {result.imageUrl && (
                <div className="text-center mt-4">
                  <img src={result.imageUrl} alt="Generated AI Output" className="max-w-full mx-auto rounded-lg border border-gray-800" />
                </div>
              )}

              {result.videoUrl && (
                <div className="text-center mt-4">
                  <video controls src={result.videoUrl} className="w-full rounded-lg bg-black border border-gray-800" />
                </div>
              )}

              {result.audioUrl && (
                <div className="mt-4">
                  <audio controls src={result.audioUrl} className="w-full" />
                </div>
              )}

              <details className="mt-6 text-gray-400 text-xs">
                <summary className="cursor-pointer font-semibold text-gray-300">View Provider Metadata Payload</summary>
                <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto mt-2 text-gray-300 font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

      </div>
    </div>
  );
              }
