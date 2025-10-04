"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Briefcase, Users } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const pathname = usePathname()

  // Don't show header on login page
  if (pathname === "/admin/login") {
    return null
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Briefcase },
    { href: "/admin/jobs", label: "Vacantes", icon: Briefcase },
    { href: "/admin/applications", label: "Postulaciones", icon: Users },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3">
              <svg
                className="h-5 w-5"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Vercel Logo"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-xl font-semibold">Code&Hirez Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className={cn("gap-2", isActive && "bg-accent text-accent-foreground")}>
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank">
                Ver sitio público
              </Link>
            </Button>
            <form action={signOut}>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
