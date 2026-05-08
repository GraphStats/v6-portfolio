"use client"

import { useState, useEffect } from "react"
import { Sparkles, GraduationCap, Briefcase, Trophy, Milestone } from "lucide-react"
import type { Moment } from "@/lib/types"

interface MomentTimelineProps {
    moments: Moment[]
}

const ICON_MAP: Record<string, any> = {
    "graduation-cap": GraduationCap,
    "briefcase": Briefcase,
    "trophy": Trophy,
    "milestone": Milestone,
    "sparkles": Sparkles,
}

export function MomentTimeline({ moments }: MomentTimelineProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="space-y-12">
                {[1, 2, 3].map((idx) => (
                    <div key={idx} className="glass p-12 rounded-[2rem] border-white/5 h-48 animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-8 md:before:left-1/2 before:w-[1px] before:bg-white/5 pb-12">
            {moments.length === 0 ? (
                <div className="glass p-12 rounded-[2.5rem] border-white/5 text-center text-muted-foreground font-medium italic">
                    No journey records found.
                </div>
            ) : (
                moments.map((moment, idx) => {
                    const isLeft = idx % 2 === 0
                    const IconComp = ICON_MAP[moment.icon || "milestone"] || Milestone

                    return (
                        <div key={moment.id} className="relative flex w-full group py-4 reveal-up">
                            {/* Timeline Dot */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-white/10 z-20 group-hover:border-primary transition-all duration-500 shadow-xl top-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                            </div>

                            {isLeft ? (
                                <>
                                    <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 flex md:justify-end">
                                        <div className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-primary/30 transition-all duration-500 group-hover:translate-y-[-8px] w-full max-w-lg mesh-bg relative overflow-hidden group/card shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                                            
                                            <div className="relative z-10 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover/card:scale-110 transition-transform">
                                                            <IconComp className="h-5 w-5" />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">{moment.type}</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-muted-foreground bg-white/5 px-3 py-1 rounded-full">{moment.date}</span>
                                                </div>
                                                
                                                <h3 className="text-2xl font-bold tracking-tight text-foreground/90 group-hover/card:text-primary transition-colors">{moment.title}</h3>
                                                
                                                {moment.description && (
                                                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                                                        {moment.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-1/2" />
                                </>
                            ) : (
                                <>
                                    <div className="hidden md:block md:w-1/2" />
                                    <div className="w-full md:w-1/2 pl-20 md:pl-16 flex md:justify-start">
                                        <div className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-primary/30 transition-all duration-500 group-hover:translate-y-[-8px] w-full max-w-lg mesh-bg relative overflow-hidden group/card shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                                            
                                            <div className="relative z-10 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover/card:scale-110 transition-transform">
                                                            <IconComp className="h-5 w-5" />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">{moment.type}</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-muted-foreground bg-white/5 px-3 py-1 rounded-full">{moment.date}</span>
                                                </div>
                                                
                                                <h3 className="text-2xl font-bold tracking-tight text-foreground/90 group-hover/card:text-primary transition-colors">{moment.title}</h3>
                                                
                                                {moment.description && (
                                                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                                                        {moment.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })
            )}
        </div>
    )
}
