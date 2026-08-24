import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase environment variables are missing in Vercel settings.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { userId, modelSlug, prompt, options } = body;

    if (!userId || !modelSlug || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, modelSlug, or prompt' },
        { status: 400 }
      );
    }

    // 1. Fetch model details from database
    const { data: model, error: modelError } = await supabase
      .from('ai_models')
      .select('*')
      .eq('slug', modelSlug)
      .eq('is_active', true)
      .single();

    if (modelError || !model) {
      // Fallback response if ai_models table row doesn't exist yet
      console.log('Model lookup warning:', modelError?.message);
    }

    // 2. Check user credits in Supabase profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found in Supabase database.' },
        { status: 404 }
      );
    }

    const creditCost = 5;
    if (profile.credits < creditCost) {
      return NextResponse.json(
        { error: 'Insufficient credits! Please top up your wallet.' },
        { status: 400 }
      );
    }

    // 3. Simulated Model Ecosystem Output
    const outputData = { 
      output: `Successfully processed via ${modelSlug} ecosystem adapter for prompt -> "${prompt}"`,
      timestamp: new Date().toISOString()
    };

    // 4. Deduct credits
    const newCredits = profile.credits - creditCost;
    await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId);

    return NextResponse.json({
      success: true,
      data: outputData,
      remaining_credits: newCredits
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
