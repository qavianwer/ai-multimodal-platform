'use client';

import { useState } from 'react';
import { AI_MODELS_ECOSYSTEM } from '@/lib/ai-models';

export default function Dashboard() {
  const [userId, setUserId] = useState('user_123'); // Default test user ID in Supabase
  const [selectedModel, setSelectedModel] = useState(AI_MODELS_ECOSYSTEM[0].slug);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, modelSlug: selectedModel, prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');

      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            AI Multimodal Platform
          </h1>
          <p className="text-slate-400 mt-2">
            Interact with top-tier AI models across Chat, Coding, Image, Video, and Voice ecosystems.
          </p>
        </div>

        {/* Form Dashboard */}
        <form onSubmit={handleGenerate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
          
          {/* User ID Configuration */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Supabase User ID</label>
            <input 
              type="text" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="Enter Supabase Profile ID"
              required
            />
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select AI Model Ecosystem</label>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {AI_MODELS_ECOSYSTEM.map((model) => (
                <option key={model.slug} value={model.slug}>
                  {model.provider} — {model.name} ({model.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Enter Your Prompt / Script</label>
            <textarea 
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="Type your prompt here (e.g., Cinematic 16:9 shot of a futuristic cyberpunk city...)"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Processing via AI Engine...' : 'Execute AI Generation (5 Credits)'}
          </button>
        </form>

        {/* Error Output */}
        {error && (
          <div className="bg-red-950/50 border border-red-800 text-red-200 p-4 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Success Response Output */}
        {response && (
          <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-emerald-900/60 pb-3">
              <h3 className="font-semibold text-emerald-400">Generation Successful</h3>
              <span className="text-xs bg-emerald-900/60 text-emerald-300 px-3 py-1 rounded-full">
                Remaining Credits: {response.remaining_credits}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-slate-300 font-mono text-sm whitespace-pre-wrap">
              {JSON.stringify(response.data, null, 2)}
            </div>
          </div>
        )}

      </div>
    </main>
  );
        }
