import React from 'react';
import { AlertCircle, Terminal, HelpCircle, ExternalLink } from 'lucide-react';

const ConfigErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-[#111] border border-red-900/30 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="bg-red-600/10 p-8 flex items-center gap-4 border-b border-red-900/20">
          <div className="bg-red-600 p-3 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Supabase Configuration Missing</h1>
            <p className="text-red-400/80 mt-1">Environment variables are not set correctly.</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 font-medium uppercase text-xs tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Instructions</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              To resolve this issue, you need to provide your Supabase credentials. 
              Create a <code className="bg-zinc-800 text-yellow-400 px-1.5 py-0.5 rounded">.env</code> file in your frontend root directory:
            </p>
            <pre className="bg-black/50 border border-zinc-800 p-4 rounded-xl text-sm font-mono text-zinc-400 overflow-x-auto">
              VITE_SUPABASE_URL=https://your-project.supabase.co{"\n"}
              VITE_SUPABASE_KEY=your-anon-key
            </pre>
          </section>

          <section className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-2 text-zinc-400 font-medium uppercase text-xs tracking-widest">
              <HelpCircle className="w-4 h-4" />
              <span>Where to find these keys?</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                <span className="text-zinc-200 font-medium block mb-1">1. URL</span>
                <span className="text-sm text-zinc-400">Project Settings &gt; API &gt; Project URL</span>
              </li>
              <li className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                <span className="text-zinc-200 font-medium block mb-1">2. Anon Key</span>
                <span className="text-sm text-zinc-400">Project Settings &gt; API &gt; anon/public key</span>
              </li>
            </ul>
          </section>

          <div className="flex justify-end pt-4">
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all duration-300"
            >
              Go to Supabase Dashboard
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigErrorPage;
