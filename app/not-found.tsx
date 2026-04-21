import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center overflow-hidden relative selection:bg-primary/30 selection:text-primary">
            {/* Ambient Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#38bdf8]/30 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-[#818cf8]/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "-3s" }} />
            </div>

            <div className="noise-overlay opacity-50" />

            <div className="container relative z-10 px-6 max-w-2xl text-center space-y-12 animate-fade-in-up">
                <div className="space-y-4">
                    <div className="text-[clamp(8rem,20vw,12rem)] font-black leading-none tracking-tighter font-display opacity-80 bg-gradient-to-b from-slate-900 to-slate-900/20 bg-clip-text text-transparent">
                        404
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight font-display">
                        Unknown <span className="text-[#38bdf8]">Destination</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl max-w-lg mx-auto font-medium leading-relaxed">
                        The server cannot locate this section of the portfolio. It is possible that this project has been moved or no longer exists in my archives.
                    </p>
                </div>

                <div className="flex justify-center pt-4">
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]"
                    >
                        <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Return to Hub
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#38bdf8] to-[#818cf8] opacity-0 group-hover:opacity-20 transition-opacity" />
                    </Link>
                </div>

                <div className="flex justify-center gap-3 opacity-30">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                </div>
            </div>
        </div>
    )
}
