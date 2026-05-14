"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AuthButtons() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  if (isPending) return null

  if (!session) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="hidden sm:flex rounded-full glass border border-white/10 hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
        onClick={() => router.push('/admin')}
      >
        Se connecter
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="sm"
      className="hidden sm:flex rounded-full glass border border-white/10 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
      onClick={async () => {
        await signOut()
        router.refresh()
      }}
    >
      Déconnexion ({session.user.name || session.user.email})
    </Button>
  )
}