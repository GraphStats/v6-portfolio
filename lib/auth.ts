"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { admins } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import bcrypt from "bcryptjs"

const ADMIN_SESSION_COOKIE = "admin_session"

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  console.log("[Auth] Verifying credentials for:", email)

  try {
    const [admin] = await db.select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1)

    if (!admin) {
      console.log("[Auth] Admin not found")
      return false
    }

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) {
      console.log("[Auth] Verification failed: Invalid password")
      return false
    }

    console.log("[Auth] Verification successful")
    return true
  } catch (error) {
    console.error("[Auth] Verification error:", error)
    return false
  }
}

export async function createAdminSession() {
  console.log("[Auth] Creating admin session")
  const cookieStore = await cookies()
  // Create a simple session token
  const sessionToken = Buffer.from(`admin_${Date.now()}`).toString("base64")

  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })

  console.log("[Auth] Session created successfully")
  return true
}

export async function loginAdmin(email: string, password: string) {
  console.log("[Auth] Login attempt for:", email)

  const isValid = await verifyAdminCredentials(email, password)

  if (!isValid) {
    console.log("[Auth] Invalid credentials")
    return { success: false, error: "Invalid email or password" }
  }

  console.log("[Auth] Credentials valid, creating session")
  await createAdminSession()

  console.log("[Auth] Redirecting to dashboard")
  redirect("/admin/dashboard")
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  return !!session
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  redirect("/admin")
}

export async function deleteAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}
