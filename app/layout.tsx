import './globals.css';

export const metadata = {
  title: 'OmniAI Engine - Unified Multimodal AI Platform',
  description: 'Interact with world-class AI models powered by Supabase & Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col selection:bg-indigo-500 selection:text-white font-sans">
        
        {/* Glowing Futuristic Ambient Background Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-lg text-white shadow-lg shadow-indigo-500/25">
                Ω
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  OmniAI Engine
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-widest uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/50 px-2 py-0.5 rounded-full">
                  v3.5 Multi-Model
                </span>
              </div>
            </div>

            {/* Quick Ecosystem Model Navigation Indicators */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <span className="text-blue-400">🤖</span> Chat & Reasoning
              </span>
              <span className="flex items-center gap-1.5 hover:text-purple-400 transition-colors">
                <span className="text-purple-400">🧠</span> Open Weights
              </span>
              <span className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                <span className="text-pink-400">🎨</span> Image Gen
              </span>
              <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <span className="text-amber-400">🎬</span> Cinematic Video
              </span>
              <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span className="text-emerald-400">🎙️</span> Voice Studio
              </span>
            </nav>

            {/* Live System Status Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden sm:inline">29 Active Models Ready</span>
                <span className="sm:hidden">Active</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Global Futuristic Platform Footer */}
        <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 md:px-8 py-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              <p className="font-medium text-slate-400">OmniAI Multimodal Ecosystem Engine</p>
              <p className="mt-0.5">Powered by OpenAI, Anthropic, Google Veo, Black Forest Labs, Stability, ElevenLabs & DeepSeek.</p>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-emerald-500">● Global API Cluster: Online</span>
              <span>•</span>
              <span className="text-slate-400">Next.js App Router</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
