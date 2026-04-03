'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Coffee, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PauseModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the modal has already been shown in this session
    const hasSeenModal = sessionStorage.getItem('hasSeenPauseModal')
    if (!hasSeenModal) {
      // Delay opening slightly for a better feel
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('hasSeenPauseModal', 'true')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose()
    }}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none glass shadow-2xl">
        {/* Header with aesthetic background */}
        <div className="relative h-32 w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 construction-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background/80 backdrop-blur-md border border-white/20 shadow-xl animate-float">
            <Coffee className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="p-8 space-y-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-display font-bold text-gradient flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Petit mot de ma part
            </DialogTitle>
            <DialogDescription className="text-base text-foreground/80 leading-relaxed">
              Pour le moment, je me suis un peu éloigné de l'univers du code. Même si je continue d'en faire occasionnellement, c'est beaucoup moins qu'auparavant.
              <br /><br />
              Je suis actuellement dans une sorte de <span className="text-primary font-semibold italic">"pause créative"</span>. 
              Merci de passer par ici et de votre compréhension !
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button 
              onClick={handleClose} 
              className="w-full sm:w-auto px-8 py-6 rounded-xl text-lg font-display font-medium transition-all hover:scale-[1.02] active:scale-[0.98] glow-border"
            >
              Accéder au site
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
