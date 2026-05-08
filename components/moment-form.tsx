"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Moment } from "@/lib/types"
import { createMoment, updateMoment } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { Save, Sparkles, GraduationCap, Briefcase, Trophy, Milestone } from "lucide-react"

interface MomentFormProps {
  moment?: Moment
  onSuccess?: () => void
}

const ICON_OPTIONS = [
  { value: "graduation-cap", label: "Education", icon: GraduationCap },
  { value: "briefcase", label: "Work", icon: Briefcase },
  { value: "trophy", label: "Milestone", icon: Trophy },
  { value: "milestone", label: "General", icon: Milestone },
  { value: "sparkles", label: "Special", icon: Sparkles },
]

export function MomentForm({ moment, onSuccess }: MomentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [type, setType] = useState<"education" | "work" | "milestone">(moment?.type || "milestone")
  const [icon, setIcon] = useState<string>(moment?.icon || "milestone")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const momentData: Partial<Moment> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      type: type,
      icon: icon,
    }

    try {
      const result = moment 
        ? await updateMoment(moment.id, momentData) 
        : await createMoment(momentData)

      if (!result.success) {
        setError(result.error || "An error occurred")
        setIsLoading(false)
        return
      }

      router.refresh()
      onSuccess?.()
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 bg-muted/40 p-6 rounded-3xl border border-border/60">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[10px] uppercase tracking-widest text-foreground/70 ml-1">Title</Label>
          <Input id="title" name="title" defaultValue={moment?.title} required className="h-10 rounded-xl border-white/10 bg-white/5 font-bold" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-[10px] uppercase tracking-widest text-foreground/70 ml-1">Description</Label>
          <Textarea id="description" name="description" defaultValue={moment?.description || ""} rows={3} className="rounded-xl border-white/10 bg-white/5 min-h-[100px] text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Date (e.g. Sept 2021)</Label>
            <Input id="date" name="date" defaultValue={moment?.date} required className="h-10 rounded-xl border-white/10 bg-white/5" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
            <Select value={type} onValueChange={(val: any) => setType(val)}>
              <SelectTrigger className="h-10 rounded-xl border-white/10 bg-white/5">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Icon</Label>
          <div className="grid grid-cols-5 gap-2">
            {ICON_OPTIONS.map((opt) => {
              const IconComp = opt.icon
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIcon(opt.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    icon === opt.value 
                    ? "bg-primary/20 border-primary text-primary" 
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  <IconComp className="h-5 w-5 mb-1" />
                  <span className="text-[8px] uppercase font-bold">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pt-4">
        {error && <p className="text-xs text-destructive font-bold mb-3 text-center">{error}</p>}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl transition-all"
        >
          {isLoading ? "Saving..." : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {moment ? "Update Moment" : "Create Moment"}
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
