'use client';

import { useState } from 'react';

// --- All AI Models Ecosystem ---
const AI_MODELS_ECOSYSTEM = [
  { slug: 'gpt-4o', name: 'GPT-4o', category: 'chat', provider: 'OpenAI', description: 'Chat, Coding, Reasoning, Multimodal' },
  { slug: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', category: 'chat', provider: 'Anthropic', description: 'Advanced writing, coding, and artifact analysis' },
  { slug: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', category: 'chat', provider: 'Google', description: 'Massive context multimodal AI and research' },
  { slug: 'grok-2', name: 'Grok 2', category: 'chat', provider: 'xAI', description: 'Real-time information retrieval and reasoning' },
  { slug: 'deepseek-chat', name: 'DeepSeek V3 / R1', category: 'coding', provider: 'DeepSeek', description: 'Elite coding, math, and logical reasoning' },
  { slug: 'llama-3-70b', name: 'Llama 3.3 70B', category: 'chat', provider: 'Meta', description: 'Open-weight state-of-the-art model' },
  { slug: 'qwen-max', name: 'Qwen Max', category: 'chat', provider: 'Alibaba', description: 'Multilingual excellence and coding capabilities' },
  { slug: 'mistral-large', name: 'Mistral Large', category: 'chat', provider: 'Mistral AI', description: 'Fast, efficient enterprise-grade reasoning' },
  { slug: 'phi-4', name: 'Microsoft Phi-4', category: 'chat', provider: 'Microsoft', description: 'High-intelligence small language model' },
  { slug: 'glm-4', name: 'GLM-4', category: 'chat', provider: 'Z.ai', description: 'Advanced bilingual reasoning and coding' },
  { slug: 'kimi-chat', name: 'Kimi Chat', category: 'chat', provider: 'Moonshot AI', description: 'Ultra-long context document analysis' },
  { slug: 'command-r-plus', name: 'Command R+', category: 'chat', provider: 'Cohere', description: 'Enterprise RAG and business agent intelligence' },
  { slug: 'flux-schnell', name: 'FLUX.1 Schnell/Dev', category: 'image', provider: 'Black Forest Labs', description: 'High-speed, photorealistic image generation' },
  { slug: 'stable-diffusion-3', name: 'Stable Diffusion 3.5', category: 'image', provider: 'Stability AI', description: 'Open-weight high-fidelity text-to-image' },
  { slug: 'midjourney-v6', name: 'Midjourney v6', category: 'image', provider: 'Midjourney', description: 'Cinematic, hyper-artistic visual styling' },
  { slug: 'dall-e-3', name: 'DALL·E 3', category: 'image', provider: 'OpenAI', description: 'Precise prompt compliance and detail' },
  { slug: 'imagen-3', name: 'Google Imagen 3', category: 'image', provider: 'Google', description: 'Photorealistic text-to-image synthesis' },
  { slug: 'ideogram-v2', name: 'Ideogram v2', category: 'image', provider: 'Ideogram', description: 'Superior typography and graphic design rendering' },
  { slug: 'sora-cinematic', name: 'Sora Video', category: 'video', provider: 'OpenAI', description: 'Hyper-realistic cinematic world simulation' },
  { slug: 'veo-ultra', name: 'Veo Ultra', category: 'video', provider: 'Google', description: 'Cinematic 16:9 and 9:16 professional video' },
  { slug: 'runway-gen3', name: 'Runway Gen-3 Alpha', category: 'video', provider: 'Runway', description: 'Cinematic text-to-video and motion control' },
  { slug: 'kling-ai', name: 'Kling AI', category: 'video', provider: 'Kling', description: 'Complex physics and dynamic action video' },
  { slug: 'pika-2', name: 'Pika 2.0', category: 'video', provider: 'Pika', description: 'Creative video effects and animation' },
  { slug: 'luma-dream-machine', name: 'Luma Dream Machine', category: 'video', provider: 'Luma Labs', description: 'Fast, realistic camera pans and transitions' },
  { slug: 'hailuo-ai', name: 'Hailuo AI (Minimax)', category: 'video', provider: 'Minimax', description: 'Expressive cinematic video synthesis' },
  { slug: 'elevenlabs-voice', name: 'ElevenLabs Studio', category: 'voice', provider: 'ElevenLabs', description: 'Hyper-realistic voice cloning and TTS' },
  { slug: 'azure-speech', name: 'Azure Speech Service', category: 'voice', provider: 'Microsoft', description: 'Enterprise neural text-to-speech & STT' },
  { slug: 'whisper-large', name: 'OpenAI Whisper v3', category: 'voice', provider: 'OpenAI', description: 'Robust multilingual speech recognition' },
  { slug: 'deepgram-nova', name: 'Deepgram Nova-2', category: 'voice', provider: 'Deepgram', description: 'Ultra-fast real-time voice transcription' }
];

export default function Dashboard() {
  const [userId, setUserId] = useState('user_123');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
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
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Multimodal Platform
          </h1>
          <p className="text-slate-400 mt-1">Generate text, images, cinematic videos, and studio voice with global AI models.</p>
        </header>

        <form onSubmit={handleGenerate} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select AI Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AI_MODELS_ECOSYSTEM.map((model) => (
                <option key={model.slug} value={model.slug}>
                  {model.name} ({model.provider}) - {model.category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Enter Prompt</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Generating with AI...' : 'Generate Content 🚀'}
          </button>
        </form>

        {error && (
          <div className="bg-red-950/50 border border-red-800 text-red-200 p-4 rounded-xl">
            {error}
          </div>
        )}

        {response && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-green-400">Generation Result</h2>
            <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm text-slate-300">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
  }
