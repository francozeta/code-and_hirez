"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()

  const isJobDetailPage = pathname?.startsWith("/jobs/") && pathname !== "/jobs"

  if (isJobDetailPage) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 md:h-16 items-center">
          <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm md:text-base">Volver a vacantes</span>
            </Link>
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 md:h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 76 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vercel Logo"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
          </svg>
          <span className="font-serif text-lg md:text-xl font-semibold tracking-tight">Code&Hire</span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-6">
          <Link
            href="/jobs"
            className="text-xs md:text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Vacantes
          </Link>
          <Button asChild size="sm" className="rounded-full text-xs md:text-sm h-8 md:h-9 px-3 md:px-4">
            <Link href="/admin/login">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
