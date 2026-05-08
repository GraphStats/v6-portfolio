"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, GraduationCap, Briefcase, Trophy, Milestone, Sparkles } from "lucide-react"
import type { Moment } from "@/lib/types"
import { deleteMoment } from "@/lib/actions"
import { MomentDialog } from "@/components/moment-dialog"
import { DeleteAdminDialog } from "@/components/delete-admin-dialog" // Reusing delete dialog if possible or creating new

interface AdminMomentCardProps {
  moment: Moment
  onDeleted: (id: string) => void
  onUpdated: () => void
}

const ICON_MAP: Record<string, any> = {
  "graduation-cap": GraduationCap,
  "briefcase": Briefcase,
  "trophy": Trophy,
  "milestone": Milestone,
  "sparkles": Sparkles,
}

export function AdminMomentCard({ moment, onDeleted, onUpdated }: AdminMomentCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const IconComp = ICON_MAP[moment.icon || "milestone"] || Milestone

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteMoment(moment.id)
    if (result.success) {
      onDeleted(moment.id)
    }
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  return (
    <div className="group glass p-6 rounded-3xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
            <IconComp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">{moment.type}</span>
              <span className="text-[10px] font-bold text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">{moment.date}</span>
            </div>
            <h4 className="font-bold text-foreground/90 group-hover:text-primary transition-colors">{moment.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {moment.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditOpen(true)}
            className="h-8 w-8 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteOpen(true)}
            className="h-8 w-8 rounded-lg bg-white/5 hover:text-destructive hover:bg-destructive/10 border border-white/5"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <MomentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        moment={moment}
        onSuccess={onUpdated}
      />

      {/* Simplified delete confirmation */}
      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass p-8 rounded-[2rem] border-white/10 max-w-sm w-full space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Delete Moment?</h3>
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setDeleteOpen(false)} className="flex-1 rounded-xl">Cancel</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="flex-1 rounded-xl shadow-lg shadow-destructive/20">
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
