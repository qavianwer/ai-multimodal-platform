'use client';

import { useState } from 'react';
import { Wand2, Sparkles, Image as ImageIcon, Video, Film, Loader2, Cpu, MessageSquare } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [modelType, setModelType] = useState('flux');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState('');

  // Comprehensive Multi-Model Categories
  const modelCategories = [
    {
      category: '🖼️ Image Generation',
      models: [
        { id: 'flux', name: 'Flux Schnell (Fast & HD)', endpoint: 'flux' },
        { id: 'flux-pro', name: 'Flux Pro (Ultra Quality)', endpoint: 'flux-pro' },
        { id: 'stable-diffusion', name: 'Stable Diffusion XL', endpoint: 'stable-diffusion' },
        { id: 'imagen', name: 'Google Imagen 3', endpoint: 'imagen' },
      ]
    },
    {
      category: '🎬 Video & Animation',
      models: [
        { id: 'kling', name: 'Kling Video v1', endpoint: 'kling' },
        { id: 'veo', name: 'Google Veo Cinematic', endpoint: 'veo' },
        { id: 'sora', name: 'OpenAI Sora Engine', endpoint: 'sora' },
        { id: 'luma', name: 'Luma Dream Machine', endpoint: 'luma' },
        { id: 'hailuo', name: 'Hailuo Video AI', endpoint: 'hailuo' },
      ]
    },
    {
      category: '✍️ Script & Reasoning',
      models: [
        { id: 'script-to-video', name: 'Script-to-Cinematic Video', endpoint: 'script-to-video' },
        { id: 'glm', name: 'Z-AI GLM Reasoning', endpoint: 'glm' },
      ]
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setOutput(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, modelType }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setOutput(data.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6 md:p-12">
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> Full-Power Multimodal AI Studio
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">
          Universal AI Engine
        </h1>
        <p className="text-slate-400 mt-3 text-lg">
          Powered by Flux, Kling, Veo, Sora, GLM, and advanced generative models.
        </p>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-3xl w-full bg-slate-900/60 border border-slate-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* Model Selection by Categories */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-300">
              Select AI Model & Engine
            </label>
            
            <div className="space-y-4">
              {modelCategories.map((group, idx) => (
                <div key={idx} className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {group.models.map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setModelType(m.id)}
                        className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all truncate ${
                          modelType === m.id
                            ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-md shadow-purple-900/30'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Enter Cinematic Prompt / Script / Text
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cinematic 16:9 widescreen shot of a futuristic cyberpunk city, neon reflections, chiaroscuro lighting, 8k resolution..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate with {modelType.toUpperCase()}
              </>
            )}
          </button>
        </form>

        {/* Error Message Display */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Result Output Display */}
        {output && (
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Generated Result ({modelType.toUpperCase()})</h3>
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-2 flex justify-center items-center">
              {output.images && output.images[0]?.url ? (
                <img 
                  src={output.images[0].url} 
                  alt="Generated AI Art" 
                  className="rounded-lg max-h-[450px] object-contain w-full"
                />
              ) : output.video && output.video.url ? (
                <video 
                  src={output.video.url} 
                  controls 
                  autoPlay 
                  loop 
                  className="rounded-lg max-h-[450px] w-full"
                />
              ) : (
                <pre className="text-xs text-slate-300 overflow-x-auto p-4 w-full">
                  {JSON.stringify(output, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
        }
      
