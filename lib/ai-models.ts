export interface AIModel {
  slug: string;
  name: string;
  category: 'chat' | 'reasoning' | 'coding' | 'image' | 'video' | 'voice';
  provider: string;
  family: string;
  useCase: string;
  description: string;
}

export const AI_MODELS_ECOSYSTEM: AIModel[] = [
  {
    slug: 'gpt-4o',
    name: 'GPT-4o',
    category: 'chat',
    provider: 'OpenAI',
    family: 'GPT',
    useCase: 'Chat, Coding, Reasoning, Images',
    description: 'Flagship multimodal model with high intelligence and speed.'
  },
  {
    slug: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    category: 'chat',
    provider: 'Anthropic',
    family: 'Claude',
    useCase: 'Writing, Coding, Analysis',
    description: 'Advanced reasoning and exceptional coding capabilities.'
  },
  {
    slug: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    category: 'chat',
    provider: 'Google',
    family: 'Gemini',
    useCase: 'Multimodal AI, Research',
    description: 'Massive context window with deep research and multimodal support.'
  },
  {
    slug: 'grok-2',
    name: 'Grok 2',
    category: 'chat',
    provider: 'xAI',
    family: 'Grok',
    useCase: 'Real-time information, Reasoning',
    description: 'Real-time data integration and advanced reasoning.'
  },
  {
    slug: 'deepseek-chat',
    name: 'DeepSeek V3 / R1',
    category: 'reasoning',
    provider: 'DeepSeek',
    family: 'DeepSeek',
    useCase: 'Coding, Math, Reasoning',
    description: 'State-of-the-art open-architecture reasoning and coding model.'
  },
  {
    slug: 'llama-3-70b',
    name: 'Llama 3 70B',
    category: 'coding',
    provider: 'Meta',
    family: 'Llama',
    useCase: 'Open-weight AI, Custom AI',
    description: 'Powerful open-weight model family for custom deployments.'
  },
  {
    slug: 'flux-schnell',
    name: 'FLUX.1 Schnell',
    category: 'image',
    provider: 'BFL',
    family: 'FLUX',
    useCase: 'High-speed image generation',
    description: 'State-of-the-art open image generation model.'
  },
  {
    slug: 'sora-cinematic',
    name: 'Sora Video',
    category: 'video',
    provider: 'OpenAI',
    family: 'Sora',
    useCase: 'Cinematic video creation',
    description: 'Generate high-fidelity realistic video scenes from text prompts.'
  },
  {
    slug: 'elevenlabs-voice',
    name: 'ElevenLabs Voice',
    category: 'voice',
    provider: 'ElevenLabs',
    family: 'Audio',
    useCase: 'Text-to-speech & Voice cloning',
    description: 'Ultra-realistic human voice synthesis and emotional speech.'
  }
];
