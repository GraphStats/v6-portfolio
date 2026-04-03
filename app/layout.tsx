import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { Footer } from "@/components/footer"
import { ClerkThemeProvider } from "@/components/clerk-theme-provider"
import { PauseModal } from "@/components/pause-modal"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "Drayko - Creative Developer",
  description: "Portfolio of Drayko, a Creative Developer & Designer specializing in high-performance digital experiences.",
  generator: "v0.app",
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT || "",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkThemeProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} light`}>
        <body className="font-sans antialiased selection:bg-primary/30 selection:text-primary transition-colors duration-300" suppressHydrationWarning>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
            <PauseModal />
          </div>
        </body>
      </html>
    </ClerkThemeProvider>
  )
}