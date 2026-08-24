'use client';
import React, { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const AI_MODELS_ECOSYSTEM = [
    { slug: 'gpt-4o', name: 'GPT-4o', category: 'chat', provider: 'OpenAI' },
    { slug: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', category: 'chat', provider: 'Anthropic' },
    { slug: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', category: 'chat', provider: 'Google' },
    { slug: 'grok-2', name: 'Grok 2', category: 'chat', provider: 'xAI' },
    { slug: 'deepseek-chat', name: 'DeepSeek V3 / R1', category: 'chat', provider: 'DeepSeek' },
    { slug: 'llama-3-70b', name: 'Llama 3.3 70B', category: 'openWeights', provider: 'Meta' },
    { slug: 'flux-schnell', name: 'FLUX.1 Schnell/Dev', category: 'image', provider: 'BFL' },
    { slug: 'stable-diffusion-3', name: 'Stable Diffusion 3', category: 'image', provider: 'Stability' },
    { slug: 'midjourney-v6', name: 'Midjourney v6', category: 'image', provider: 'Midjourney' },
    { slug: 'sora-cinematic', name: 'Sora Video', category: 'video', provider: 'OpenAI' },
    { slug: 'veo-ultra', name: 'Veo Ultra', category: 'video', provider: 'Google' },
    { slug: 'elevenlabs-voice', name: 'ElevenLabs Voice', category: 'voice', provider: 'ElevenLabs' }
  ];

  const filteredModels = AI_MODELS_ECOSYSTEM.filter(m => m.category === activeTab);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOutput(`Successfully generated output using model [${selectedModel}] for prompt: "${prompt}"`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              AI Multimodal Platform
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Generate text, images, cinematic videos, and studio voice with global AI models.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400 shadow-lg">
            ● Global API Cluster: Online
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'chat', label: '🤖 Chat & Reasoning' },
            { id: 'openWeights', label: '🧠 Open Weights' },
            { id: 'image', label: '🎨 Image Gen' },
            { id: 'video', label: '🎬 Cinematic Video' },
            { id: 'voice', label: '🎙️ Voice Studio' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                const firstModel = AI_MODELS_ECOSYSTEM.find(m => m.category === tab.id);
                if (firstModel) setSelectedModel(firstModel.slug);
                setOutput(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {filteredModels.map(m => (
                  <option key={m.slug} value={m.slug}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Enter Prompt
              </label>
              <textarea
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-inner"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                'Generate Content 🚀'
              )}
            </button>
          </div>

          {/* Output Terminal */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl min-h-[400px]">
            <div>
              <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center text-xs font-bold uppercase text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Output Terminal
                </span>
                <span className="text-blue-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {selectedModel}
                </span>
              </div>

              {output ? (
                <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-5 text-sm font-mono text-slate-100 shadow-inner">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-52 text-slate-500 text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <p className="font-semibold text-slate-300">Ready for Multimodal Generation</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Select a model, enter your prompt, and click generate to test the pipeline.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-4 text-xs text-slate-500 flex justify-between items-center">
              <span>OmniAI Multimodal Ecosystem Engine</span>
              <span className="font-mono text-[11px]">Next.js App Router</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
