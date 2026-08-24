import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/serverless';

// Configure Fal with secret key
fal.config({
  credentials: process.env.FAL_KEY,
});

// Comprehensive AI Model Registry (Supports Flux, Kling, Veo, Sora, GLM, Luma, etc.)
const MODEL_ENDPOINTS: Record<string, string> = {
  // --- Image Generation Models ---
  'flux': 'fal-ai/flux/schnell',
  'flux-pro': 'fal-ai/flux/pro',
  'stable-diffusion': 'fal-ai/stable-diffusion-v3-medium',
  'imagen': 'fal-ai/imagen3',
  
  // --- Video & Animation Models ---
  'kling': 'fal-ai/kling-video/v1/standard/text-to-video',
  'veo': 'fal-ai/veo', 
  'sora': 'fal-ai/sora', 
  'luma': 'fal-ai/luma-dream-machine',
  'hailuo': 'fal-ai/hailuo-video',
  'fast-svd': 'fal-ai/fast-svd',
  
  // --- Advanced Script-to-Video & Narrative ---
  'script-to-video': 'fal-ai/kling-video/v1/standard/text-to-video',
  
  // --- Reasoning / Text / Custom GLM Support ---
  'glm': 'fal-ai/glm-model', // Future-proof custom model routing
};

export async function POST(req: Request) {
  try {
    const { prompt, modelType, customEndpoint } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt or Script is required' }, { status: 400 });
    }

    // Dynamic Endpoint Resolution: checks custom endpoint first, then registry map, defaults to Flux Schnell
    const endpoint = customEndpoint || MODEL_ENDPOINTS[modelType] || 'fal-ai/flux/schnell';

    // Call the selected AI model via Fal.ai API
    const result = await fal.subscribe(endpoint, {
      input: { 
        prompt: prompt,
        num_inference_steps: 28, // High quality rendering parameter
        enable_safety_checker: true,
      },
      logs: true,
    });

    return NextResponse.json({ 
      success: true, 
      modelUsed: endpoint,
      data: result.data 
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Something went wrong during generation' }, 
      { status: 500 }
    );
  }
}
