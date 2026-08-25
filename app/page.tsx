'use client';
import React, { useState, useEffect } from 'react';
import { AI_MODELS_ECOSYSTEM, AIModel } from '@/lib/ai-models';
import { supabase } from '@/lib/supabase/client';

export default function Dashboard() {
  // Auth States
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Generator States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // Check Supabase Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Success! Check your email for the confirmation link.');
    setAuthLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Successfully logged in!');
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMessage('Signed out successfully.');
  };

  // Filter models based on category tab
  const filteredModels = selectedCategory === 'all' 
    ? AI_MODELS_ECOSYSTEM 
    : AI_MODELS_ECOSYSTEM.filter(m => m.category === selectedCategory);

  // Handle AI Content Generation Simulation
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setOutput(null);
    setTimeout(() => {
      setGenerating(false);
      setOutput(`🚀 Successfully generated output using [${selectedModel}] model.\nPrompt: "${prompt}"\nStatus: Pipeline Executed Successfully via Global API Cluster.`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Auth Section */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Unified AI Multimodal Platform
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Interact with 12+ world-class AI models powered by Supabase & Next.js App Router.
            </p>
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-4 bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 shadow-md">
                <span className="text-sm text-cyan-300 font-medium">👤 {user.email}</span>
                <button 
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="flex flex-wrap gap-2 items-center">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-4 py-2 rounded-xl font-semibold transition shadow-lg shadow-cyan-500/20"
                >
                  Login
                </button>
                <button 
                  type="button" 
                  onClick={handleSignUp}
                  disabled={authLoading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/20"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </header>

        {message && (
          <div className="bg-slate-900 border border-cyan-500/50 p-4 rounded-xl text-center text-cyan-300 text-sm shadow-md">
            {message}
          </div>
        )}

        {/* Interactive Testing Playground Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl shadow-2xl">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
              ⚡ AI Playground Generator
            </h2>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Choose Model for Test
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                {AI_MODELS_ECOSYSTEM.map(m => (
                  <option key={m.slug} value={m.slug}>
                    {m.name} ({m.provider}) - [{m.category}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Enter Prompt / Instructions
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your prompt here (e.g. Write a python script for web scraping...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none shadow-inner"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Processing Pipeline...
                </>
              ) : (
                'Run AI Generation 🚀'
              )}
            </button>
          </div>

          {/* Output Terminal */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-inner min-h-[300px]">
            <div>
              <div className="border-b border-slate-800 pb-3 mb-4 flex justify-between items-center text-xs font-bold uppercase text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span> Live Output Terminal
                </span>
                <span className="text-cyan-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  {selectedModel}
                </span>
              </div>

              {output ? (
                <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-44 text-slate-500 text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="font-semibold text-slate-300 text-sm">Terminal Ready</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Select a model, enter your prompt in the left panel, and click run to test the engine.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-900 pt-3 text-[11px] text-slate-500 flex justify-between items-center font-mono">
              <span>Secure Vercel Edge Runtime</span>
              <span className="text-cyan-500">Connected 🟢</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Explore AI Models Ecosystem</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'chat', 'reasoning', 'coding', 'image', 'video', 'voice'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-bold' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AI Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model: AIModel) => (
            <div 
              key={model.slug}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-2xl shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-slate-800 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-slate-700">
                    {model.provider}
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                    {model.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                  {model.name}
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  {model.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Use Case: <span className="text-indigo-300">{model.useCase}</span></span>
                <span className="bg-slate-950 text-slate-300 px-2 py-1 rounded border border-slate-800 font-mono">
                  {model.family}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
                }
