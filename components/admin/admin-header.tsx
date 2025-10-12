"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Briefcase, Users, ExternalLink, Menu, Plus } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AdminHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jobs", label: "Vacantes", icon: Briefcase },
    { href: "/admin/applications", label: "Postulaciones", icon: Users },
  ]

  const isNavItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    if (href === "/admin/jobs") {
      return pathname === "/admin/jobs"
    }
    if (href === "/admin/applications") {
      return pathname === "/admin/applications" || pathname.startsWith("/admin/applications/")
    }
    return false
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Logo and brand */}
            <Link href="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              <svg
                className="h-5 w-5 text-primary"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Logo"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-lg font-semibold hidden sm:inline">Code&Hirez</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isNavItemActive(item.href)
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button asChild size="sm" className="gap-2">
                <Link href="/admin/jobs/new">
                  <Plus className="h-4 w-4" />
                  <span className="hidden lg:inline">Nuevo</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/" target="_blank" className="cursor-pointer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver sitio web
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-destructive cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder al panel
                          de administración.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <form action={signOut}>
                            <button type="submit" className="w-full">
                              Cerrar sesión
                            </button>
                          </form>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe">
        <div className="grid grid-cols-5 h-16">
          <Link href="/admin" className="flex items-center justify-center">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                pathname === "/admin" && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
          </Link>

          <Link href="/admin/jobs" className="flex items-center justify-center">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                pathname === "/admin/jobs" && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <Briefcase className="h-5 w-5" />
              <span className="text-xs">Vacantes</span>
            </Button>
          </Link>

          <Link href="/admin/jobs/new" className="flex items-center justify-center">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                pathname === "/admin/jobs/new" && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Nuevo</span>
            </Button>
          </Link>

          <Link href="/admin/applications" className="flex items-center justify-center">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                (pathname === "/admin/applications" || pathname.startsWith("/admin/applications/")) &&
                  "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Postulaciones</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-full w-full flex-col gap-1 rounded-none">
                <Menu className="h-5 w-5" />
                <span className="text-xs">Menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-48 mb-2">
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank" className="cursor-pointer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver sitio web
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder al panel de
                      administración.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <form action={signOut}>
                        <button type="submit" className="w-full">
                          Cerrar sesión
                        </button>
                      </form>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  )
}
