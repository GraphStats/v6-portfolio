"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, LogOut, Home, UserPlus, LayoutDashboard, Database, Shield, History as HistoryIcon, Activity, Sparkles } from "lucide-react"
import { AdminProjectCard } from "@/components/admin-project-card"
import { ProjectDialog } from "@/components/project-dialog"
import { AdminDialog } from "@/components/admin-dialog"
import { AdminCard } from "@/components/admin-card"
import { AdminStats } from "@/components/admin-stats"
import { UpdateDialog } from "@/components/update-dialog"
import { BadgeDialog } from "@/components/badge-dialog"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import type { Project, Admin, SiteUpdate } from "@/lib/types"
import { logoutAdmin } from "@/lib/auth"
import { getAdmins, getMaintenanceMode, getAvailability, getProjects, getSiteUpdateData } from "@/lib/actions"
import { MaintenanceToggle } from "@/components/maintenance-toggle"
import { AvailabilityToggle } from "@/components/availability-toggle"
import Link from "next/link"

export default function AdminDashboardClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  const [addAdminOpen, setAddAdminOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false)
  const [updateData, setUpdateData] = useState<SiteUpdate | null>(null)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState("")
  const [maintenanceProgress, setMaintenanceProgress] = useState(0)
  const [isAvailable, setIsAvailable] = useState(true)

  const fetchProjects = async () => {
    const result = await getProjects()
    if (result.success) {
      setProjects(result.data)
    }
    setIsLoading(false)
  }

  const fetchAdmins = async () => {
    const result = await getAdmins()
    if (result.success) {
      setAdmins(result.data as Admin[])
    }
  }

  const fetchUpdateData = async () => {
    const result = await getSiteUpdateData()
    if (result.success && result.data) {
      setUpdateData(result.data)
    }
  }

  const fetchMaintenanceMode = async () => {
    const result = await getMaintenanceMode()
    if (result.success) {
      setMaintenanceMode(result.isMaintenance)
      setMaintenanceMessage(result.message || "")
      setMaintenanceProgress(result.progress || 0)
    }
  }

  const fetchAvailability = async () => {
    const result = await getAvailability()
    if (result.success && result.isAvailable !== undefined) {
      setIsAvailable(result.isAvailable)
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchAdmins()
    fetchUpdateData()
    fetchMaintenanceMode()
    fetchAvailability()
  }, [])

  const handleProjectDeleted = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  const handleProjectUpdated = () => {
    fetchProjects()
  }

  const handleAdminDeleted = () => {
    fetchAdmins()
  }

  const handleLogout = async () => {
    await logoutAdmin()
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary transition-colors duration-500 font-sans">
      <div className="noise-overlay" />

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-background/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-3">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gradient hidden sm:block">Control Center</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full border border-white/10 glass hover:bg-white/10 hover:text-foreground transition-all">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Live Site
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="destructive" size="sm" className="rounded-full shadow-lg shadow-destructive/20">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 pt-32 pb-24 container mx-auto px-6">
        <Accordion type="multiple" defaultValue={["content"]} className="w-full space-y-8">
          
          {/* TOP LEVEL 1: CONTENT */}
          <AccordionItem value="content" className="border-none">
            <AccordionTrigger className="glass p-8 rounded-3xl hover:no-underline hover:bg-white/5 group transition-all data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-6 text-left">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all duration-500">
                  <Database className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 mb-1">Portfolio & Assets</p>
                  <h3 className="text-3xl font-bold tracking-tight">CONTENT HUB</h3>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="glass border-t-0 p-10 rounded-b-[2rem] border-white/5 bg-white/[0.01]">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">MANAGE PROJECTS</h2>
                    <p className="text-muted-foreground font-medium max-w-xl text-sm">
                      Update your latest achievements and keep your professional presence sharp.
                    </p>
                  </div>
                  <Button onClick={() => setAddProjectOpen(true)} className="rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 group self-start md:self-auto transition-all">
                    <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    New Project
                  </Button>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-64 rounded-2xl glass border-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="glass p-12 rounded-3xl border-white/5 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-muted-foreground">
                      <Database className="h-8 w-8" />
                    </div>
                    <p className="text-muted-foreground italic">No projects archived yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <AdminProjectCard
                        key={project.id}
                        project={project}
                        onDeleted={handleProjectDeleted}
                        onUpdated={handleProjectUpdated}
                      />
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* TOP LEVEL 2: INSIGHTS */}
          <AccordionItem value="insights" className="border-none">
            <AccordionTrigger className="glass p-8 rounded-3xl hover:no-underline hover:bg-white/5 group transition-all data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-6 text-left">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all duration-500">
                  <Activity className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 mb-1">Performance Overview</p>
                  <h3 className="text-3xl font-bold tracking-tight">NETWORK PULSE</h3>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="glass border-t-0 p-10 rounded-b-[2rem] border-white/5 bg-white/[0.01]">
              <div className="space-y-8">
                <p className="text-muted-foreground font-medium max-w-xl">
                  Real-time insights into traffic, security, and performance across the global edge network.
                </p>
                <AdminStats />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* TOP LEVEL 3: SYSTEM */}
          <AccordionItem value="system" className="border-none">
            <AccordionTrigger className="glass p-8 rounded-3xl hover:no-underline hover:bg-white/5 group transition-all data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-6 text-left">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all duration-500">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 mb-1">Infrastructure & Control</p>
                  <h3 className="text-3xl font-bold tracking-tight">SYSTEM SETTINGS</h3>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="glass border-t-0 p-10 rounded-b-[2rem] border-white/5 bg-white/[0.01]">
              <Accordion type="single" collapsible className="w-full space-y-6">
                
                {/* Nested: Communications */}
                <AccordionItem value="communications" className="border-none bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/5">
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">Hero Communications</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/5 pt-8">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">HOMEPAGE BADGE</h2>
                        <p className="text-muted-foreground font-medium max-w-xl text-sm">
                          Update the headline message that visitors see first.
                        </p>
                      </div>
                      <Button
                        onClick={() => setBadgeDialogOpen(true)}
                        className="rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all self-start md:self-auto"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Update Headline
                      </Button>
                    </div>

                    <div className="glass p-8 rounded-2xl border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-6">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                          <Sparkles className="h-6 w-6 text-primary shadow-glow shadow-primary/20" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Live Content</p>
                          <p className="text-lg font-bold text-foreground/90 italic">
                            "{updateData?.latest_update_text || "Fix database bug and new interface (v3!)"}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Nested: Evolution */}
                <AccordionItem value="evolution" className="border-none bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/5">
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-4">
                      <HistoryIcon className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">Site Evolution</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/5 pt-8">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">SYSTEM UPDATES</h2>
                        <p className="text-muted-foreground font-medium max-w-xl text-sm">
                          Coordinate release cycles and document version changes.
                        </p>
                      </div>
                      <Button onClick={() => setUpdateDialogOpen(true)} variant="outline" className="rounded-xl h-12 px-6 glass border-white/10 hover:bg-white/10 transition-all shrink-0">
                        <HistoryIcon className="mr-2 h-4 w-4" />
                        Manage Logs
                      </Button>
                    </div>
                    <div className="glass p-8 rounded-2xl border-white/5 bg-white/[0.02] flex items-center gap-4">
                       <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                        <HistoryIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Track the evolution of the platform with detailed version logs.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Nested: Status */}
                <AccordionItem value="status" className="border-none bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/5">
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-4">
                      <Activity className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">Platform Status</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 space-y-8">
                    <div className="border-t border-white/5 pt-8">
                       <p className="text-muted-foreground font-medium max-w-xl text-sm mb-8">
                        Manage global site states. Activate maintenance mode or set professional availability.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-8 rounded-2xl border-white/5 bg-white/[0.02] flex items-center justify-center">
                          <MaintenanceToggle initialState={maintenanceMode} initialMessage={maintenanceMessage} initialProgress={maintenanceProgress} onUpdated={fetchMaintenanceMode} />
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-4 text-center">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Availability</p>
                            <p className="text-xs text-muted-foreground">Toggle status for new projects.</p>
                          </div>
                          <AvailabilityToggle initialState={isAvailable} />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Nested: Admins */}
                <AccordionItem value="admins" className="border-none bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/5">
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-4">
                      <UserPlus className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">Access Control</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/5 pt-8">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">PLATFORM ADMINS</h2>
                        <p className="text-muted-foreground font-medium max-w-xl text-sm">
                          Secure your dashboard by managing authorized personnel.
                        </p>
                      </div>
                      <Button onClick={() => setAddAdminOpen(true)} variant="outline" className="rounded-xl h-12 px-6 border border-white/10 glass hover:bg-white/10 self-start md:self-auto transition-all">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register Admin
                      </Button>
                    </div>

                    {admins.length === 0 ? (
                      <div className="glass p-12 rounded-3xl border-white/5 text-center">
                        <p className="text-muted-foreground italic text-sm">Scanning for authorized accounts...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {admins.map((admin) => (
                          <AdminCard key={admin.id} admin={admin} onDeleted={handleAdminDeleted} />
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <ProjectDialog open={addProjectOpen} onOpenChange={setAddProjectOpen} onSuccess={fetchProjects} />
      <AdminDialog open={addAdminOpen} onOpenChange={setAddAdminOpen} onSuccess={fetchAdmins} />
      <UpdateDialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} onSuccess={fetchUpdateData} />
      <BadgeDialog open={badgeDialogOpen} onOpenChange={setBadgeDialogOpen} onSuccess={fetchUpdateData} />
    </div>
  )
}
