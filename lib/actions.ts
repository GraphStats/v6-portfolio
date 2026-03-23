"use server"

import { db } from "@/db"
import { projects, admins, settings, siteUpdates } from "@/db/schema"
import { eq, desc, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { Project, Admin, SiteUpdate } from "./types"
import bcrypt from "bcryptjs"

export async function createProject(data: Partial<Project>) {
  try {
    const { id, created_at, updated_at, ...insertData } = data as any
    const [newProject] = await db.insert(projects).values({
      ...insertData,
      created_at: new Date()
    }).returning()
    
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    return { success: true, project: newProject }
  } catch (error: any) {
    console.error("Error creating project:", error)
    return { success: false, error: error.message }
  }
}

export async function updateProject(id: string, data: Partial<Project>) {
  try {
    const { id: _, created_at, updated_at, ...updateData } = data as any
    await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, parseInt(id)))
    
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating project:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, parseInt(id)))
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting project:", error)
    return { success: false, error: error.message }
  }
}

export async function createAdmin(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.insert(admins).values({
      email,
      password: hashedPassword,
    })
    return { success: true }
  } catch (error: any) {
    console.error("Error creating admin:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteAdmin(id: string) {
  try {
    await db.delete(admins).where(eq(admins.id, parseInt(id)))
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting admin:", error)
    return { success: false, error: error.message }
  }
}

export async function getAdmins() {
  try {
    const data = await db.select().from(admins).orderBy(desc(admins.created_at))
    return { success: true, data: data.map((admin: any) => ({ ...admin, id: admin.id.toString(), created_at: admin.created_at?.toISOString() })) }
  } catch (error: any) {
    console.error("Error fetching admins:", error)
    return { success: false, error: error.message, data: [] }
  }
}

export async function getMaintenanceMode() {
  try {
    const [row] = await db.select().from(settings).where(eq(settings.key, "general")).limit(1)
    if (row) {
      const data = row.value as any
      return {
        success: true,
        isMaintenance: data.maintenance_mode || false,
        message: data.maintenance_message || "",
        progress: data.maintenance_progress || 0
      }
    }
    return { success: true, isMaintenance: false, message: "", progress: 0 }
  } catch (error: any) {
    console.error("Error fetching maintenance mode:", error)
    return { success: false, error: error.message, isMaintenance: false, message: "", progress: 0 }
  }
}

export async function updateMaintenanceMode(isMaintenance: boolean, message?: string, progress?: number) {
  try {
    const data: any = { maintenance_mode: isMaintenance }
    if (message !== undefined) data.maintenance_message = message
    if (progress !== undefined) data.maintenance_progress = progress

    await db.insert(settings)
      .values({ key: "general", value: data })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value: data, updated_at: new Date() }
      })

    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating maintenance mode:", error)
    return { success: false, error: error.message }
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
    if (project) {
        return {
            ...project,
            id: project.id.toString(),
            created_at: project.created_at?.toISOString()
        } as unknown as Project
    }
    return null
  } catch (error) {
    console.error("Error fetching project by slug:", error)
    return null
  }
}

export async function getAvailability() {
  try {
    const [row] = await db.select().from(settings).where(eq(settings.key, "availability")).limit(1)
    if (row) {
      return { success: true, isAvailable: (row.value as any).isAvailable }
    }
    return { success: true, isAvailable: true }
  } catch (error: any) {
    console.error("Error fetching availability:", error)
    return { success: false, isAvailable: true }
  }
}

export async function updateAvailability(isAvailable: boolean) {
  try {
    await db.insert(settings)
      .values({ key: "availability", value: { isAvailable } })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value: { isAvailable }, updated_at: new Date() }
      })

    revalidatePath("/")
    revalidatePath("/contact")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating availability:", error)
    return { success: false, error: error.message }
  }
}

export async function getSiteUpdateData() {
  try {
    const [row] = await db.select().from(siteUpdates).limit(1)
    if (row) {
      return {
        success: true,
        data: {
          ...row,
          id: row.id.toString(),
          next_update_date: row.next_update_date?.toISOString() || null,
          updated_at: row.updated_at?.toISOString() || new Date().toISOString(),
          changelog: row.changelog as any || [],
          planned_features: row.planned_features as any || [],
        } as SiteUpdate
      }
    }
    return {
      success: true,
      data: {
        next_update_date: null,
        no_update_planned: true,
        planned_features: [],
        changelog: [],
        updated_at: new Date().toISOString()
      } as SiteUpdate
    }
  } catch (error: any) {
    console.error("Error fetching site update data:", error)
    return { success: false, error: error.message }
  }
}

export async function updateSiteUpdateData(data: Partial<SiteUpdate>) {
  try {
    const [row] = await db.select().from(siteUpdates).limit(1)
    
    // Convert dates if provided as strings
    const updatePayload: any = { ...data }
    if (data.next_update_date) updatePayload.next_update_date = new Date(data.next_update_date)
    if (data.updated_at) updatePayload.updated_at = new Date(data.updated_at)

    if (row) {
      await db.update(siteUpdates).set({
        ...updatePayload,
        updated_at: new Date()
      }).where(eq(siteUpdates.id, row.id))
    } else {
      await db.insert(siteUpdates).values({
        ...updatePayload,
        updated_at: new Date()
      })
    }

    revalidatePath("/")
    revalidatePath("/update")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating site update data:", error)
    return { success: false, error: error.message }
  }
}

export async function getProjects() {
  try {
    const data = await db.select().from(projects).orderBy(desc(projects.created_at))
    return { 
      success: true, 
      data: data.map((p: any) => ({ 
        ...p, 
        id: p.id.toString(), 
        created_at: p.created_at?.toISOString() || new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) as unknown as Project[]
    }
  } catch (error: any) {
    console.error("Error fetching projects:", error)
    return { success: false, error: error.message, data: [] }
  }
}
