"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminForm } from "./admin-form"

interface AdminDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AdminDialog({ open, onOpenChange, onSuccess }: AdminDialogProps) {
  const handleSuccess = () => {
    onSuccess?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] bg-[#0B1118] border-white/20 rounded-[2rem] shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>Create a new admin account with email and password.</DialogDescription>
        </DialogHeader>
        <AdminForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
