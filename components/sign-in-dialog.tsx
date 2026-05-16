"use client"

import * as React from "react"
import { useState } from "react"
import { signIn, signUp } from "@/lib/auth-client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface SignInDialogProps {
  children: React.ReactNode
}

export function SignInDialog({ children }: SignInDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signin") {
        const { data, error } = await signIn.email({
          email,
          password,
        })
        if (error) {
          setError(error.message || "Échec de la connexion")
        } else {
          setOpen(false)
          router.refresh()
        }
      } else {
        const { data, error } = await signUp.email({
          email,
          password,
          name,
        })
        if (error) {
          setError(error.message || "Échec de l'inscription")
        } else {
          setOpen(false)
          router.refresh()
        }
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "signin" ? "Connexion" : "Inscription"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {mode === "signin" 
              ? "Entrez vos identifiants pour accéder au projet." 
              : "Créez un compte pour rejoindre le projet."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAuth} className="space-y-4 mt-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading 
              ? (mode === "signin" ? "Connexion..." : "Inscription...") 
              : (mode === "signin" ? "Se connecter" : "S'inscrire")}
          </Button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {mode === "signin" 
                ? "Pas encore de compte ? S'inscrire" 
                : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
