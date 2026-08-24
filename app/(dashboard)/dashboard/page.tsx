'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [userId, setUserId] = useState('');
  const [modelSlug, setModelSlug] = useState('gpt-4o');
  const [category, setCategory] = useState('chat');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  // Comprehensive multi-model ecosystem mapping across all model families
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
    setLoading(true);
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
        setRemainingCredits(data.remaining_credits);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Multi-Model AI Ecosystem Dashboard</h1>
        {remainingCredits !== null && (
          <div style={{ background: '#0070f3', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold' }}>
            Credits Left: {remainingCredits}
          </div>
        )}
      </header>

      <form onSubmit={handleGenerate} style={{ display: 'grid', gap: '1.25rem', background: '#f9f9f9', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Supabase User ID:</label>
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            placeholder="Paste your user UUID from Supabase profiles table"
            style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Select AI Model / Engine:</label>
            <select 
              value={modelSlug} 
              onChange={(e) => setModelSlug(e.target.value)}
              style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', background: '#fff' }}
            >
              {availableModels.map((m) => (
                <option key={m.slug} value={m.slug}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Modality Category:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', background: '#fff' }}
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
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Prompt / Production Script / Cinematic Instructions:</label>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            rows={4} 
            style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            placeholder="Enter prompt, code requirements, or camera movement tags..."
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ padding: '0.85rem 1.5rem', background: loading ? '#ccc' : '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          {loading ? 'Executing Multi-Model Router...' : 'Execute AI Generation'}
        </button>
      </form>

      {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '6px', marginTop: '1.5rem', border: '1px solid #ffcdd2' }}>Error: {error}</div>}
      
      {result && (
        <div style={{ marginTop: '2rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Generated Output Result:</h3>
          
          {result.output && (
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {result.output}
            </div>
          )}

          {result.imageUrl && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <img src={result.imageUrl} alt="Generated AI Output" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
          )}

          {result.videoUrl && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <video controls src={result.videoUrl} style={{ width: '100%', borderRadius: '8px', background: '#000' }} />
            </div>
          )}

          {result.audioUrl && (
            <div style={{ marginTop: '1rem' }}>
              <audio controls src={result.audioUrl} style={{ width: '100%' }} />
            </div>
          )}

          <details style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.85rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>View Provider Metadata Payload</summary>
            <pre style={{ background: '#f1f3f5', padding: '0.75rem', borderRadius: '4px', overflowX: 'auto', marginTop: '0.5rem' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
