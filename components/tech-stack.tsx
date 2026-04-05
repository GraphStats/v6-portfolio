"use client"

import Image from "next/image"

interface TechItem {
  name: string
  logo: string
}

const techStack: TechItem[] = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", logo: "https://www.svgrepo.com/show/303251/mysql-logo.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "OVHcloud", logo: "https://help.ovhcloud.com/a2a82603cd444d10f0788c63c19c1a4e.iix" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "PM2", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pm2/pm2-original.svg" },
  { name: "NPM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  { name: "Pterodactyl", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/pterodactyl.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Proxmox", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox.svg" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
]

const half = Math.ceil(techStack.length / 2)
const row1 = techStack.slice(0, half)
const row2 = techStack.slice(half)

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="group/card relative h-40 w-48 shrink-0 flex flex-col items-center justify-center gap-4 rounded-3xl glass border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:scale-[1.03]">
      <div className="absolute inset-0 bg-primary/0 group-hover/card:bg-primary/5 transition-colors duration-500" />
      <div className="relative w-12 h-12 flex items-center justify-center p-1 group-hover/card:scale-125 transition-all duration-500">
        <Image
          src={tech.logo}
          alt={tech.name}
          width={48}
          height={48}
          className={`w-full h-full object-contain transition-all duration-500 group-hover/card:scale-110 ${["Vercel", "AWS"].includes(tech.name) ? "brightness-0 dark:invert" : ""}`}
        />
      </div>
      <span className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground group-hover/card:text-foreground transition-colors">
        {tech.name}
      </span>
    </div>
  )
}

export function TechStack() {
  return (
    <section id="tech-stack" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <div className="text-primary font-bold tracking-widest text-sm uppercase reveal-up">Expertise</div>
          <h3 className="text-5xl md:text-6xl font-bold tracking-tight font-display reveal-up stagger-1">TECHNICAL ECOSYSTEM</h3>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto reveal-up stagger-2">
            Leveraging cutting-edge technologies to build robust, scalable,
            and future-proof digital solutions.
          </p>
        </div>

        {/* Masque sur l'outer div SANS overflow */}
        <div
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {/* overflow-hidden sur l'inner div */}
          <div className="overflow-hidden py-4">
            <div className="flex flex-col gap-6">

              {/* Ligne 1 — gauche */}
              <div className="flex w-max gap-6">
                {[...row1, ...row1].map((tech, i) => (
                  <div key={`r1-${i}`} style={{ animation: "marquee-left 40s linear infinite" }}>
                    <TechCard tech={tech} />
                  </div>
                ))}
              </div>

              {/* Ligne 2 — droite */}
              <div className="flex w-max gap-6">
                {[...row2, ...row2].map((tech, i) => (
                  <div key={`r2-${i}`} style={{ animation: "marquee-right 40s linear infinite" }}>
                    <TechCard tech={tech} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
