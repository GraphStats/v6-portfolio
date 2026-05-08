import Link from "next/link"
import { ChevronLeft, Map, Sparkles, GraduationCap, Briefcase, Trophy, Milestone } from "lucide-react"
import { getMaintenanceMode } from "@/lib/actions"
import { redirect } from "next/navigation"
import { isLocalRequest } from "@/lib/server-utils"

export const dynamic = "force-dynamic"

export default async function ParcoursPage() {
    // Platform Status check (Skipped if local)
    const isLocal = await isLocalRequest()
    if (!isLocal) {
        // Maintenance check
        const { isMaintenance } = await getMaintenanceMode()
        if (isMaintenance) {
            redirect("/maintenance")
        }
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans selection:bg-primary/30 selection:text-primary">
            <div className="noise-overlay" />

            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "-4s" }} />
            </div>

            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-background/60 reveal-down">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all group">
                        <div className="p-2 rounded-xl glass border-white/10 group-hover:border-primary/50 transition-all">
                            <ChevronLeft className="h-4 w-4" />
                        </div>
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <Map className="h-5 w-5 text-primary" />
                        <span className="font-bold tracking-tight text-foreground">My Parcours</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pt-32 pb-24 container mx-auto px-6">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center space-y-8 mb-24 reveal-up">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 text-glow">
                        MY JOURNEY
                    </h1>
                </div>

                {/* Content Section (Empty as requested, but with a nice placeholder) */}
                <div className="max-w-5xl mx-auto">
                    <div className="glass p-8 md:p-20 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden mesh-bg flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 reveal-up stagger-1">
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary animate-float">
                            <Sparkles className="h-10 w-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Coming Soon</h2>
                            <p className="text-muted-foreground font-medium max-w-md mx-auto">
                                I'm currently curating the best moments of my career to share them with you. Stay tuned!
                            </p>
                        </div>

                        {/* Visual guide for future content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12 opacity-50">
                            <div className="p-6 rounded-2xl bg-background/30 border border-white/5 flex flex-col items-center gap-4">
                                <GraduationCap className="h-8 w-8 text-muted-foreground" />
                                <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
                            </div>
                            <div className="p-6 rounded-2xl bg-background/30 border border-white/5 flex flex-col items-center gap-4">
                                <Briefcase className="h-8 w-8 text-muted-foreground" />
                                <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
                            </div>
                            <div className="p-6 rounded-2xl bg-background/30 border border-white/5 flex flex-col items-center gap-4">
                                <Trophy className="h-8 w-8 text-muted-foreground" />
                                <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
