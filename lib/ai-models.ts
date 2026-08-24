export interface AIModel {
  slug: string;
  name: string;
  category: 'chat' | 'image' | 'video' | 'voice' | 'coding';
  provider: string;
  description: string;
}

export const AI_MODELS_ECOSYSTEM: AIModel[] = [
  // --- 🤖 Top AI Chat, Reasoning & Enterprise Models ---
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

  // --- 🎨 Image Generation AI Models ---
  { slug: 'flux-schnell', name: 'FLUX.1 Schnell/Dev', category: 'image', provider: 'Black Forest Labs', description: 'High-speed, photorealistic image generation' },
  { slug: 'stable-diffusion-3', name: 'Stable Diffusion 3.5', category: 'image', provider: 'Stability AI', description: 'Open-weight high-fidelity text-to-image' },
  { slug: 'midjourney-v6', name: 'Midjourney v6', category: 'image', provider: 'Midjourney', description: 'Cinematic, hyper-artistic visual styling' },
  { slug: 'dall-e-3', name: 'DALL·E 3', category: 'image', provider: 'OpenAI', description: 'Precise prompt compliance and detail' },
  { slug: 'imagen-3', name: 'Google Imagen 3', category: 'image', provider: 'Google', description: 'Photorealistic text-to-image synthesis' },
  { slug: 'ideogram-v2', name: 'Ideogram v2', category: 'image', provider: 'Ideogram', description: 'Superior typography and graphic design rendering' },

  // --- 🎬 Video Generation AI Models ---
  { slug: 'sora-cinematic', name: 'Sora Video', category: 'video', provider: 'OpenAI', description: 'Hyper-realistic cinematic world simulation' },
  { slug: 'veo-ultra', name: 'Veo Ultra', category: 'video', provider: 'Google', description: 'Cinematic 16:9 and 9:16 professional video' },
  { slug: 'runway-gen3', name: 'Runway Gen-3 Alpha', category: 'video', provider: 'Runway', description: 'Cinematic text-to-video and motion control' },
  { slug: 'kling-ai', name: 'Kling AI', category: 'video', provider: 'Kling', description: 'Complex physics and dynamic action video' },
  { slug: 'pika-2', name: 'Pika 2.0', category: 'video', provider: 'Pika', description: 'Creative video effects and animation' },
  { slug: 'luma-dream-machine', name: 'Luma Dream Machine', category: 'video', provider: 'Luma Labs', description: 'Fast, realistic camera pans and transitions' },
  { slug: 'hailuo-ai', name: 'Hailuo AI (Minimax)', category: 'video', provider: 'Minimax', description: 'Expressive cinematic video synthesis' },

  // --- 🎙️ Voice & Audio AI ---
  { slug: 'elevenlabs-voice', name: 'ElevenLabs Studio', category: 'voice', provider: 'ElevenLabs', description: 'Hyper-realistic voice cloning and TTS' },
  { slug: 'azure-speech', name: 'Azure Speech Service', category: 'voice', provider: 'Microsoft', description: 'Enterprise neural text-to-speech & STT' },
  { slug: 'whisper-large', name: 'OpenAI Whisper v3', category: 'voice', provider: 'OpenAI', description: 'Robust multilingual speech recognition' },
  { slug: 'deepgram-nova', name: 'Deepgram Nova-2', category: 'voice', provider: 'Deepgram', description: 'Ultra-fast real-time voice transcription' }
];
