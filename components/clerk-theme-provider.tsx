"use client"

import { ClerkProvider } from '@clerk/nextjs'

import { Suspense } from 'react'

export function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // If key is missing, don't wrap in ClerkProvider to avoid crash
  if (!publishableKey) {
    return <>{children}</>
  }

  return (
    <Suspense fallback={null}>
      <ClerkProvider
        publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorInputBackground: '#f8fafc',
          colorInputText: '#0f172a',
          colorText: '#0f172a',
        }
      }}
    >
      {children}
    </ClerkProvider>
  </Suspense>
)
}