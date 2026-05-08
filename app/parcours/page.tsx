import Link from "next/link"
import { ChevronLeft, Map } from "lucide-react"
import { getMaintenanceMode, getMoments } from "@/lib/actions"
import { redirect } from "next/navigation"
import { isLocalRequest } from "@/lib/server-utils"
import { MomentTimeline } from "@/components/moment-timeline"

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

    const { data: moments } = await getMoments()

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
                        <span className="font-bold tracking-tight text-foreground uppercase">My Journey</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pt-32 pb-24 container mx-auto px-6 max-w-6xl">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center space-y-8 mb-24 reveal-up">
                    <div className="text-primary font-bold tracking-widest text-xs uppercase">The Path</div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 text-glow leading-tight">
                        EVOLUTIONARY <br /> TIMELINE
                    </h1>
                </div>

                {/* Content Section */}
                <div className="reveal-up stagger-1">
                    <MomentTimeline moments={moments || []} />
                </div>
            </main>
        </div>
    )
}
