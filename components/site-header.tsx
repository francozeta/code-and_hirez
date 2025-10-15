"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerTitle } from "@/components/ui/drawer"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          <span className="font-serif text-lg md:text-xl font-semibold tracking-tight">Code&Hirez</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/jobs" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Vacantes
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Sobre mí
          </Link>
          <a
            href="https://www.linkedin.com/in/alearrunategui/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <Button asChild size="sm" className="rounded-full text-sm h-9 px-4">
            <Link href="/admin/login">Admin</Link>
          </Button>
        </nav>

        {mounted && (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-4 pb-8">
              <VisuallyHidden>
                <DrawerTitle>Menú de navegación</DrawerTitle>
              </VisuallyHidden>

              <div className="flex flex-col gap-6 mt-6">
                <DrawerClose asChild>
                  <Link
                    href="/jobs"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-3"
                  >
                    Vacantes
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link
                    href="/about"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-3"
                  >
                    Sobre mí
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <a
                    href="https://www.linkedin.com/in/alearrunategui/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-3"
                  >
                    LinkedIn
                  </a>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link
                    href="/admin/login"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-3"
                  >
                    Admin
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        )}

        {!mounted && (
          <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        )}
      </div>
    </header>
  )
}
