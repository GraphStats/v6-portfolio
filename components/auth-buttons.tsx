"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

function AuthButtonsContent() {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && userId) {
      // Force a refresh when user signs in to update the UI
      router.refresh()
    }
  }, [isLoaded, userId, router])

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full glass border border-white/10 hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            Se connecter
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export function AuthButtons() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey && process.env.NODE_ENV === 'development') {
    return null
  }

  return <AuthButtonsContent />
}