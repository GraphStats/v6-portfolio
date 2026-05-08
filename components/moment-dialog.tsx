"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MomentForm } from "@/components/moment-form"
import type { Moment } from "@/lib/types"

interface MomentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  moment?: Moment
  onSuccess?: () => void
}

export function MomentDialog({ open, onOpenChange, moment, onSuccess }: MomentDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false)
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl flex flex-col p-0 overflow-hidden bg-background border border-border/80 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-[2rem]">
        <div className="px-8 pt-8 pb-4 bg-muted/30 border-b border-border/80">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tight text-foreground">{moment ? "Edit Moment" : "Add New Moment"}</DialogTitle>
            <DialogDescription className="text-sm font-medium text-muted-foreground">
              {moment ? "Update the career milestone below." : "Fill in the details to document a new journey milestone."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-8">
          <MomentForm moment={moment} onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
